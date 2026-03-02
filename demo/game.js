// Initialize the game engine for 1990s Martorell
const game = new Engine({
    canvasId: 'game-canvas',
    width: 2800, // Matched to new coordinates
    height: 1400,
    initialScene: 'street',
    musicPath: 'assets/music/echoes.mp3',
    debug: true // We can keep debug true for now to check our boxes
});

// Register all scenes
game.registerScene('street', street_scene, street_dialogues, street_items);
game.registerScene('street2', street2_scene, null, null); // variant — inherits street's dialogues & items
game.registerScene('house', house_scene, house_dialogues, house_items);
game.registerScene('alley', alley_scene, alley_dialogues, alley_items);
game.registerScene('bar', bar_scene, bar_dialogues, bar_items);
game.registerScene('secretroom', secretroom_scene, secretroom_dialogues, secretroom_items);
game.registerScene('riverview', riverview_scene, riverview_dialogues, riverview_items);
game.registerScene('secondfloor', secondfloor_scene, secondfloor_dialogues, secondfloor_items);

// Configure the new 90s style intro screen
game.screens.setupIntroScreen({
    title: "Summer of '94 in Martorell",
    bgImage: "assets/street.png",
    startButtonId: "start-button",
    screenId: "intro-screen",
    titleId: "intro-title",
    startButtonText: "START GAME"
});

// Load locales and update UI immediately (especially for the intro screen)
game.i18n.loadLocales().then(() => {
    game.updateUITranslations();
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
