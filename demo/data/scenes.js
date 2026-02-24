export const scenes = {
    room1: {
        background: 'assets/room_placeholder.png', // You can provide real images later
        onEnter: (engine) => {
            console.log("Entered the starting room.");
        },
        hotspots: {
            door: {
                x: 630, // Updated based on generated art
                y: 270,
                width: 165,
                height: 330,
                onClick: (engine) => {
                    const hasKey = engine.state.hasItem('key');
                    if (hasKey) {
                        console.log("You unlocked the door.");
                        engine.state.loadScene('outside');
                    } else {
                        engine.dialogue.start('locked_door_msg');
                    }
                }
            },
            desk: {
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
                x: 300,
                y: 200,
                width: 150,
                height: 300,
                onClick: (engine) => {
                    engine.dialogue.start('pirate_conversation');
                }
            }
        }
    }
};
