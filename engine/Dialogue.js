export class Dialogue {
    constructor(engine, dialogueTrees) {
        this.engine = engine;
        this.trees = dialogueTrees; // Collection of all dialogues for the game
        this.isActive = false;

        // UI elements
        this.boxEl = document.getElementById('dialogue-box');
        this.textEl = document.getElementById('dialogue-text');
        this.choicesEl = document.getElementById('dialogue-choices');
    }

    start(treeId, startNodeId = 'start') {
        if (!this.trees[treeId]) {
            console.error(`Dialogue tree ${treeId} not found.`);
            return;
        }

        this.currentTreeId = treeId;
        this.isActive = true;
        this.boxEl.classList.remove('hidden');

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

        this.textEl.innerText = node.text;
        this.choicesEl.innerHTML = '';

        if (node.choices && node.choices.length > 0) {
            node.choices.forEach(choice => {
                // Check if choice has a condition to be shown
                if (choice.condition && !choice.condition(this.engine)) {
                    return; // Skip this choice
                }

                const btn = document.createElement('button');
                btn.className = 'dialogue-choice';
                btn.innerText = choice.text;

                btn.addEventListener('click', () => {
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
            // No choices means click anywhere (or a "Continue" button) to proceed/end
            const btn = document.createElement('button');
            btn.className = 'dialogue-choice';
            btn.innerText = "(End Conversation)";
            btn.addEventListener('click', () => {
                if (node.nextNode) this.showNode(node.nextNode);
                else this.end();
            });
            this.choicesEl.appendChild(btn);
        }
    }

    end() {
        this.isActive = false;
        this.boxEl.classList.add('hidden');
    }
}
