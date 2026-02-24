export const dialogues = {
    locked_door_msg: {
        start: {
            text: "The door is locked tight. It has an old rusty keyhole.",
            choices: [] // Empty choices will default to an "End Conversation" button
        }
    },
    found_key_msg: {
        start: {
            text: "You rumble through the desk and find a Rusty Key!",
            choices: []
        }
    },
    empty_desk_msg: {
        start: {
            text: "Just an empty desk. Nothing else of interest here.",
            choices: []
        }
    },
    chest_locked: {
        start: {
            text: "It's a sturdy wooden chest. It looks quite old but isn't locked!",
            choices: [
                {
                    text: "Open it",
                    action: (engine) => {
                        engine.state.addToInventory('map');
                        engine.state.setFlag('opened_chest', true);
                    },
                    nextNode: "found_map"
                },
                {
                    text: "Leave it alone",
                    nextNode: null
                }
            ]
        },
        found_map: {
            text: "You found a Treasure Map inside!",
            choices: []
        }
    },
    chest_empty: {
        start: {
            text: "The chest is empty now.",
            choices: []
        }
    },
    look_window: {
        start: {
            text: "Through the porthole window, you can see a ship in the distance under the moonlight.",
            choices: []
        }
    },
    pirate_conversation: {
        start: {
            text: "Arh matey! What brings ye to my island?",
            choices: [
                {
                    text: "I'm looking for treasure!",
                    nextNode: "treasure"
                },
                {
                    text: "Who are you?",
                    nextNode: "who_are_you"
                },
                {
                    text: "Just passing by.",
                    nextNode: "passing"
                }
            ]
        },
        who_are_you: {
            text: "I be Captain Rusty! The most fearsome robot pirate in these parts. And you?",
            choices: [
                {
                    text: "I'm just an adventurer.",
                    nextNode: "passing"
                }
            ]
        },
        treasure: {
            text: "Treasure ye say? Good luck with that without a map! Har har!",
            onEnter: (engine) => engine.state.setFlag("knows_about_map", true),
            choices: [
                {
                    text: "Actually, I found a map!",
                    condition: (engine) => engine.state.hasItem('map'),
                    nextNode: "give_map"
                },
                {
                    text: "I'll find one eventually. See ya!",
                    nextNode: null // null means end dialogue
                }
            ]
        },
        give_map: {
            text: "Shiver me timbers! That be the legendary map! I'll give ye this shiny Gold Coin for it!",
            onEnter: (engine) => {
                engine.state.removeFromInventory('map');
                engine.state.addToInventory('coin');
            },
            choices: [
                {
                    text: "Deal!",
                    nextNode: null
                }
            ]
        },
        passing: {
            text: "Aye, make it quick then. We don't like strangers.",
            choices: []
        }
    }
};
