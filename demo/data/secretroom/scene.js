const secretroom_scene = {
    background: 'assets/secretroom.png',
    onEnter: (engine) => {
        console.log("You discovered Gregori's secret study!");
        engine.state.setFlag('visited_secretroom', true);
    },
    hotspots: {
        door: {
            name: "secretroom.hotspots.exit",
            x: 2327, y: 305, width: 310, height: 637,
            onClick: (engine) => engine.state.loadScene('secondfloor')
        },
        crystal_device: {
            name: "secretroom.hotspots.device",
            x: 1517, y: 413, width: 380, height: 260,
            onClick: (engine) => engine.dialogue.start('crystal_device_msg')
        },
        map: {
            name: "secretroom.hotspots.map",
            x: 1384, y: 743, width: 509, height: 247,
            onClick: (engine) => engine.dialogue.start('map_msg')
        },
        journal: {
            name: "secretroom.hotspots.journal",
            x: 309, y: 244, width: 299, height: 388,
            onClick: (engine) => engine.dialogue.start('journal_msg')
        },
        gem: {
            name: "secretroom.hotspots.gem",
            x: 1150, y: 1112, width: 100, height: 100,
            onClick: (engine) => engine.dialogue.start('core_gem_msg')
        }
    }
};
