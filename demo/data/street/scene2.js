const street2_scene = {
    extends: 'street',
    background: 'assets/street2.png',

    // These hotspots are removed from the street base
    removeHotspots: ['man', 'dog', 'sun'],

    // New/overriding hotspots for this variant
    hotspots: {
        bar_door: {
            name: "street2.hotspots.bar_door",
            x: 2138, y: 521, width: 269, height: 504,
            onClick: (engine) => engine.state.loadScene('bar')
        },
        house_door: {
            name: "street.hotspots.door",
            x: 167, y: 421, width: 333, height: 934,
            onClick: (engine) => engine.state.loadScene('house')
        },
        grandma: {
            name: "street2.hotspots.grandma",
            x: 1097, y: 699, width: 225, height: 339,
            onClick: (engine) => engine.dialogue.start('grandma_evening_chat')
        }
    },

    onEnter: (engine) => {
        console.log("Evening in La Vila. The bar door is open.");
    }
};
