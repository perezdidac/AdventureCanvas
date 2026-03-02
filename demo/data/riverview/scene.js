const riverview_scene = {
    background: 'assets/riverview.png',
    onEnter: (engine) => {
        console.log("You reached the banks of the Llobregat. The water is slow and green.");
    },
    hotspots: {
        exit: {
            name: "riverview.hotspots.exit",
            x: 48, y: 11, width: 483, height: 503,
            onClick: (engine) => {
                const target = engine.state.getFlag('visited_secretroom') ? 'street2' : 'street';
                engine.state.loadScene(target);
            }
        },
        crystal: {
            name: "riverview.hotspots.crystal",
            x: 1527, y: 1009, width: 96, height: 185,
            onClick: (engine) => engine.dialogue.start('river_crystal_msg')
        },
        silver_ring: {
            name: "riverview.hotspots.ring",
            x: 2119, y: 1115, width: 192, height: 165,
            onClick: (engine) => engine.dialogue.start('river_ring_msg')
        },
        car_1: {
            name: "riverview.hotspots.car_1",
            x: 613, y: 209, width: 289, height: 187,
            onClick: (engine) => engine.dialogue.start('car_msg', 'start', 'car_1')
        },
        car_2: {
            name: "riverview.hotspots.car_2",
            x: 837, y: 403, width: 366, height: 203,
            onClick: (engine) => engine.dialogue.start('car_msg', 'start', 'car_2')
        },
        car_3: {
            name: "riverview.hotspots.car_3",
            x: 1166, y: 607, width: 419, height: 224,
            onClick: (engine) => engine.dialogue.start('car_msg', 'start', 'car_3')
        },
        gardener: {
            name: "riverview.hotspots.gardener",
            x: 2119, y: 188, width: 100, height: 100,
            onClick: (engine) => engine.dialogue.start('gardener_msg')
        },
        river: {
            name: "riverview.hotspots.river",
            x: 1753, y: 607, width: 1017, height: 445,
            onClick: (engine) => engine.dialogue.start('river_msg')
        }
    }
};
