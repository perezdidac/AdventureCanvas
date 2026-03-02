const secondfloor_scene = {
    background: 'assets/secondfloor.png',
    onEnter: (engine) => { console.log("Second floor of the building."); },
    hotspots: {
        stairs: {
            name: "Stairs Down",
            x: 2061, y: 1051, width: 718, height: 333,
            onClick: (engine) => engine.state.loadScene('house')
        },
        door2_1: {
            name: "Door 2-1 (Pere's Apartment)",
            x: 974, y: 275, width: 220, height: 800,
            onClick: (engine) => {
                if (engine.state.getFlag('door_unlocked') || engine.state.getFlag('visited_secretroom')) {
                    engine.state.loadScene('secretroom');
                } else {
                    engine.dialogue.start('door2_1_msg');
                }
            }
        },
        joanas_apartment: {
            name: "Joana's Apartment",
            x: 181, y: 184, width: 380, height: 1158,
            onClick: (engine) => engine.dialogue.start('joanas_apartment_msg')
        },
        book: {
            name: "Abandoned Book",
            x: 1596, y: 1103, width: 200, height: 114,
            onClick: (engine) => engine.dialogue.start('hallway_book_msg')
        },
        electrical_breakers: {
            name: "Electrical Breakers",
            x: 2463, y: 404, width: 197, height: 154,
            onClick: (engine) => engine.dialogue.start('floor2_breakers_msg')
        },
        pis_1_3: {
            name: "Door 1-3",
            x: 1957, y: 279, width: 449, height: 694,
            onClick: (engine) => engine.dialogue.start('pis_1_3_msg')
        },
        window: {
            name: "Hallway Window",
            x: 1427, y: 297, width: 351, height: 448,
            onClick: (engine) => engine.dialogue.start('floor2_window_msg')
        },
        switch: {
            name: "Light Switch",
            x: 1888, y: 584, width: 46, height: 64,
            onClick: (engine) => engine.dialogue.start('floor2_switch_msg')
        },
        plants: {
            name: "Potted Plants",
            x: 640, y: 557, width: 303, height: 220,
            onClick: (engine) => engine.dialogue.start('floor2_plants_msg')
        }
    }
};
