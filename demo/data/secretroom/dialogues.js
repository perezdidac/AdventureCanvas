const secretroom_dialogues = {
    "journal_msg": {
        "start": {
            text: "secretroom.journal.read",
            onEnter: (engine) => {
                if (!engine.state.hasItem('journal')) {
                    engine.state.addToInventory('journal');
                }
            },
            choices: [{ text: "ui.close" }]
        }
    },
    "crystal_device_msg": {
        "start": {
            text: "secretroom.device.info",
            choices: [
                {
                    text: "secretroom.device.choices.activate",
                    condition: (engine) => !engine.state.getFlag('activated_device') && !engine.state.getFlag('breaker_tripped'),
                    nextNode: "try_activate",
                    once: false
                },
                {
                    text: "secretroom.device.choices.no_power",
                    condition: (engine) => engine.state.getFlag('breaker_tripped'),
                    nextNode: "no_power",
                    once: false
                },
                { text: "ui.close" }
            ]
        },
        "no_power": {
            text: "secretroom.device.no_power",
            choices: [{ text: "ui.close" }]
        },
        "try_activate": {
            text: "secretroom.device.try_activate",
            onEnter: (engine) => {
                const hasLens = engine.state.hasItem('river_crystal');
                const hasGear = engine.state.hasItem('rusty_gear');
                const hasPower = engine.state.hasItem('charged_core');

                if (hasLens && hasGear && hasPower) {
                    engine.state.setFlag('activated_device', true);
                    engine.state.removeFromInventory('river_crystal');
                    engine.state.removeFromInventory('rusty_gear');
                    engine.state.removeFromInventory('charged_core');
                } else {
                    // Fail state: overload trips the breaker
                    engine.state.setFlag('breaker_tripped', true);
                }
            },
            choices: [
                {
                    text: "secretroom.device.choices_try.check",
                    condition: (engine) => engine.state.getFlag('activated_device'),
                    nextNode: "success"
                },
                {
                    text: "secretroom.device.choices_try.check",
                    condition: (engine) => !engine.state.getFlag('activated_device'),
                    nextNode: "failure"
                }
            ]
        },
        "success": {
            text: "secretroom.device.success",
            choices: [{ text: "ui.close" }]
        },
        "failure": {
            text: "secretroom.device.failure",
            choices: [{ text: "ui.close" }]
        }
    },
    "map_msg": { "start": { text: "secretroom.map.info", choices: [{ text: "ui.close" }] } },
    "core_gem_msg": {
        "start": {
            text: "secretroom.gem.info",
            choices: [
                {
                    text: "secretroom.gem.choices.take",
                    condition: (engine) => !engine.state.hasItem('the_core'),
                    onEnter: (engine) => engine.state.addToInventory('the_core'),
                    once: true
                },
                { text: "ui.close" }
            ]
        }
    }
};
