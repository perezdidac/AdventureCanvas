const riverview_dialogues = {
    "river_crystal_msg": {
        "start": {
            text: "riverview.crystal.info",
            choices: [
                {
                    text: "riverview.crystal.choices.take",
                    condition: (engine) => !engine.state.hasItem('river_crystal'),
                    onEnter: (engine) => engine.state.addToInventory('river_crystal'),
                    once: true
                },
                { text: "ui.close" }
            ]
        }
    },
    "river_ring_msg": {
        "start": {
            text: "riverview.ring.info",
            choices: [
                {
                    text: "riverview.ring.choices.take",
                    condition: (engine) => !engine.state.hasItem('silver_ring') && !engine.state.getFlag('ring_returned'),
                    onEnter: (engine) => engine.state.addToInventory('silver_ring'),
                    once: true
                },
                { text: "ui.close" }
            ]
        }
    },
    "car_msg": {
        "start": {
            text: (engine, itemId) => `riverview.${itemId}.info`,
            choices: [{ text: "ui.close" }]
        }
    },
    "gardener_msg": {
        "start": {
            text: "riverview.gardener.info",
            choices: [{ text: "ui.close" }]
        }
    },
    "river_msg": {
        "start": {
            text: "riverview.river.info",
            choices: [{ text: "ui.close" }]
        }
    }
};
