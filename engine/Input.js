class Input {
    constructor(engine) {
        this.engine = engine;
        this.canvas = engine.canvas;

        // Cache DOM elements used in high-frequency events like mousemove
        this.tooltip = document.getElementById('hover-tooltip');
        this.visualCursor = document.getElementById('selected-item-cursor');

        // Listen to clicks globally to handle dropping items anywhere
        window.addEventListener('click', this.handleClick.bind(this));

        // Listen to mousemove globally so the custom item-cursor follows everywhere
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        // Debug mode: dragging and resizing
        this.editingHotspotId = null;
        this.editMode = null; // 'drag' or 'resize'
        this.dragOffset = { x: 0, y: 0 };

        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));

        // --- Touch / Pinch-Zoom / Pan ---
        const viewport = document.getElementById('viewport');
        if (viewport) {
            viewport.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            viewport.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            viewport.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
            viewport.addEventListener('touchcancel', this.handleTouchEnd.bind(this), { passive: false });
        }

        // Pan state (mouse or single-finger)
        this._panning = false;
        this._panStart = null;
        this._vpOffsetAtPanStart = null;

        // Pinch state (two fingers)
        this._pinching = false;
        this._pinchStartDist = 0;
        this._pinchStartScale = 1;
        this._pinchMidpoint = null;
        this._taps = []; // track active touch points
    }

    // -------------------------------------------------------------------------
    // COORDINATE HELPERS
    // -------------------------------------------------------------------------

    // Convert a screen-space clientX/clientY to canvas game-space coords,
    // taking the current viewport transform (pan + scale) into account.
    getCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();

        // canvas.getBoundingClientRect() already gives us the *rendered* position
        // of the canvas element (after the CSS transform applied by the viewport).
        // So we only need to scale from CSS pixels to internal resolution.
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        return { x, y };
    }

    // -------------------------------------------------------------------------
    // VIEWPORT PAN / PINCH-ZOOM (touch)
    // -------------------------------------------------------------------------

    _vpTranslate(dx, dy) {
        const vp = this.engine.viewport;
        if (!vp) return;
        vp.offsetX += dx;
        vp.offsetY += dy;
        vp.clamp();
        vp.apply();
    }

    handleTouchStart(e) {
        e.preventDefault();
        this._taps = Array.from(e.touches);

        if (e.touches.length === 2) {
            this._pinching = true;
            this._panning = false;
            this._pinchStartDist = this._touchDist(e.touches[0], e.touches[1]);
            this._pinchStartScale = this.engine.viewport ? this.engine.viewport.scale : 1;
            this._pinchMidpoint = this._touchMid(e.touches[0], e.touches[1]);
        } else if (e.touches.length === 1) {
            this._pinching = false;
            this._panning = true;
            this._panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            this._vpOffsetAtPanStart = this.engine.viewport
                ? { x: this.engine.viewport.offsetX, y: this.engine.viewport.offsetY }
                : { x: 0, y: 0 };
        }
    }

    handleTouchMove(e) {
        e.preventDefault();

        if (this._pinching && e.touches.length === 2) {
            const vp = this.engine.viewport;
            if (!vp) return;

            const newDist = this._touchDist(e.touches[0], e.touches[1]);
            const ratio = newDist / this._pinchStartDist;
            const newScale = Math.max(0.3, Math.min(4, this._pinchStartScale * ratio));

            // Zoom relative to the midpoint
            const mid = this._touchMid(e.touches[0], e.touches[1]);
            const containerRect = document.getElementById('game-container').getBoundingClientRect();
            const cx = mid.x - containerRect.left;
            const cy = mid.y - containerRect.top;

            // Adjust offset so zoom is centred on the pinch midpoint
            vp.offsetX = cx - (cx - vp.offsetX) * (newScale / vp.scale);
            vp.offsetY = cy - (cy - vp.offsetY) * (newScale / vp.scale);
            vp.scale = newScale;
            vp.clamp();
            vp.apply();

        } else if (this._panning && !this._pinching && e.touches.length === 1) {
            const vp = this.engine.viewport;
            if (!vp) return;

            const dx = e.touches[0].clientX - this._panStart.x;
            const dy = e.touches[0].clientY - this._panStart.y;
            vp.offsetX = this._vpOffsetAtPanStart.x + dx;
            vp.offsetY = this._vpOffsetAtPanStart.y + dy;
            vp.clamp();
            vp.apply();
        }
    }

    handleTouchEnd(e) {
        // Single short tap → treat as click
        if (e.changedTouches.length === 1 && !this._pinching) {
            const t = e.changedTouches[0];
            // Only fire if the touch didn't pan much
            const dx = t.clientX - (this._panStart ? this._panStart.x : t.clientX);
            const dy = t.clientY - (this._panStart ? this._panStart.y : t.clientY);
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
                // Synthesise a click-like event using the touch coordinates
                const synth = { clientX: t.clientX, clientY: t.clientY };
                if (!this.engine.state.isLocked && !this.engine.dialogue.isActive) {
                    const coords = this.getCoordinates(synth);
                    this.processClick(coords.x, coords.y);
                }
            }
        }

        if (e.touches.length < 2) this._pinching = false;
        if (e.touches.length === 0) { this._panning = false; this._taps = []; }
    }

    _touchDist(t1, t2) {
        return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    }
    _touchMid(t1, t2) {
        return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
    }

    // -------------------------------------------------------------------------
    // MOUSE - DEBUG DRAG / RESIZE
    // -------------------------------------------------------------------------

    handleMouseDown(event) {
        if (!this.engine.debugEditMode) return;
        event.preventDefault();

        const coords = this.getCoordinates(event);
        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) return;

        // Check for resize handles first (bottom-right 15×15 area)
        for (const [id, hotspot] of Object.entries(scene.hotspots)) {
            const handleSize = 15;
            if (coords.x >= hotspot.x + hotspot.width - handleSize &&
                coords.x <= hotspot.x + hotspot.width &&
                coords.y >= hotspot.y + hotspot.height - handleSize &&
                coords.y <= hotspot.y + hotspot.height) {
                this.editingHotspotId = id;
                this.editMode = 'resize';
                return;
            }
        }

        // Check for dragging
        for (const [id, hotspot] of Object.entries(scene.hotspots)) {
            if (coords.x >= hotspot.x && coords.x <= hotspot.x + hotspot.width &&
                coords.y >= hotspot.y && coords.y <= hotspot.y + hotspot.height) {
                this.editingHotspotId = id;
                this.editMode = 'drag';
                this.dragOffset.x = coords.x - hotspot.x;
                this.dragOffset.y = coords.y - hotspot.y;
                return;
            }
        }
    }

    handleMouseUp() {
        this.editingHotspotId = null;
        this.editMode = null;
    }

    // -------------------------------------------------------------------------
    // MOUSE MOVE
    // -------------------------------------------------------------------------

    handleMouseMove(event) {
        if (this.engine.state.isLocked) return;
        const tooltip = this.tooltip;
        const visualCursor = this.visualCursor;

        if (visualCursor && !visualCursor.classList.contains('hidden')) {
            visualCursor.style.left = `${event.clientX}px`;
            visualCursor.style.top = `${event.clientY}px`;
        }

        const coords = this.getCoordinates(event);

        // Handle debug drag/resize
        if (this.engine.debugEditMode && this.editingHotspotId) {
            const scene = this.engine.state.getCurrentScene();
            const hotspot = scene.hotspots[this.editingHotspotId];
            if (this.editMode === 'drag') {
                hotspot.x = coords.x - this.dragOffset.x;
                hotspot.y = coords.y - this.dragOffset.y;
            } else if (this.editMode === 'resize') {
                hotspot.width = Math.max(10, coords.x - hotspot.x);
                hotspot.height = Math.max(10, coords.y - hotspot.y);
            }
            return;
        }

        if (this.engine.dialogue.isActive) {
            this.canvas.style.cursor = 'default';
            if (tooltip) tooltip.style.opacity = '0';
            return;
        }

        const { x, y } = coords;
        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) {
            if (!this.engine.state.selectedItemId) this.canvas.style.cursor = 'default';
            if (tooltip) tooltip.style.opacity = '0';
            return;
        }

        let hoveredHotspotId = null;
        let hoveredHotspotObj = null;
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (x >= hotspot.x && x <= hotspot.x + hotspot.width &&
                y >= hotspot.y && y <= hotspot.y + hotspot.height) {
                hoveredHotspotId = hotspotId;
                hoveredHotspotObj = hotspot;
                break;
            }
        }

        if (hoveredHotspotId) {
            if (!this.engine.state.selectedItemId) {
                const handleSize = 15;
                if (this.engine.debugEditMode &&
                    x >= hoveredHotspotObj.x + hoveredHotspotObj.width - handleSize &&
                    y >= hoveredHotspotObj.y + hoveredHotspotObj.height - handleSize) {
                    this.canvas.style.cursor = 'nwse-resize';
                } else {
                    this.canvas.style.cursor = 'pointer';
                }
            }
            if (tooltip) {
                const sceneId = this.engine.state.currentSceneId;
                const i18nKey = `${sceneId}.hotspots.${hoveredHotspotId}`;
                let name = this.engine.i18n.t(i18nKey);

                // If direct ID key didn't work, try the explicit name property
                if (name === i18nKey && hoveredHotspotObj.name) {
                    name = this.engine.i18n.t(hoveredHotspotObj.name);
                }

                // If still no translation, fallback to a readable ID
                if (name === i18nKey || name === hoveredHotspotObj.name) {
                    // Start with what we have
                    let fallback = name;
                    if (fallback.includes('.')) {
                        const parts = fallback.split('.');
                        fallback = parts[parts.length - 1];
                    }
                    name = fallback.charAt(0).toUpperCase() + fallback.slice(1);
                }

                tooltip.innerText = name;
                tooltip.style.left = `${event.clientX}px`;
                tooltip.style.top = `${event.clientY}px`;
                tooltip.style.opacity = '1';
            }
        } else {
            if (!this.engine.state.selectedItemId) this.canvas.style.cursor = 'default';
            if (tooltip) tooltip.style.opacity = '0';
        }
    }

    // -------------------------------------------------------------------------
    // CLICK
    // -------------------------------------------------------------------------

    handleClick(event) {
        if (this.engine.state.isLocked) return;
        if (this.engine.dialogue.isActive) return;
        const { x, y } = this.getCoordinates(event);
        this.processClick(x, y);
    }

    processClick(x, y) {
        // Edit mode: hitting an X badge deletes the hotspot
        if (this.engine.debugEditMode) {
            const scene = this.engine.state.getCurrentScene();
            if (scene && scene.hotspots) {
                const badgeSize = 28;
                for (const [id, hotspot] of Object.entries(scene.hotspots)) {
                    const bx = hotspot.x + hotspot.width - badgeSize / 2;
                    const by = hotspot.y - badgeSize / 2;
                    if (x >= bx && x <= bx + badgeSize && y >= by && y <= by + badgeSize) {
                        if (confirm(`Remove hotspot "${hotspot.name || id}"?`)) {
                            delete scene.hotspots[id];
                            this.engine.renderer.draw();
                        }
                        return;
                    }
                }
            }
            if (this.engine.state.selectedItemId) this.engine.state.clearSelectedItem();
            return;
        }

        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) {
            if (this.engine.state.selectedItemId) this.engine.state.clearSelectedItem();
            return;
        }

        let clickedHotspotId = null;
        let clickedHotspot = null;
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (x >= hotspot.x && x <= hotspot.x + hotspot.width &&
                y >= hotspot.y && y <= hotspot.y + hotspot.height) {
                clickedHotspotId = hotspotId;
                clickedHotspot = hotspot;
                break;
            }
        }

        if (this.engine.state.selectedItemId) {
            const itemId = this.engine.state.selectedItemId;
            if (clickedHotspot && clickedHotspot.onUseItem) {
                const consumed = clickedHotspot.onUseItem(this.engine, itemId);
                if (consumed) this.engine.state.removeFromInventory(itemId);
            } else if (clickedHotspot) {
                console.log(`Cannot use ${itemId} on ${clickedHotspotId}`);
            }
            this.engine.state.clearSelectedItem();
            return;
        }

        if (clickedHotspot) {
            this.handleInteraction(clickedHotspotId, clickedHotspot);
        }
    }

    handleInteraction(hotspotId, hotspot) {
        if (hotspot.onClick) {
            hotspot.onClick(this.engine);
        }
    }
}
