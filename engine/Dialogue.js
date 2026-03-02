class Dialogue {
    constructor(engine, dialogueTrees) {
        this.engine = engine;
        this.trees = dialogueTrees || {}; // Collection of all dialogues for the game
        this.isActive = false;

        // UI elements
        this.boxEl = document.getElementById('dialogue-box');
        this.textEl = document.getElementById('dialogue-text');
        this.choicesEl = document.getElementById('dialogue-choices');
        this.currentNodeId = null;
        this.vars = {}; // Session-specific variables that reset every time a dialogue starts

        // NEW: Stop clicks on the dialogue box itself from reaching the canvas
        if (this.boxEl) {
            this.boxEl.addEventListener('click', (e) => e.stopPropagation());
        }
    }

    start(treeId, startNodeId = 'start', context = null) {
        if (!this.trees[treeId]) {
            console.error(`Dialogue tree ${treeId} not found.`);
            return;
        }

        // Hide tooltip immediately when dialogue starts
        const tooltip = document.getElementById('hover-tooltip');
        if (tooltip) tooltip.style.opacity = '0';

        // Also clear any selected item
        this.engine.state.clearSelectedItem();

        this.vars = {}; // Reset session state for the new conversation
        this.context = context; // Store data for this specific conversation instance
        this.currentTreeId = treeId;
        this.currentNodeId = startNodeId;
        this.isActive = true;

        if (this.boxEl) {
            this.boxEl.classList.remove('hidden'); // Ensure no display:none
            // Add a small timeout so display:block applies before opacity transition triggers
            setTimeout(() => {
                this.boxEl.classList.add('visible');
            }, 10);
        }

        this.showNode(startNodeId);
    }

    refresh() {
        if (this.isActive && this.currentNodeId) {
            this.displayNode(this.currentNodeId);
        }
    }

    showNode(nodeId) {
        this.currentNodeId = nodeId;
        const tree = this.trees[this.currentTreeId];
        const node = tree[nodeId];

        if (!node) {
            console.error(`Dialogue node ${nodeId} not found in tree ${this.currentTreeId}`);
            this.end();
            return;
        }

        // Execute logic ONLY when first entering the node
        if (node.onEnter) {
            node.onEnter(this.engine);
        }

        this.displayNode(nodeId);
    }

    displayNode(nodeId) {
        const tree = this.trees[this.currentTreeId];
        const node = tree[nodeId];
        if (!node || !this.textEl || !this.choicesEl) return;

        // Support dynamic text functions
        let displayText = node.text;
        if (typeof displayText === 'function') {
            displayText = displayText(this.engine, this.context);
            // NEW: If the function returns a translation key, translate it
            if (typeof displayText === 'string' && displayText.includes('.')) {
                displayText = this.engine.i18n.t(displayText);
            }
        } else if (typeof displayText === 'string') {
            if (displayText.includes('.')) {
                displayText = this.engine.i18n.t(displayText);
            }
        }
        this.textEl.innerText = displayText;
        this.choicesEl.innerHTML = '';

        if (node.choices && node.choices.length > 0) {
            node.choices.forEach((choice, index) => {
                if (choice.condition && !choice.condition(this.engine)) return;

                const choiceId = `${nodeId}_${index}`;
                if (choice.once && this.vars[choiceId]) return;

                const btn = document.createElement('button');
                btn.className = 'dialogue-choice';

                let choiceText = choice.text;
                if (choiceText.includes('.')) {
                    choiceText = this.engine.i18n.t(choiceText);
                }
                btn.innerText = choiceText;

                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (choice.once) this.vars[choiceId] = true;
                    if (choice.action) choice.action(this.engine);

                    if (choice.nextNode) this.showNode(choice.nextNode);
                    else this.end();
                });

                this.choicesEl.appendChild(btn);
            });
        } else {
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            const continueKey = node.nextNode ? "ui.continue" : "ui.close";
            let btnText = this.engine.i18n.t(continueKey);
            if (btnText === continueKey) btnText = (node.nextNode ? "Seguir..." : "Tancar"); // default fallback if locales fail

            btn.innerText = btnText;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (node.nextNode) this.showNode(node.nextNode);
                else this.end();
            });
            this.choicesEl.appendChild(btn);
        }
    }

    end() {
        this.isActive = false;
        this.currentNodeId = null;
        if (this.boxEl) {
            this.boxEl.classList.remove('visible');
        }

        setTimeout(() => {
            if (!this.isActive && this.boxEl) {
                // Not adding hidden here to allow the CSS transition to work. 
            }
        }, 300);
    }
}
