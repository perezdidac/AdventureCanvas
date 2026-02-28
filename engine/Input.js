class Input {
    constructor(engine) {
        this.engine = engine;
        this.canvas = engine.canvas;

        // Listen to clicks globally to handle dropping items anywhere
        window.addEventListener('click', this.handleClick.bind(this));

        // Listen to mousemove globally so the custom item-cursor follows everywhere
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));

        // Debug mode: dragging and resizing
        this.editingHotspotId = null;
        this.editMode = null; // 'drag' or 'resize'
        this.dragOffset = { x: 0, y: 0 };

        // Dragging and resizing listeners
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    getCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();

        // Calculate click coordinates relative to the canvas internal resolution
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        return { x, y };
    }

    handleMouseDown(event) {
        if (!this.engine.debugEditMode) return;

        // Prevent default browser drag-and-drop behavior
        event.preventDefault();

        const coords = this.getCoordinates(event);
        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) return;

        // Check for resize handles first (bottom-right 10x10 area)
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

    handleMouseMove(event) {
        if (this.engine.state.isLocked) return;
        const tooltip = document.getElementById('hover-tooltip');
        const visualCursor = document.getElementById('selected-item-cursor');

        // Update custom visual cursor position if it's visible
        if (visualCursor && !visualCursor.classList.contains('hidden')) {
            visualCursor.style.left = `${event.clientX}px`;
            visualCursor.style.top = `${event.clientY}px`;
        }

        const coords = this.getCoordinates(event);
        // ... (rest of method)

        // Handle debug drag/resize FIRST
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
            if (!this.engine.state.selectedItemId) {
                this.canvas.style.cursor = 'default';
            }
            if (tooltip) tooltip.style.opacity = '0';
            return;
        }

        let hoveredHotspotId = null;
        let hoveredHotspotObj = null;
        // Check if cursor intersects with any hotspot
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (
                x >= hotspot.x &&
                x <= hotspot.x + hotspot.width &&
                y >= hotspot.y &&
                y <= hotspot.y + hotspot.height
            ) {
                hoveredHotspotId = hotspotId;
                hoveredHotspotObj = hotspot;
                break;
            }
        }

        if (hoveredHotspotId) {
            if (!this.engine.state.selectedItemId) {
                // In edit mode, show a crosshair if over a handle
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
                // Capitalize first letter or use custom name if defined
                const name = hoveredHotspotObj.name || (hoveredHotspotId.charAt(0).toUpperCase() + hoveredHotspotId.slice(1));
                tooltip.innerText = name;
                tooltip.style.left = `${event.clientX}px`;
                tooltip.style.top = `${event.clientY}px`;
                tooltip.style.opacity = '1';
            }
        } else {
            if (!this.engine.state.selectedItemId) {
                this.canvas.style.cursor = 'default';
            }
            if (tooltip) tooltip.style.opacity = '0';
        }
    }

    handleClick(event) {
        if (this.engine.state.isLocked) return;
        // If dialogue is active, ignore canvas clicks
        if (this.engine.dialogue.isActive) return;

        const { x, y } = this.getCoordinates(event);
        this.processClick(x, y);
    }

    processClick(x, y) {
        if (this.engine.debugEditMode) {
            if (this.engine.state.selectedItemId) {
                this.engine.state.clearSelectedItem();
            }
            return;
        }

        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) {
            if (this.engine.state.selectedItemId) {
                this.engine.state.clearSelectedItem();
            }
            return;
        }

        let clickedHotspotId = null;
        let clickedHotspot = null;

        // Check if click intersects with any hotspot
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (
                x >= hotspot.x &&
                x <= hotspot.x + hotspot.width &&
                y >= hotspot.y &&
                y <= hotspot.y + hotspot.height
            ) {
                clickedHotspotId = hotspotId;
                clickedHotspot = hotspot;
                break; // Only interact with one thing per click
            }
        }

        if (this.engine.state.selectedItemId) {
            const itemId = this.engine.state.selectedItemId;

            if (clickedHotspot && clickedHotspot.onUseItem) {
                const consumed = clickedHotspot.onUseItem(this.engine, itemId);
                if (consumed) {
                    this.engine.state.removeFromInventory(itemId);
                }
            } else if (clickedHotspot) {
                console.log(`Cannot use ${itemId} on ${clickedHotspotId}`);
            }

            // Revert cursor back to default (dropping item)
            this.engine.state.clearSelectedItem();
            return;
        }

        if (clickedHotspot) {
            this.handleInteraction(clickedHotspotId, clickedHotspot);
        }
    }

    handleInteraction(hotspotId, hotspot) {
        if (hotspot.onClick) {
            // Execute the onClick action defined in the scene data
            hotspot.onClick(this.engine);
        }
    }
}
