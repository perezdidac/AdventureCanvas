export class Input {
    constructor(engine) {
        this.engine = engine;
        this.canvas = engine.canvas;

        this.canvas.addEventListener('click', this.handleClick.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
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

    handleMouseMove(event) {
        const tooltip = document.getElementById('hover-tooltip');
        const visualCursor = document.getElementById('selected-item-cursor');

        // Update custom visual cursor position if it's visible
        if (visualCursor && !visualCursor.classList.contains('hidden')) {
            visualCursor.style.left = `${event.clientX}px`;
            visualCursor.style.top = `${event.clientY}px`;
        }

        if (this.engine.dialogue.isActive) {
            this.canvas.style.cursor = 'default';
            if (tooltip) tooltip.style.opacity = '0';
            return;
        }

        const { x, y } = this.getCoordinates(event);
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
                this.canvas.style.cursor = 'pointer';
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
        // If dialogue is active, ignore canvas clicks
        if (this.engine.dialogue.isActive) return;

        const { x, y } = this.getCoordinates(event);
        this.processClick(x, y);
    }

    processClick(x, y) {
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
