class Engine {
    constructor(config) {
        this.config = config;
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d');

        // Initialize Core Systems
        this.i18n = new I18n(this);
        this.state = new State(this, config.initialScene, config.scenes, config.items);
        this.renderer = new Renderer(this);
        this.dialogue = new Dialogue(this, config.dialogues);
        this.screens = new Screens(this);
        this.audio = new AudioManager(this);

        // Viewport (pinch-zoom / pan) — must come before Input
        const container = document.getElementById('game-container');
        this.viewport = new Viewport(container, this.canvas);

        this.input = new Input(this);

        // Timing
        this.lastTime = 0;
        this.isRunning = false;

        // Debug Panel initialization
        if (config.debug) {
            this.debugEditMode = false;
            this.debugRemoveMode = false;
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

                const removeBtn = document.getElementById('remove-object-btn');
                if (removeBtn) removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.toggleRemoveMode();
                };

                const newObjBtn = document.getElementById('new-object-btn');
                if (newObjBtn) newObjBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.createNewObject();
                };

                const copyBtn = document.getElementById('copy-coords-btn');
                if (copyBtn) copyBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.exportCoordinates();
                };
            }
        }

        // Language and Audio Controls
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) {
            langBtn.onclick = (e) => {
                e.stopPropagation();
                const nextLang = this.i18n.currentLocale === 'en' ? 'ca' : 'en';
                this.i18n.setLocale(nextLang);
                langBtn.innerText = nextLang.toUpperCase();
                this.updateUITranslations();
            };
        }

        const muteBtn = document.getElementById('mute-toggle-btn');
        if (muteBtn) {
            muteBtn.onclick = (e) => {
                e.stopPropagation();
                const isMuted = this.audio.toggleMute();
                muteBtn.innerText = isMuted ? '🔇' : '🔊';
            };
        }

        // NEW: Stop clicks on the inventory panel from reaching the scene handler
        const invPanel = document.getElementById('inventory-panel');
        if (invPanel) invPanel.addEventListener('click', (e) => e.stopPropagation());
    }

    updateUITranslations() {
        // Translate elements with data-t (inner text)
        document.querySelectorAll('[data-t]').forEach(el => {
            const key = el.getAttribute('data-t');
            el.innerText = this.i18n.t(key);
        });

        // Translate attributes like title
        document.querySelectorAll('[data-t-title]').forEach(el => {
            const key = el.getAttribute('data-t-title');
            el.title = this.i18n.t(key);
        });

        // Specific fix for language toggle button text if manually set
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) {
            langBtn.innerText = this.i18n.currentLocale.toUpperCase();
        }

        // Refresh active dialogue if any
        if (this.dialogue) {
            this.dialogue.refresh();
        }

        // Refresh inventory (which handles its own labels)
        if (this.state) {
            this.state.updateInventoryUI();
        }
    }

    toggleDebugMode() {
        this.debugEditMode = !this.debugEditMode;
        if (this.debugEditMode) this.debugRemoveMode = false; // mutually exclusive
        const toggleBtn = document.getElementById('toggle-debug-btn');
        if (toggleBtn) {
            toggleBtn.innerText = `Edit Hotspots: ${this.debugEditMode ? 'ON' : 'OFF'}`;
            toggleBtn.style.backgroundColor = this.debugEditMode ? '#ff4444' : '';
        }
        const removeBtn = document.getElementById('remove-object-btn');
        if (removeBtn) {
            removeBtn.innerText = 'Remove Object: OFF';
            removeBtn.style.backgroundColor = '';
        }
        this.renderer.draw();
    }

    toggleRemoveMode() {
        this.debugRemoveMode = !this.debugRemoveMode;
        if (this.debugRemoveMode) this.debugEditMode = false; // mutually exclusive
        const removeBtn = document.getElementById('remove-object-btn');
        if (removeBtn) {
            removeBtn.innerText = `Remove Object: ${this.debugRemoveMode ? 'ON (tap ✕)' : 'OFF'}`;
            removeBtn.style.backgroundColor = this.debugRemoveMode ? '#aa2200' : '';
        }
        const toggleBtn = document.getElementById('toggle-debug-btn');
        if (toggleBtn) {
            toggleBtn.innerText = 'Edit Hotspots: OFF';
            toggleBtn.style.backgroundColor = '';
        }
        this.renderer.draw();
    }

    createNewObject() {
        if (!this.debugEditMode) {
            alert("Please turn on Edit Hotspots first!");
            return;
        }
        const name = prompt("Enter the name of the new object:");
        if (!name) return;

        const scene = this.state.getCurrentScene();
        if (!scene) return;

        // Ensure hotspots object exists
        if (!scene.hotspots) scene.hotspots = {};

        let id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        if (scene.hotspots[id]) {
            id += Date.now().toString().slice(-4);
        }

        scene.hotspots[id] = {
            name: name,
            x: this.canvas.width / 2 - 50,
            y: this.canvas.height / 2 - 50,
            width: 100,
            height: 100,
            // Generic fallback onClick in case they want it later
            onClick: (engine) => engine.dialogue.start('generic_look', 'start', `You inspect the ${name}.`)
        };

        this.renderer.draw();
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

    // Dynamic registration of scene-specific content.
    // Supports scene variants via `sceneData.extends = 'baseSceneId'`.
    // The variant inherits all hotspots from the base, then:
    //   - `sceneData.background` overrides the background image
    //   - `sceneData.hotspots` are merged on top (override or add hotspots)
    //   - `sceneData.removeHotspots: ['id1', ...]` removes inherited hotspots
    //   - `sceneData.onEnter` replaces the base onEnter if provided
    registerScene(id, sceneData, dialogues, items) {
        if (!sceneData) return;

        let resolvedScene = sceneData;

        if (sceneData.extends) {
            const base = this.state.scenes[sceneData.extends];
            if (base) {
                // Deep-clone the base hotspots so each scene is independent
                const baseHotspots = Object.assign({}, base.hotspots);

                // Apply removals first
                if (sceneData.removeHotspots) {
                    sceneData.removeHotspots.forEach(key => delete baseHotspots[key]);
                }

                // Merge variant hotspots on top of (potentially pruned) base
                const mergedHotspots = Object.assign(baseHotspots, sceneData.hotspots || {});

                resolvedScene = {
                    background: sceneData.background || base.background,
                    onEnter: sceneData.onEnter || base.onEnter,
                    hotspots: mergedHotspots,
                    _extendsId: sceneData.extends  // keep a reference for debugging
                };
            }
        }

        this.state.scenes[id] = resolvedScene;

        if (dialogues) {
            Object.assign(this.dialogue.trees, dialogues);
        }

        if (items) {
            Object.assign(this.state.itemData, items);
        }
    }

    async start() {
        if (this.isRunning) return;

        // Load translations before starting
        await this.i18n.loadLocales();
        this.updateUITranslations();

        // Start background music if provided in config
        if (this.config.musicPath) {
            this.audio.playMusic(this.config.musicPath);
        }

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
