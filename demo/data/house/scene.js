const house_scene = {
    background: 'assets/house.png',
    onEnter: (engine) => {
        console.log("You entered the townhouse portal. It's cool and quiet in here.");
    },
    hotspots: {
        exit: {
            name: "house.hotspots.exit",
            x: 98, y: 155, width: 249, height: 1099,
            onClick: (engine) => {
                const target = engine.state.getFlag('visited_secretroom') ? 'street2' : 'street';
                engine.state.loadScene(target);
            }
        },
        mailboxes: {
            name: "house.hotspots.mailboxes",
            x: 543, y: 621, width: 554, height: 141,
            onClick: (engine) => engine.dialogue.start('mailbox_msg')
        },
        notes: {
            name: "house.hotspots.notes",
            x: 603, y: 298, width: 400, height: 290,
            onClick: (engine) => engine.dialogue.start('corkboard_msg')
        },
        breakers: {
            name: "house.hotspots.breakers",
            x: 1077, y: 154, width: 200, height: 150,
            onClick: (engine) => engine.dialogue.start('breakers_msg')
        },
        boxes: {
            name: "house.hotspots.boxes",
            x: 1112, y: 602, width: 597, height: 502,
            onClick: (engine) => engine.dialogue.start('boxes_msg')
        },
        bicycle: {
            name: "house.hotspots.bicycle",
            x: 1732, y: 718, width: 339, height: 462,
            onClick: (engine) => engine.dialogue.start('generic_look', 'start', "house.bicycle.info")
        },
        stairs: {
            name: "house.hotspots.stairs",
            x: 2128, y: 421, width: 491, height: 781,
            onClick: (engine) => engine.state.loadScene('secondfloor')
        },
        small_drawer: {
            name: "house.hotspots.drawer",
            x: 550, y: 800, width: 120, height: 80,
            onClick: (engine) => engine.dialogue.start('house_drawer_msg')
        },
        light_switch: {
            name: "house.hotspots.light_switch",
            x: 2742, y: 578, width: 50, height: 90,
            onClick: (engine) => engine.dialogue.start('light_switch_msg')
        }
    }
};
