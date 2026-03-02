const secondfloor_dialogues = {
    "secondfloor_exit_msg": {
        "start": {
            text: "secondfloor.exit.start",
            choices: [
                { text: "secondfloor.exit.choices.go_down", action: (engine) => engine.state.loadScene('house') },
                { text: "secondfloor.exit.choices.stay" }
            ]
        }
    },

    "door2_1_msg": {
        "start": {
            text: "secondfloor.door2_1.start",
            choices: [
                {
                    text: "secondfloor.door2_1.choices.slide_letter",
                    condition: (engine) => engine.state.hasItem('neighbor_letter'),
                    nextNode: "slide_letter",
                    once: true
                },
                {
                    text: "secondfloor.door2_1.choices.try_handle",
                    nextNode: "try_handle"
                },
                {
                    text: "secondfloor.door2_1.choices.knock",
                    nextNode: "knock",
                    once: true
                },
                { text: "secondfloor.door2_1.choices.walk_away" }
            ]
        },
        "try_handle": {
            text: "secondfloor.door2_1.try_handle",
            choices: [{ text: "secondfloor.door2_1.choices_handle.what" }]
        },
        "knock": {
            text: "secondfloor.door2_1.knock",
            choices: [{ text: "secondfloor.door2_1.choices_knock.someone_there" }]
        },
        "slide_letter": {
            text: "secondfloor.door2_1.slide_letter",
            onEnter: (engine) => {
                engine.state.removeFromInventory('neighbor_letter');
                engine.state.setFlag('door_unlocked', true);
            },
            choices: [
                { text: "secondfloor.door2_1.choices_letter.enter", action: (engine) => engine.state.loadScene('secretroom') }
            ]
        }
    },

    "joanas_apartment_msg": {
        "start": {
            text: "secondfloor.joanas_apartment.start",
            choices: [
                {
                    text: "secondfloor.joanas_apartment.choices.knock",
                    nextNode: "joana_knock",
                    once: true
                },
                {
                    text: "secondfloor.joanas_apartment.choices.ask_pere",
                    condition: (engine) => engine.state.getFlag('joana_spoke'),
                    nextNode: "ask_pere",
                    once: true
                },
                { text: "secondfloor.joanas_apartment.choices.leave" }
            ]
        },
        "joana_knock": {
            text: "secondfloor.joanas_apartment.joana_knock",
            onEnter: (engine) => engine.state.setFlag('joana_spoke', true),
            choices: [
                { text: "secondfloor.joanas_apartment.choices_knock.ask", nextNode: "joana_about_pere" },
                { text: "secondfloor.joanas_apartment.choices_knock.sorry" }
            ]
        },
        "joana_about_pere": {
            text: "secondfloor.joanas_apartment.joana_about_pere",
            onEnter: (engine) => engine.state.setFlag('knows_pere_habits', true),
            choices: [{ text: "secondfloor.joanas_apartment.choices_about.thanks" }]
        },
        "ask_pere": {
            text: "secondfloor.joanas_apartment.ask_pere",
            onEnter: (engine) => engine.state.setFlag('joana_extra_clue', true),
            choices: [{ text: "secondfloor.joanas_apartment.choices_ask.dropped" }]
        }
    },

    "hallway_book_msg": {
        "start": {
            text: "secondfloor.hallway_book.start",
            choices: [
                {
                    text: "secondfloor.hallway_book.choices.look",
                    nextNode: "open_book",
                    once: true
                },
                { text: "secondfloor.hallway_book.choices.leave" }
            ]
        },
        "open_book": {
            text: "secondfloor.hallway_book.open_book",
            onEnter: (engine) => engine.state.setFlag('found_hallway_book', true),
            choices: [{ text: "secondfloor.hallway_book.choices_open.more_to_her" }]
        }
    },

    "floor2_breakers_msg": {
        "start": {
            text: "secondfloor.floor2_breakers.start",
            choices: [
                {
                    text: "secondfloor.floor2_breakers.choices.reset",
                    condition: (engine) => engine.state.getFlag('breaker_tripped'),
                    action: (engine) => engine.state.setFlag('breaker_tripped', false),
                    nextNode: "reset_breaker"
                },
                {
                    text: "secondfloor.floor2_breakers.choices.switch",
                    condition: (engine) => !engine.state.getFlag('breaker_tripped'),
                    nextNode: "switch_breaker",
                    once: true
                },
                { text: "secondfloor.floor2_breakers.choices.respect" }
            ]
        },
        "switch_breaker": {
            text: "secondfloor.floor2_breakers.switch_breaker",
            onEnter: (engine) => engine.state.setFlag('breaker_flipped', true),
            choices: [{ text: "secondfloor.floor2_breakers.choices_switch.needs_power" }]
        },
        "reset_breaker": {
            text: "secondfloor.floor2_breakers.reset_breaker",
            choices: [{ text: "ui.close" }]
        }
    },

    "pis_1_3_msg": {
        "start": {
            text: "secondfloor.pis_1_3.start",
            choices: [
                {
                    text: "secondfloor.pis_1_3.choices.knock",
                    nextNode: "pis_1_3_knock",
                    once: true
                },
                { text: "secondfloor.pis_1_3.choices.move_on" }
            ]
        },
        "pis_1_3_knock": {
            text: "secondfloor.pis_1_3.pis_1_3_knock",
            choices: [{ text: "secondfloor.pis_1_3.choices_knock.secrets" }]
        }
    },

    "floor2_window_msg": {
        "start": {
            text: "secondfloor.floor2_window.start",
            choices: [
                {
                    text: "secondfloor.floor2_window.choices.watch",
                    nextNode: "watch_alley",
                    once: true
                },
                { text: "secondfloor.floor2_window.choices.turn" }
            ]
        },
        "watch_alley": {
            text: "secondfloor.floor2_window.watch_alley",
            onEnter: (engine) => engine.state.setFlag('saw_figure_from_window', true),
            choices: [{ text: "secondfloor.floor2_window.choices_watch.not_coincidence" }]
        }
    },

    "floor2_switch_msg": {
        "start": {
            text: "secondfloor.floor2_switch.start",
            choices: [{ text: "secondfloor.floor2_switch.choices.better" }]
        }
    },

    "floor2_plants_msg": {
        "start": {
            text: "secondfloor.floor2_plants.start",
            choices: [
                {
                    text: "secondfloor.floor2_plants.choices.check",
                    nextNode: "check_pots",
                    once: true
                },
                { text: "secondfloor.floor2_plants.choices.pretty" }
            ]
        },
        "check_pots": {
            text: "secondfloor.floor2_plants.check_pots",
            onEnter: (engine) => {
                engine.state.setFlag('found_sun_key', true);
            },
            choices: [{ text: "secondfloor.floor2_plants.choices_check.sun_symbol" }]
        }
    }
};
