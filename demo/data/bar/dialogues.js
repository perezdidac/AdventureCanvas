const bar_dialogues = {
    "quimet_msg": {
        "start": {
            text: "bar.quimet.start",
            choices: [
                {
                    text: "bar.quimet.choices.nephew",
                    condition: (engine) => engine.state.getFlag('visited_secretroom'),
                    nextNode: "about_nephew",
                    once: true
                },
                {
                    text: "bar.quimet.choices.key",
                    condition: (engine) => !engine.state.hasItem('brass_key') && !engine.state.getFlag('drawer_unlocked'),
                    nextNode: "find_key",
                    once: true
                },
                {
                    text: "bar.quimet.choices.place",
                    nextNode: "nice_place"
                },
                { text: "ui.close" }
            ]
        },
        "about_nephew": { text: "bar.quimet.about_nephew", choices: [{ text: "ui.close" }] },
        "find_key": {
            text: "bar.quimet.find_key",
            onEnter: (engine) => engine.state.addToInventory('brass_key'),
            choices: [{ text: "bar.quimet.choices.got_it" }]
        },
        "nice_place": { text: "bar.quimet.nice_place", nextNode: "start" }
    },
    "beer_taps_msg": { "start": { text: "bar.taps.info", choices: [{ text: "ui.close" }] } },
    "calendar_msg": { "start": { text: "bar.calendar.info", choices: [{ text: "ui.close" }] } },
    "scarf_msg": { "start": { text: "bar.scarf.info", choices: [{ text: "ui.close" }] } },
    "bar_photos_msg": {
        "start": {
            text: "bar.photos.info",
            choices: [
                {
                    text: "bar.photos.choices.use_uv",
                    condition: (engine) => engine.state.hasItem('uv_flashlight') && !engine.state.getFlag('uv_revealed'),
                    action: (engine) => engine.state.setFlag('uv_revealed', true),
                    nextNode: "uv_reveal"
                },
                {
                    text: "bar.photos.choices.use_core",
                    condition: (engine) => engine.state.hasItem('the_core') && engine.state.getFlag('uv_revealed') && !engine.state.getFlag('core_charged'),
                    action: (engine) => {
                        engine.state.removeFromInventory('the_core');
                        engine.state.addToInventory('charged_core');
                        engine.state.setFlag('core_charged', true);
                    },
                    nextNode: "charge_core"
                },
                { text: "ui.close" }
            ]
        },
        "uv_reveal": {
            text: "bar.photos.uv_reveal",
            choices: [{ text: "bar.photos.choices_uv.interesting" }]
        },
        "charge_core": {
            text: "bar.photos.charge_core",
            choices: [{ text: "bar.photos.choices_charge.take" }]
        }
    },
    "slot_machine_msg": { "start": { text: "bar.slot.info", choices: [{ text: "ui.close" }] } },
    "old_radio_msg": { "start": { text: "bar.radio.info", choices: [{ text: "ui.close" }] } }
};
