const bar_scene = {
    background: 'assets/bar.png',
    onEnter: (engine) => {
        console.log("Welcome to El Gato Negro. Smells like coffee and Galician tobacco.");
    },
    hotspots: {
        exit: {
            name: "bar.hotspots.exit",
            x: -1, y: 154, width: 297, height: 920,
            onClick: (engine) => {
                const target = engine.state.getFlag('visited_secretroom') ? 'street2' : 'street';
                engine.state.loadScene(target);
            }
        },
        quimet: {
            name: "bar.hotspots.quimet",
            x: 2002, y: 469, width: 344, height: 451,
            onClick: (engine) => engine.dialogue.start('quimet_msg')
        },
        taps: {
            name: "bar.hotspots.taps",
            x: 1809, y: 489, width: 176, height: 251,
            onClick: (engine) => engine.dialogue.start('beer_taps_msg')
        },
        calendar: {
            name: "bar.hotspots.calendar",
            x: 1190, y: 271, width: 225, height: 270,
            onClick: (engine) => engine.dialogue.start('calendar_msg')
        },
        futbol_club_barcelona_scarf: {
            name: "bar.hotspots.scarf",
            x: 862, y: 118, width: 566, height: 101,
            onClick: (engine) => engine.dialogue.start('scarf_msg')
        },
        photos_on_the_wall: {
            name: "bar.hotspots.photos",
            x: 813, y: 244, width: 342, height: 305,
            onClick: (engine) => engine.dialogue.start('bar_photos_msg')
        },
        slot_machine: {
            name: "bar.hotspots.slot_machine",
            x: 426, y: 408, width: 342, height: 528,
            onClick: (engine) => engine.dialogue.start('slot_machine_msg')
        },
        old_radio: {
            name: "bar.hotspots.radio",
            x: 1513, y: 510, width: 214, height: 133,
            onClick: (engine) => engine.dialogue.start('old_radio_msg')
        }
    }
};
