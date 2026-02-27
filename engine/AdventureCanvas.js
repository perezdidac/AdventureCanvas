import { Renderer } from './Renderer.js?v=2';
import { Input } from './Input.js?v=2';
import { State } from './State.js?v=2';
import { Dialogue } from './Dialogue.js?v=2';
import { Screens } from './Screens.js?v=2';

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
