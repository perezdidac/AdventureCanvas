const house_dialogues = {
    // Exit door
    "house_exit_msg": {
        "start": {
            text: "house.house_exit.start",
            choices: [
                { text: "house.house_exit.choices.go_outside", action: (engine) => engine.state.loadScene('street') },
                { text: "house.house_exit.choices.stay" }
            ]
        }
    },

    // Stairs Navigation
    "stairs_msg": {
        "start": {
            text: "house.stairs_msg.start",
            choices: [
                { text: "house.stairs_msg.choices.go_up", action: (engine) => engine.state.loadScene('secondfloor') },
                { text: "house.stairs_msg.choices.stay" }
            ]
        }
    },

    // Mailboxes Mystery
    "mailbox_msg": {
        "start": {
            text: "house.mailbox.start",
            choices: [
                {
                    text: "house.mailbox.choices.search",
                    condition: (engine) => !engine.state.hasItem('neighbor_letter'),
                    nextNode: "find_letter"
                },
                { text: "house.mailbox.choices.look", nextNode: "look" }
            ]
        },
        "find_letter": {
            text: "house.mailbox.find_letter",
            onEnter: (engine) => engine.state.addToInventory('neighbor_letter'),
            choices: [
                { text: "house.mailbox.choices_letter.return" }
            ]
        },
        "look": {
            text: "house.mailbox.look",
            choices: [{ text: "ui.close" }]
        }
    },

    // Corkboard Clues
    "corkboard_msg": {
        "start": {
            text: "house.corkboard.start",
            choices: [
                { text: "house.corkboard.choices.yellow", nextNode: "yellow_note", once: true },
                { text: "house.corkboard.choices.meeting", nextNode: "meeting", once: true },
                { text: "house.corkboard.choices.warning", nextNode: "warning", once: true },
                { text: "ui.close" }
            ]
        },
        "yellow_note": {
            text: "house.corkboard.yellow_note",
            choices: [
                { text: "house.corkboard.choices_yellow.wait", action: (engine) => engine.state.setFlag('knows_about_tickets', true) }
            ]
        },
        "meeting": {
            text: "house.corkboard.meeting",
            choices: [{ text: "house.corkboard.choices_meeting.spooky" }]
        },
        "warning": {
            text: "house.corkboard.warning",
            choices: [{ text: "house.corkboard.choices_warning.serious" }]
        }
    },

    // Electrical Breakers
    "breakers_msg": {
        "start": {
            text: "house.breakers.start",
            choices: [
                { text: "house.breakers.choices.mess", nextNode: "danger" },
                { text: "house.breakers.choices.leave" }
            ]
        },
        "danger": {
            text: "house.breakers.danger",
            choices: [{ text: "house.breakers.choices_danger.good" }]
        }
    },

    // Storage Boxes
    "boxes_msg": {
        "start": {
            text: "house.boxes.start",
            choices: [
                {
                    text: "house.boxes.choices.rummage",
                    condition: (engine) => !engine.state.getFlag('found_gear'),
                    action: (engine) => {
                        engine.state.addToInventory('rusty_gear');
                        engine.state.setFlag('found_gear', true);
                    },
                    nextNode: "find_gear",
                    once: true
                },
                {
                    text: "house.boxes.choices.rummage",
                    condition: (engine) => engine.state.getFlag('found_gear'),
                    nextNode: "find_nothing"
                },
                { text: "house.boxes.choices.leave" }
            ]
        },
        "find_gear": {
            text: "house.boxes.find_gear",
            choices: [{ text: "house.boxes.choices_gear.useful" }]
        },
        "find_nothing": {
            text: "house.boxes.find_nothing",
            choices: [{ text: "house.boxes.choices_find.empty" }]
        }
    },

    // Light switch gag
    "light_switch_msg": {
        "start": {
            text: "house.light_switch_gag.start",
            choices: [
                { text: "house.light_switch_gag.choices.toggle", nextNode: "toggle", once: true },
                { text: "house.light_switch_gag.choices.touch", nextNode: "sticky", once: true },
                { text: "ui.close" }
            ]
        },
        "toggle": {
            text: "house.light_switch_gag.toggle",
            choices: [{ text: "house.light_switch_gag.choices_toggle.trope" }]
        },
        "sticky": {
            text: "house.light_switch_gag.sticky",
            choices: [{ text: "house.light_switch_gag.choices_sticky.ew" }]
        }
    },

    // Generic Look (used by generic objects)
    "generic_look": {
        "start": {
            text: (engine, data) => data || "house.generic.start",
            choices: [{ text: "ui.close" }]
        }
    },
    "house_drawer_msg": {
        "start": {
            text: (engine) => engine.state.getFlag('drawer_unlocked') ? 'house.drawer.open' : 'house.drawer.locked',
            choices: [
                {
                    text: "house.drawer_msg.choices.use_key",
                    condition: (engine) => engine.state.hasItem('brass_key') && !engine.state.getFlag('drawer_unlocked'),
                    action: (engine) => {
                        engine.state.setFlag('drawer_unlocked', true);
                        engine.state.removeFromInventory('brass_key');
                    },
                    nextNode: "start"
                },
                { text: "ui.close" }
            ]
        }
    }
};
