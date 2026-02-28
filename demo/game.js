// Initialize the game engine for 1990s Martorell
const game = new Engine({
    canvasId: 'game-canvas',
    width: 2800, // Matched to new coordinates
    height: 1400,
    initialScene: 'street',
    debug: true // We can keep debug true for now to check our boxes
});

// Register the new Street scene components
game.registerScene('street', street_scene, street_dialogues, street_items);
game.registerScene('house', house_scene, house_dialogues, house_items);

// Configure the new 90s style intro screen
game.screens.setupIntroScreen({
    title: "Summer of '94 in La Vila",
    bgImage: "assets/street.png",
    startButtonId: "start-button",
    screenId: "intro-screen",
    titleId: "intro-title"
});

// Show the intro screen to start
game.screens.showIntroScreen();

document.getElementById('start-button').addEventListener('click', async (e) => {
    e.stopPropagation(); // Prevent click from reaching global window/canvas handlers

    // Lock engine input while intro fades
    game.state.isLocked = true;

    const introEl = document.getElementById('intro-screen');
    introEl.style.transition = 'opacity 0.5s ease';
    introEl.style.opacity = '0';
    introEl.style.pointerEvents = 'none';

    await new Promise(r => setTimeout(r, 500));
    introEl.classList.add('hidden');

    game.state.isLocked = false;
    game.start();
});
