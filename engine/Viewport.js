// Viewport — manages pan and pinch-zoom transform on the #viewport div.
// The canvas element is scaled and translated via CSS transform.
class Viewport {
    constructor(containerEl, canvasEl) {
        this.container = containerEl; // #game-container
        this.canvas = canvasEl;    // #game-canvas
        this.viewportEl = document.getElementById('viewport');

        this.scale = 1;    // current zoom level
        this.offsetX = 0;    // pan offset X (CSS px relative to container)
        this.offsetY = 0;    // pan offset Y

        // Zoom limits
        this.minScale = 0.5;
        this.maxScale = 4.0;

        this.apply();
    }

    // Apply current scale + offset to the canvas element via CSS transform.
    apply() {
        if (!this.canvas) return;
        // The canvas CSS size = 100% of #viewport, so it already fills.
        // We transform the canvas inside #viewport.
        this.canvas.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
        this.canvas.style.transformOrigin = '0 0';
    }

    // Clamp pan so the canvas never scrolls past its edges (at current scale).
    clamp() {
        if (!this.container) return;
        const cw = this.container.clientWidth;
        const ch = this.container.clientHeight;

        // Canvas displayed size at current scale
        const sw = cw * this.scale;
        const sh = ch * this.scale;

        // Maximum scroll: if scaled size > container, allow panning to show edges
        const maxX = 0;
        const minX = Math.min(0, cw - sw);
        const maxY = 0;
        const minY = Math.min(0, ch - sh);

        this.offsetX = Math.max(minX, Math.min(maxX, this.offsetX));
        this.offsetY = Math.max(minY, Math.min(maxY, this.offsetY));
    }

    reset() {
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.apply();
    }
}
