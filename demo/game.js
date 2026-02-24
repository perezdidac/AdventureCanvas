import { Engine } from '../engine/AdventureCanvas.js';
import { scenes } from './data/scenes.js';
import { items } from './data/items.js';
import { dialogues } from './data/dialogues.js';

// Initialize the game engine
const game = new Engine({
    canvasId: 'game-canvas',
    width: 800,
    height: 600,
    scenes: scenes,
    items: items,
    dialogues: dialogues,
    initialScene: 'room1',
    debug: true
});

// Configure the generic intro screen
game.screens.setupIntroScreen({
    title: "Mystery of the Robot Island",
    bgImage: "assets/intro_bg.png", // Example placeholder
    startButtonId: "start-button",
    screenId: "intro-screen",
    titleId: "intro-title"
});

// Show the intro screen to start
game.screens.showIntroScreen();

// We map the start game action to hide the intro and start the engine
document.getElementById('start-button').addEventListener('click', () => {
    game.screens.hideIntroScreen();
    game.start();
});
