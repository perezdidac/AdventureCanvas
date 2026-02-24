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
        if (this.engine.dialogue.isActive) {
            this.canvas.style.cursor = 'default';
            return;
        }

        const { x, y } = this.getCoordinates(event);
        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) {
            this.canvas.style.cursor = 'default';
            return;
        }

        let isHovering = false;
        // Check if cursor intersects with any hotspot
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (
                x >= hotspot.x &&
                x <= hotspot.x + hotspot.width &&
                y >= hotspot.y &&
                y <= hotspot.y + hotspot.height
            ) {
                isHovering = true;
                break;
            }
        }

        this.canvas.style.cursor = isHovering ? 'pointer' : 'default';
    }

    handleClick(event) {
        // If dialogue is active, ignore canvas clicks
        if (this.engine.dialogue.isActive) return;

        const { x, y } = this.getCoordinates(event);
        this.processClick(x, y);
    }

    processClick(x, y) {
        const scene = this.engine.state.getCurrentScene();
        if (!scene || !scene.hotspots) return;

        // Check if click intersects with any hotspot
        for (const [hotspotId, hotspot] of Object.entries(scene.hotspots)) {
            if (
                x >= hotspot.x &&
                x <= hotspot.x + hotspot.width &&
                y >= hotspot.y &&
                y <= hotspot.y + hotspot.height
            ) {
                this.handleInteraction(hotspotId, hotspot);
                break; // Only interact with one thing per click
            }
        }
    }

    handleInteraction(hotspotId, hotspot) {
        if (hotspot.onClick) {
            // Execute the onClick action defined in the scene data
            hotspot.onClick(this.engine);
        }
    }
}
