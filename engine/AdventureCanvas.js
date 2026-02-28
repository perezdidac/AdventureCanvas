class Engine {
    constructor(config) {
        this.config = config;
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Initialize Core Systems
        this.state = new State(this, config.initialScene, config.scenes, config.items);
        this.renderer = new Renderer(this);
        this.input = new Input(this);
        this.dialogue = new Dialogue(this, config.dialogues);
        this.screens = new Screens(this);

        // Timing
        this.lastTime = 0;
        this.isRunning = false;

        // Debug Panel initialization
        if (config.debug) {
            this.debugEditMode = false;
            const debugWrapper = document.getElementById('debug-wrapper');
            const debugPanel = document.getElementById('debug-panel');
            const drawerToggle = document.getElementById('debug-drawer-toggle');

            if (debugWrapper) {
                debugWrapper.classList.remove('hidden');

                if (drawerToggle && debugPanel) {
                    drawerToggle.onclick = (e) => {
                        e.stopPropagation();
                        debugPanel.classList.toggle('hidden');
                        drawerToggle.innerText = debugPanel.classList.contains('hidden') ? '🔧 Debug Tools' : '⬇️ Hide Debug';
                    };
                }

                const toggleBtn = document.getElementById('toggle-debug-btn');
                if (toggleBtn) toggleBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleDebugMode();
                };

                const copyBtn = document.getElementById('copy-coords-btn');
                if (copyBtn) copyBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.exportCoordinates();
                };
            }
        }

        // NEW: Stop clicks on the inventory panel from reaching the scene handler
        const invPanel = document.getElementById('inventory-panel');
        if (invPanel) invPanel.addEventListener('click', (e) => e.stopPropagation());
    }

    toggleDebugMode() {
        this.debugEditMode = !this.debugEditMode;
        const toggleBtn = document.getElementById('toggle-debug-btn');
        if (toggleBtn) {
            toggleBtn.innerText = `Edit Hotspots: ${this.debugEditMode ? 'ON' : 'OFF'}`;
            toggleBtn.style.backgroundColor = this.debugEditMode ? '#ff4444' : '';
        }
        console.log(`Debug Edit Mode: ${this.debugEditMode}`);
    }

    exportCoordinates() {
        const scene = this.state.getCurrentScene();
        if (!scene || !scene.hotspots) return;

        let output = "";
        for (const [id, hotspot] of Object.entries(scene.hotspots)) {
            output += `${id}: x: ${Math.round(hotspot.x)}, y: ${Math.round(hotspot.y)}, width: ${Math.round(hotspot.width)}, height: ${Math.round(hotspot.height)}\n`;
        }

        const outputEl = document.getElementById('debug-output');
        if (outputEl) outputEl.innerText = output;

        // Copy to clipboard
        navigator.clipboard.writeText(output).then(() => {
            console.log("Coordinates copied to clipboard!");
            // Provide a visual feedback on the button
            const copyBtn = document.getElementById('copy-coords-btn');
            const originalText = copyBtn.innerText;
            copyBtn.innerText = "COPIED!";
            setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert("Failed to copy. See console or the text below the button.");
        });
    }

    // Dynamic registration of scene-specific content
    registerScene(id, sceneData, dialogues, items) {
        if (!sceneData) return;

        // Register the scene itself (hotspots etc)
        this.state.scenes[id] = sceneData;

        // Register associated dialogues
        if (dialogues) {
            Object.assign(this.dialogue.trees, dialogues);
        }

        // Register associated items metadata
        if (items) {
            Object.assign(this.state.itemData, items);
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.state.loadScene(this.state.initialSceneId);
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    stop() {
        this.isRunning = false;
    }

    gameLoop(timestamp) {
        if (!this.isRunning) return;

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.renderer.draw();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Handle animations or logic updates here
    }
}
