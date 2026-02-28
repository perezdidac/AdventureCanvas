class Dialogue {
    constructor(engine, dialogueTrees) {
        this.engine = engine;
        this.trees = dialogueTrees || {}; // Collection of all dialogues for the game
        this.isActive = false;

        // UI elements
        this.boxEl = document.getElementById('dialogue-box');
        this.textEl = document.getElementById('dialogue-text');
        this.choicesEl = document.getElementById('dialogue-choices');
        this.vars = {}; // Session-specific variables that reset every time a dialogue starts

        // NEW: Stop clicks on the dialogue box itself from reaching the canvas
        this.boxEl.addEventListener('click', (e) => e.stopPropagation());
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
        this.isActive = true;
        this.boxEl.classList.remove('hidden'); // Ensure no display:none
        // Add a small timeout so display:block applies before opacity transition triggers
        setTimeout(() => {
            this.boxEl.classList.add('visible');
        }, 10);

        this.showNode(startNodeId);
    }

    showNode(nodeId) {
        const tree = this.trees[this.currentTreeId];
        const node = tree[nodeId];

        if (!node) {
            console.error(`Dialogue node ${nodeId} not found in tree ${this.currentTreeId}`);
            this.end();
            return;
        }

        // Execute any onEnter logic for the dialogue node
        if (node.onEnter) {
            node.onEnter(this.engine);
        }

        // Support dynamic text functions
        let displayText = node.text;
        if (typeof displayText === 'function') {
            displayText = displayText(this.engine, this.context);
        }
        this.textEl.innerText = displayText;
        this.choicesEl.innerHTML = '';

        if (node.choices && node.choices.length > 0) {
            node.choices.forEach((choice, index) => {
                // Check if choice has a condition to be shown
                if (choice.condition && !choice.condition(this.engine)) {
                    return; // Skip this choice
                }

                // NEW: Check if choice is set to only appear 'once' per session and has already been clicked
                const choiceId = `${nodeId}_${index}`; // Unique ID for this specific choice in this node
                if (choice.once && this.vars[choiceId]) {
                    return;
                }

                const btn = document.createElement('button');
                btn.className = 'dialogue-choice';
                btn.innerText = choice.text;

                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click from triggering scene interactions
                    // Record that this choice was clicked in the session variables
                    if (choice.once) {
                        this.vars[choiceId] = true;
                    }

                    if (choice.action) choice.action(this.engine); // Execute inline action if any

                    if (choice.nextNode) {
                        this.showNode(choice.nextNode); // Traverse to next node
                    } else {
                        this.end(); // Or end conversation
                    }
                });

                this.choicesEl.appendChild(btn);
            });
        } else {
            // No choices means a "Continue" button to proceed/end
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            btn.innerText = node.nextNode ? "Continue..." : "Close";
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from triggering scene interactions
                if (node.nextNode) this.showNode(node.nextNode);
                else this.end();
            });
            this.choicesEl.appendChild(btn);
        }
    }

    end() {
        this.isActive = false;
        this.boxEl.classList.remove('visible');

        // Let transition finish before potentially applying display:none if someone restores hidden
        setTimeout(() => {
            if (!this.isActive) {
                // Not adding hidden here to allow the CSS transition to work. 
                // The 'visible' class handles pointer-events and opacity.
            }
        }, 300);
    }
}
