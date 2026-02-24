import { Renderer } from './Renderer.js';
import { Input } from './Input.js';
import { State } from './State.js';
import { Dialogue } from './Dialogue.js';
import { Screens } from './Screens.js';

export class Engine {
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
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.state.loadScene(this.state.currentSceneId);
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
