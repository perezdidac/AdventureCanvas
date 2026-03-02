const alley_scene = {
    background: 'assets/alley.png',
    onEnter: (engine) => {
        console.log("A narrow branch off the main street. The silence here is heavy.");
    },
    hotspots: {
        exit: {
            name: "alley.hotspots.exit",
            x: 531, y: 1304, width: 2170, height: 87,
            onClick: (engine) => {
                const target = engine.state.getFlag('visited_secretroom') ? 'street2' : 'street';
                engine.state.loadScene(target);
            }
        },
        sundial: {
            name: "alley.hotspots.sundial",
            x: 1502, y: 400, width: 321, height: 383,
            onClick: (engine) => engine.dialogue.start('sundial_msg')
        },
        padlocked_door: {
            name: "alley.hotspots.door",
            x: 2020, y: 408, width: 350, height: 806,
            onClick: (engine) => {
                if (engine.state.getFlag('alley_door_open') || engine.state.getFlag('visited_secretroom')) {
                    engine.state.loadScene('secretroom');
                } else {
                    engine.dialogue.start('padlocked_door_msg');
                }
            }
        },
        mystery_cat: {
            name: "alley.hotspots.cat",
            x: 1521, y: 112, width: 128, height: 109,
            onClick: (engine) => engine.dialogue.start('cat_msg')
        },
        wall_inscriptions: {
            name: "alley.hotspots.inscriptions",
            x: 1510, y: 841, width: 313, height: 216,
            onClick: (engine) => engine.dialogue.start('wall_inscriptions_msg')
        },
        lantern: {
            name: "alley.hotspots.lantern",
            x: 149, y: 1129, width: 339, height: 222,
            onClick: (engine) => engine.dialogue.start('lantern_msg')
        },
        shady_person: {
            name: "alley.hotspots.shady_person",
            x: 723, y: 755, width: 104, height: 224,
            onClick: (engine) => engine.dialogue.start('shady_person_msg')
        },
        matches_on_floor: {
            name: "alley.hotspots.matches_on_floor",
            x: 1604, y: 1201, width: 209, height: 98,
            onClick: (engine) => engine.dialogue.start('matches_on_floor_msg')
        },
        sewer_grate: {
            name: "alley.hotspots.sewer_grate",
            x: 1200, y: 1250, width: 300, height: 100, // Approximate position near the floor
            onClick: (engine) => engine.dialogue.start('sewer_grate_msg')
        }
    }
};
