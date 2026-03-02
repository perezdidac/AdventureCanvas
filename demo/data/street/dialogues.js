const street_dialogues = {
    grandma_chat: {
        start: {
            text: "street.grandma.start",
            choices: [
                {
                    text: "street.grandma.choices.praise",
                    nextNode: "praise_plant",
                    once: true
                },
                {
                    text: "street.grandma.choices.tickets",
                    nextNode: "tickets_hint",
                    once: true
                },
                {
                    text: "street.grandma.choices.pere",
                    condition: (engine) => engine.state.hasItem('neighbor_letter'),
                    nextNode: "about_pere",
                    once: true
                },
                { text: "ui.close" }
            ]
        },
        praise_plant: { text: "street.grandma.praise_plant", nextNode: "start" },
        tickets_hint: { text: "street.grandma.tickets_hint", nextNode: "start" },
        about_pere: { text: "street.grandma.about_pere", nextNode: "start" }
    },
    grandma_return_ring_msg: {
        start: {
            text: "street.grandma.about_ring",
            onEnter: (engine) => {
                engine.state.removeFromInventory('silver_ring');
                engine.state.setFlag('ring_returned', true);
            },
            choices: [{ text: "street.grandma.choices.glad" }]
        }
    },
    grandma_thanks_msg: {
        start: {
            text: "street.grandma.thanks",
            choices: [{ text: "ui.close" }]
        }
    },
    paco_chat: {
        start: {
            text: "street.paco.start",
            choices: [
                {
                    text: "street.paco.choices.dog_info",
                    nextNode: "dog_info",
                    once: true
                },
                {
                    text: "street.paco.choices.bar_info",
                    nextNode: "bar_info",
                    once: true
                },
                {
                    text: "street.paco.choices.tickets_found",
                    condition: (engine) => engine.state.getFlag('knows_about_tickets') && !engine.state.getFlag('talked_about_tickets_with_paco'),
                    nextNode: "tickets_found",
                    once: true
                },
                {
                    text: "street.paco.choices.give_bone",
                    condition: (engine) => engine.state.hasItem('bone'),
                    action: (engine) => engine.state.removeFromInventory('bone'),
                    nextNode: "give_bone",
                    once: true
                },
                {
                    text: "street.paco.choices.trade_flyer",
                    condition: (engine) => engine.state.hasItem('torn_flyer') && !engine.state.getFlag('traded_flyer'),
                    nextNode: "trade_flyer",
                    once: true
                },
                {
                    text: "street.paco.choices.leave",
                    nextNode: null
                }
            ]
        },
        dog_info: {
            text: "street.paco.dog_info",
            nextNode: "start"
        },
        bar_info: {
            text: "street.paco.bar_info",
            nextNode: "start"
        },
        tickets_found: {
            text: "street.paco.tickets_found",
            action: (engine) => engine.state.setFlag('talked_about_tickets_with_paco', true),
            nextNode: "start"
        },
        give_bone: {
            text: "street.paco.give_bone",
            nextNode: "start"
        },
        trade_flyer: {
            text: "street.paco.trade_flyer",
            action: (engine) => {
                engine.state.removeFromInventory('torn_flyer');
                engine.state.addToInventory('uv_flashlight');
                engine.state.setFlag('traded_flyer', true);
            },
            nextNode: "start"
        }
    },
    fountain_msg: {
        start: {
            text: "street.fountain.start",
            choices: [
                {
                    text: "street.fountain.choices.look",
                    condition: (engine) => !engine.state.hasItem('bone') && !engine.state.getFlag('found_bone'),
                    nextNode: "find_bone",
                    once: true
                },
                {
                    text: "ui.close"
                }
            ]
        },
        find_bone: {
            text: "street.fountain.find_bone",
            onEnter: (engine) => {
                engine.state.addToInventory('bone');
                engine.state.setFlag('found_bone', true);
            },
            choices: [{ text: "street.fountain.choices_bone.nice" }]
        }
    },
    flyer_msg: {
        start: {
            text: "street.flyer_item.start",
            onEnter: (engine) => {
                if (!engine.state.hasItem('flyer_item')) {
                    engine.state.addToInventory('flyer_item');
                }
            },
            choices: []
        }
    },
    sun_msg: {
        start: {
            text: "street.sunset.start",
            choices: [
                {
                    text: "street.sunset.choices.watch",
                    condition: (engine) => !engine.state.getFlag('gone_to_evening'),
                    nextNode: "watch_sunset",
                    once: true
                },
                { text: "street.sunset.choices.too_bright" }
            ]
        },
        watch_sunset: {
            text: "street.sunset.watch_sunset",
            onEnter: (engine) => engine.state.setFlag('gone_to_evening', true),
            choices: [
                { text: "street.sunset.choices_watch.evening", action: (engine) => engine.state.loadScene('street2') }
            ]
        }
    },
    bar_sign_msg: {
        start: {
            text: "street.hotspots.bar_door",
            choices: [
                {
                    text: "street.bar_door.choices.go_inside",
                    condition: (engine) => engine.state.getFlag('gone_to_evening'),
                    action: (engine) => engine.state.loadScene('bar')
                },
                {
                    text: "street.bar_door.choices.closed",
                    condition: (engine) => !engine.state.getFlag('gone_to_evening'),
                    nextNode: "locked_msg"
                },
                { text: "street.bar_door.choices.later" }
            ]
        },
        locked_msg: {
            text: "street.bar_door.locked",
            choices: [{ text: "ui.close" }]
        }
    },
    street_house_door_msg: {
        start: {
            text: "street.house_door.start",
            choices: [
                {
                    text: "street.house_door.choices.go",
                    action: (engine) => engine.state.loadScene('house')
                },
                { text: "street.house_door.choices.stay" }
            ]
        }
    },
    alley_transition_msg: {
        start: {
            text: "street.transitions.alley.start",
            choices: [
                { text: "street.transitions.alley.choices.head", action: (engine) => engine.state.loadScene('alley') },
                { text: "street.transitions.alley.choices.spooky" }
            ]
        }
    },
    riverside_transition_msg: {
        start: {
            text: "street.transitions.river.start",
            choices: [
                { text: "street.transitions.river.choices.go", action: (engine) => engine.state.loadScene('riverview') },
                { text: "street.transitions.river.choices.stay" }
            ]
        }
    },
    // Evening variant: open bar door
    bar_door_open_msg: {
        start: {
            text: "street.bar_door_open.start",
            choices: [
                { text: "street.bar_door_open.choices.go", action: (engine) => engine.state.loadScene('bar') },
                { text: "street.bar_door_open.choices.later" }
            ]
        }
    },
    grandma_evening_chat: {
        start: {
            text: "street2.grandma.start",
            choices: [
                {
                    text: "street2.grandma.choices.bar",
                    nextNode: "bar_comment"
                },
                { text: "ui.close" }
            ]
        },
        bar_comment: {
            text: "street2.grandma.comment",
            nextNode: "start"
        }
    },
    // Soft narrative trigger to shift from day to evening (street → street2)
    evening_transition_msg: {
        start: {
            text: "street.transitions.evening.start",
            choices: [
                { text: "street.transitions.evening.choices.already", action: (engine) => engine.state.loadScene('street2') }
            ]
        }
    }
};
