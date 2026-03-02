const alley_dialogues = {
    "sundial_msg": { "start": { text: "alley.sundial.info", choices: [{ text: "ui.close" }] } },
    "cat_msg": { "start": { text: "alley.cat.info", choices: [{ text: "ui.close" }] } },
    "wall_inscriptions_msg": { "start": { text: "alley.inscriptions.info", choices: [{ text: "ui.close" }] } },
    "padlocked_door_msg": {
        "start": {
            text: "alley.door.locked",
            choices: [
                {
                    text: "alley.door.choices.use_match",
                    condition: (engine) => engine.state.hasItem('matchbook') && !engine.state.getFlag('lantern_lit'),
                    nextNode: "match_light"
                },
                {
                    text: "alley.door.choices.focus_lens",
                    condition: (engine) => engine.state.hasItem('strange_lens') && engine.state.getFlag('lantern_lit'),
                    nextNode: "open_door"
                },
                { text: "ui.close" }
            ]
        },
        "match_light": { text: "alley.door.match", choices: [{ text: "ui.close" }] },
        "open_door": {
            text: "alley.door.open",
            onEnter: (engine) => engine.state.setFlag('alley_door_open', true),
            choices: [{ text: "alley.door.choices.enter", action: (engine) => engine.state.loadScene('secretroom') }]
        }
    },
    "lantern_msg": {
        "start": {
            text: (engine) => engine.state.getFlag('lantern_lit') ? "alley.lantern.start_lit" : "alley.lantern.start_cold",
            choices: [
                {
                    text: "alley.lantern.choices.light",
                    condition: (engine) => engine.state.hasItem('matchbook') && !engine.state.getFlag('lantern_lit'),
                    action: (engine) => engine.state.setFlag('lantern_lit', true),
                    nextNode: "start"
                },
                { text: "ui.close" }
            ]
        }
    },
    "shady_person_msg": {
        "start": {
            text: "alley.shady_person.info",
            choices: [{ text: "ui.close" }]
        }
    },
    "matches_on_floor_msg": {
        "start": {
            text: "alley.matches_on_floor.info",
            choices: [
                {
                    text: "alley.matches_on_floor.choices.pick_up",
                    condition: (engine) => !engine.state.hasItem('matchbook'),
                    onEnter: (engine) => engine.state.addToInventory('matchbook'),
                    once: true
                },
                { text: "ui.close" }
            ]
        }
    },
    "sewer_grate_msg": {
        "start": {
            text: "alley.sewer_grate.info",
            choices: [
                {
                    text: "alley.sewer_grate.choices.use_gear",
                    condition: (engine) => engine.state.hasItem('rusty_gear') && !engine.state.getFlag('grate_open'),
                    action: (engine) => engine.state.setFlag('grate_open', true),
                    nextNode: "open"
                },
                {
                    text: "alley.sewer_grate.choices.reach",
                    condition: (engine) => !engine.state.getFlag('grate_open'),
                    nextNode: "stuck"
                },
                {
                    text: "alley.sewer_grate.choices.look_inside",
                    condition: (engine) => engine.state.getFlag('grate_open'),
                    nextNode: "opened_view"
                },
                { text: "ui.close" }
            ]
        },
        "stuck": {
            text: "alley.sewer_grate.stuck",
            choices: [{ text: "alley.sewer_grate.choices_stuck.tool" }]
        },
        "open": {
            text: "alley.sewer_grate.open",
            choices: [{ text: "alley.sewer_grate.choices_open.look", nextNode: "opened_view" }]
        },
        "opened_view": {
            text: "alley.sewer_grate.opened_view",
            choices: [
                {
                    text: "alley.sewer_grate.choices_view.take",
                    condition: (engine) => !engine.state.hasItem('torn_flyer'),
                    action: (engine) => engine.state.addToInventory('torn_flyer'),
                    nextNode: "take_flyer",
                    once: true
                },
                { text: "ui.close" }
            ]
        },
        "take_flyer": {
            text: "alley.sewer_grate.take_flyer",
            choices: [{ text: "alley.sewer_grate.choices_take.nice" }]
        }
    }
};
