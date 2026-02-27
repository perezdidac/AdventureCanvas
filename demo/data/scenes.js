export const scenes = {
    room1: {
        background: 'assets/room_placeholder.png', // You can provide real images later
        onEnter: (engine) => {
            console.log("Entered the starting room.");
        },
        hotspots: {
            door: {
                name: "Wooden Door",
                x: 630, // Updated based on generated art
                y: 270,
                width: 165,
                height: 330,
                onClick: (engine) => {
                    engine.dialogue.start('locked_door_msg');
                },
                onUseItem: (engine, itemId) => {
                    if (itemId === 'key') {
                        engine.state.loadScene('outside');
                        return true; // Mark as successfully used
                    }
                    return false;
                }
            },
            desk: {
                name: "Messy Desk",
                x: 180, // Updated based on generated art
                y: 460,
                width: 220,
                height: 140,
                onClick: (engine) => {
                    if (!engine.state.getFlag('looked_at_desk')) {
                        engine.state.addToInventory('key');
                        engine.state.setFlag('looked_at_desk', true);
                        engine.dialogue.start('found_key_msg');
                    } else {
                        engine.dialogue.start('empty_desk_msg');
                    }
                }
            },
            chest: {
                name: "Old Chest",
                x: 505,
                y: 505,
                width: 95,
                height: 60,
                onClick: (engine) => {
                    if (engine.state.getFlag('opened_chest')) {
                        engine.dialogue.start('chest_empty');
                    } else {
                        engine.dialogue.start('chest_locked');
                    }
                }
            },
            window: {
                name: "Porthole Window",
                x: 345,
                y: 315,
                width: 70,
                height: 95,
                onClick: (engine) => {
                    engine.dialogue.start('look_window');
                }
            }
        }
    },
    outside: {
        background: 'assets/outside_placeholder.png',
        hotspots: {
            pirate: {
                name: "Captain Rusty",
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                onClick: (engine) => {
                    engine.dialogue.start('pirate_conversation');
                },
                onUseItem: (engine, itemId) => {
                    if (itemId === 'map') {
                        engine.dialogue.start('pirate_conversation', 'give_map');
                        return false; // let the dialogue handle inventory removal
                    }
                    return false;
                }
            }
        }
    }
};
