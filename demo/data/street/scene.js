const street_scene = {
    background: 'assets/street.png',
    onEnter: (engine) => {
        // Transition to evening only after visiting the secret room
        if (engine.state.getFlag('visited_secretroom')) {
            engine.state.loadScene('street2');
            return;
        }
        console.log("Welcome to La Vila, Martorell!");
    },
    hotspots: {
        house_door: {
            name: "street.hotspots.door",
            x: 167, y: 421, width: 333, height: 934,
            onClick: (engine) => engine.state.loadScene('house')
        },
        plant: {
            name: "street.hotspots.plant",
            x: 737, y: 713, width: 140, height: 190,
            onClick: (engine) => engine.dialogue.start('grandma_chat')
        },
        grandma: {
            name: "street.hotspots.grandma",
            x: 1097, y: 699, width: 225, height: 339,
            onClick: (engine) => {
                if (engine.state.getFlag('ring_returned')) {
                    engine.dialogue.start('grandma_thanks_msg');
                } else if (engine.state.hasItem('silver_ring')) {
                    engine.dialogue.start('grandma_return_ring_msg');
                } else {
                    engine.dialogue.start('grandma_chat');
                }
            }
        },
        fountain: {
            name: "street.hotspots.fountain",
            x: 1501, y: 952, width: 506, height: 395,
            onClick: (engine) => engine.dialogue.start('fountain_msg')
        },
        dog: {
            name: "street.hotspots.dog",
            x: 2251, y: 1052, width: 156, height: 116,
            onClick: (engine) => engine.dialogue.start('paco_chat')
        },
        flyer: {
            name: "street.hotspots.flyer",
            x: 2527, y: 722, width: 123, height: 213,
            onClick: (engine) => engine.dialogue.start('flyer_msg')
        },
        sign: {
            name: "street.hotspots.sign",
            x: 1816, y: 453, width: 220, height: 150,
            onClick: (engine) => engine.dialogue.start('generic_look', 'start', "street.sign.info")
        },
        sun: {
            name: "street.hotspots.sun",
            x: 1668, y: 30, width: 170, height: 128,
            onClick: (engine) => engine.dialogue.start('sun_msg')
        },
        alley: {
            name: "street.hotspots.alley",
            x: 1408, y: 552, width: 51, height: 392,
            onClick: (engine) => engine.state.loadScene('alley')
        },
        riverside: {
            name: "street.hotspots.riverside",
            x: 2060, y: 1252, width: 714, height: 133,
            onClick: (engine) => engine.state.loadScene('riverview')
        },
        bar_door: {
            name: "street.hotspots.bar_door",
            x: 2138, y: 521, width: 269, height: 504,
            onClick: (engine) => engine.dialogue.start('bar_sign_msg')
        }
    }
};
