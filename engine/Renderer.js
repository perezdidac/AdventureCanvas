class Renderer {
    constructor(engine) {
        this.engine = engine;
        this.ctx = engine.ctx;
        this.canvas = engine.canvas;
        this.backgrounds = {}; // Cache for loaded images
    }

    draw() {
        // Clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const currentScene = this.engine.state.getCurrentScene();
        if (!currentScene) return;

        // Draw Background
        if (currentScene.background) {
            this.drawBackground(currentScene.background);
        }

        // Draw Objects/Hotspots (Optional: for debug or specific interactive visual states)
        if (this.engine.debugEditMode) {
            this.drawDebugHotspots(currentScene.hotspots);
        }
    }

    drawBackground(bgSrc) {
        if (!this.backgrounds[bgSrc]) {
            // Start loading image
            const img = new Image();
            img.src = bgSrc;
            this.backgrounds[bgSrc] = img; // Store Image object
            return; // Will draw on next frame when loaded
        }

        const img = this.backgrounds[bgSrc];
        if (img.complete) {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    drawDebugHotspots(hotspots) {
        if (!hotspots) return;
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (const [id, hotspot] of Object.entries(hotspots)) {
            // Draw filled rect
            this.ctx.fillRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);
            // Draw border
            this.ctx.strokeRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);

            // Draw resize handle
            const handleSize = 15;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(hotspot.x + hotspot.width - handleSize, hotspot.y + hotspot.height - handleSize, handleSize, handleSize);
            this.ctx.strokeRect(hotspot.x + hotspot.width - handleSize, hotspot.y + hotspot.height - handleSize, handleSize, handleSize);

            // Draw label
            this.ctx.fillStyle = 'white';
            this.ctx.fillText(id, hotspot.x + hotspot.width / 2, hotspot.y + hotspot.height / 2);
            this.ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'; // Reset for next rect
        }
    }
}
