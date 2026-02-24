export class State {
    constructor(engine, initialSceneId, scenesData, itemsData) {
        this.engine = engine;
        this.currentSceneId = initialSceneId;
        this.scenes = scenesData;
        this.itemData = itemsData;

        this.inventory = [];
        this.flags = {}; // Game variables (e.g., has_met_guard: true)
    }

    getCurrentScene() {
        return this.scenes[this.currentSceneId];
    }

    loadScene(sceneId) {
        if (this.scenes[sceneId]) {
            this.currentSceneId = sceneId;
            console.log(`Loaded scene: ${sceneId}`);

            // Execute scene enter actions if any
            const scene = this.scenes[sceneId];
            if (scene.onEnter) {
                scene.onEnter(this.engine);
            }
        } else {
            console.error(`Scene not found: ${sceneId}`);
        }
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
            list.appendChild(li);
        });
    }
}
