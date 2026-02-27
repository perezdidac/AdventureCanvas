import { Engine } from '../engine/AdventureCanvas.js?v=2';
import { scenes } from './data/scenes.js?v=2';
import { items } from './data/items.js?v=2';
import { dialogues } from './data/dialogues.js?v=2';

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
document.getElementById('start-button').addEventListener('click', async () => {
    // 1. Trigger the fade out on the intro screen
    const introEl = document.getElementById('intro-screen');
    introEl.style.transition = 'opacity 1.0s ease';
    introEl.style.opacity = '0';
    introEl.style.pointerEvents = 'none';

    // 2. Start the engine immediately so the first scene renders underneath
    // Because currentSceneId is null initially, the overlay won't dip to black
    game.start();

    // 3. Cleanup after transition completes
    await new Promise(r => setTimeout(r, 1000));
    introEl.classList.add('hidden');
});
