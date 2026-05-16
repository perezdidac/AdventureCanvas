// Initialize the game engine for 1990s Martorell
const game = new Engine({
    canvasId: 'game-canvas',
    width: 2800, // Matched to new coordinates
    height: 1400,
    initialScene: 'habitacio',
    musicPath: 'assets/music/echoes.mp3',
    debug: true // We can keep debug true for now to check our boxes
});

// Register all scenes
game.registerScene('habitacio', habitacio_scene, solvay_dialogues, solvay_items);
game.registerScene('menjador', menjador_scene, null, null);
game.registerScene('carrer', carrer_scene, null, null);
game.registerScene('rodalies_pont', rodalies_pont_scene, null, null);
game.registerScene('cau', cau_scene, null, null);
game.registerScene('exterior_cap', exterior_cap_scene, null, null);
game.registerScene('recepcio_cap', recepcio_cap_scene, null, null);
game.registerScene('arxiu_medic', arxiu_medic_scene, null, null);
game.registerScene('carrero_radio', carrero_radio_scene, null, null);
game.registerScene('estudi_radio', estudi_radio_scene, null, null);
game.registerScene('sender_serra', sender_serra_scene, null, null);
game.registerScene('torretes', torretes_scene, null, null);
game.registerScene('pou_ventilacio', pou_ventilacio_scene, null, null);
game.registerScene('campament_oblidats', campament_oblidats_scene, null, null);
game.registerScene('ascensor_carrega', ascensor_carrega_scene, null, null);
game.registerScene('passarella_control', passarella_control_scene, null, null);
game.registerScene('despatx_director', despatx_director_scene, null, null);
game.registerScene('sala_maquines', sala_maquines_scene, null, null);

// Configure the new 90s style intro screen
game.screens.setupIntroScreen({
    title: "La Boira de Solvay",
    bgImage: "assets/street.png",
    startButtonId: "start-button",
    screenId: "intro-screen",
    titleId: "intro-title",
    startButtonText: "JUGAR"
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
