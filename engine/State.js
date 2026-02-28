class State {
    constructor(engine, initialSceneId, scenesData, itemsData) {
        this.engine = engine;
        this.initialSceneId = initialSceneId;
        this.currentSceneId = null; // Start null so the first loadScene triggers properly without fading out "nothing"
        this.scenes = scenesData || {};
        this.itemData = itemsData || {};

        this.inventory = [];
        this.selectedItemId = null; // Currently held item
        this.flags = {}; // Game variables (e.g., has_met_guard: true)
        this.isLocked = false; // Prevents any interaction during transitions
    }

    getCurrentScene() {
        return this.scenes[this.currentSceneId];
    }

    async loadScene(sceneId, isInstant = false) {
        if (!this.scenes[sceneId]) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        const overlay = document.getElementById('scene-transition-overlay');

        if (isInstant || !overlay) {
            this.currentSceneId = sceneId;
            const scene = this.scenes[sceneId];
            if (scene.onEnter) scene.onEnter(this.engine);
            return;
        }

        // --- Sequence Start ---
        this.isLocked = true;

        // 1. Fade OUT (Curtain Down)
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.opacity = '1';
        await new Promise(r => setTimeout(r, 500));

        // 2. STAY DARK (very briefly)
        await new Promise(r => setTimeout(r, 100));

        // Switch the scene ID while it's dark
        this.currentSceneId = sceneId;
        console.log(`Loaded scene: ${sceneId}`);
        const scene = this.scenes[sceneId];
        if (scene.onEnter) scene.onEnter(this.engine);

        // 3. Fade IN (Curtain Up)
        overlay.style.opacity = '0';
        await new Promise(r => setTimeout(r, 500));

        this.isLocked = false;
        // --- Sequence End ---
    }

    setFlag(key, value) {
        this.flags[key] = value;
    }

    getFlag(key) {
        return this.flags[key];
    }

    // Inventory Management
    addToInventory(itemId) {
        if (!this.inventory.includes(itemId) && this.itemData[itemId]) {
            this.inventory.push(itemId);
            this.updateInventoryUI();
            console.log(`Added ${itemId} to inventory.`);
        }
    }

    removeFromInventory(itemId) {
        const index = this.inventory.indexOf(itemId);
        if (index > -1) {
            this.inventory.splice(index, 1);
            this.updateInventoryUI();
        }
    }

    hasItem(itemId) {
        return this.inventory.includes(itemId);
    }

    setSelectedItem(itemId, event) {
        if (this.hasItem(itemId)) {
            this.selectedItemId = itemId;
            const item = this.itemData[itemId];
            const visualCursor = document.getElementById('selected-item-cursor');

            if (item && item.icon) {
                if (visualCursor) {
                    visualCursor.style.backgroundImage = `url(${item.icon})`;
                    visualCursor.classList.remove('hidden');

                    // Set initial position immediately to the mouse click location
                    if (event) {
                        visualCursor.style.left = `${event.clientX}px`;
                        visualCursor.style.top = `${event.clientY}px`;
                    }
                }
                // Hide the actual system cursor
                document.body.style.cursor = 'none';
                this.engine.canvas.style.cursor = 'none';
            } else {
                this.engine.canvas.style.cursor = 'crosshair';
            }
        }
    }

    clearSelectedItem() {
        this.selectedItemId = null;

        const visualCursor = document.getElementById('selected-item-cursor');
        if (visualCursor) {
            visualCursor.classList.add('hidden');
        }

        // Restore system cursor
        document.body.style.cursor = 'default';
        this.engine.canvas.style.cursor = 'default';
        // The Input manager will naturally reset the default/pointer on the next mousemove
    }

    updateInventoryUI() {
        const list = document.getElementById('inventory-list');
        if (!list) return;

        list.innerHTML = '';
        this.inventory.forEach(itemId => {
            const item = this.itemData[itemId];
            const li = document.createElement('li');
            li.className = 'inventory-item';

            // If item has an icon, use it. Otherwise, use name initial.
            if (item.icon) {
                const img = document.createElement('img');
                img.src = item.icon;
                img.alt = item.name;
                img.style.width = '100%';
                img.style.height = '100%';
                li.appendChild(img);
            } else {
                li.innerText = item.name.substring(0, 2).toUpperCase();
            }

            li.title = item.name; // Tooltip
            li.onclick = (e) => {
                e.stopPropagation(); // Prevent the global window click from immediately clearing selection
                this.setSelectedItem(itemId, e);
            };
            list.appendChild(li);
        });
    }
}
