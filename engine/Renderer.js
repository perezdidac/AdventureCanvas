class Renderer {
    constructor(engine) {
        this.engine = engine;
        this.ctx = engine.ctx;
        this.canvas = engine.canvas;
        this.backgrounds = {}; // Cache for loaded images
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const currentScene = this.engine.state.getCurrentScene();
        if (!currentScene) return;

        if (currentScene.background) {
            this.drawBackground(currentScene.background);
        }

        // Show debug overlays when Edit mode is ON (X badges always visible in edit mode)
        if (this.engine.debugEditMode) {
            this.drawDebugHotspots(currentScene.hotspots);
        }
    }

    drawBackground(bgSrc) {
        if (!this.backgrounds[bgSrc]) {
            const img = new Image();
            img.onload = () => this.draw(); // Redraw once loaded
            img.src = bgSrc;
            this.backgrounds[bgSrc] = img;
            return;
        }

        const img = this.backgrounds[bgSrc];
        if (img.complete) {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    drawDebugHotspots(hotspots) {
        if (!hotspots) return;
        const ctx = this.ctx;

        for (const [id, hotspot] of Object.entries(hotspots)) {
            // Draw filled & bordered rect
            ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.fillRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);
            ctx.strokeRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);

            // Resize handle (bottom-right)
            const handleSize = 15;
            ctx.fillStyle = 'white';
            ctx.fillRect(hotspot.x + hotspot.width - handleSize, hotspot.y + hotspot.height - handleSize, handleSize, handleSize);
            ctx.strokeStyle = '#aaa';
            ctx.strokeRect(hotspot.x + hotspot.width - handleSize, hotspot.y + hotspot.height - handleSize, handleSize, handleSize);

            // Label
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(id, hotspot.x + hotspot.width / 2, hotspot.y + hotspot.height / 2);

            // X badge — always visible in debug edit mode — top-right corner
            const badgeSize = 28;
            const bx = hotspot.x + hotspot.width - badgeSize / 2;
            const by = hotspot.y - badgeSize / 2;
            ctx.fillStyle = '#cc0000';
            ctx.beginPath();
            ctx.arc(bx + badgeSize / 2, by + badgeSize / 2, badgeSize / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✕', bx + badgeSize / 2, by + badgeSize / 2);
        }
    }
}
