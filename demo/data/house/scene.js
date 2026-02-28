const house_scene = {
    background: 'assets/house.png',
    onEnter: (engine) => {
        console.log("You entered the townhouse portal. It's cool and quiet in here.");
    },
    hotspots: {
        door: {
            name: "Exit to Street",
            x: 100,
            y: 150,
            width: 249,
            height: 1099,
            onClick: (engine) => {
                engine.dialogue.start('house_exit_msg');
            }
        },
        mailboxes: {
            name: "The Mailboxes",
            x: 540,
            y: 607,
            width: 560,
            height: 160,
            onClick: (engine) => {
                engine.dialogue.start('mailbox_msg');
            }
        },
        notes: {
            name: "The Corkboard",
            x: 603,
            y: 298,
            width: 400,
            height: 290,
            onClick: (engine) => {
                engine.dialogue.start('corkboard_msg');
            }
        },
        breakers: {
            name: "Electrical Breakers",
            x: 1077,
            y: 154,
            width: 200,
            height: 150,
            onClick: (engine) => {
                engine.dialogue.start('breakers_msg');
            }
        },
        boxes: {
            name: "Storage Boxes",
            x: 1112,
            y: 602,
            width: 597,
            height: 502,
            onClick: (engine) => {
                engine.dialogue.start('boxes_msg');
            }
        },
        bicycle: {
            name: "The Old Bicycle",
            x: 1719,
            y: 718,
            width: 339,
            height: 462,
            onClick: (engine) => {
                engine.dialogue.start('generic_look', 'start', "A rusty mountain bike. It's probably been here since the 80s.");
            }
        },
        stairs: {
            name: "Stairs to Floors",
            x: 2090,
            y: 357,
            width: 628,
            height: 921,
            onClick: (engine) => {
                engine.dialogue.start('generic_look', 'start', "The stairs lead up to the neighbor apartments. It's too dark to see much up there.");
            }
        },
        light_switch: {
            name: "Light Switch",
            x: 2742,
            y: 578,
            width: 50,
            height: 90,
            onClick: (engine) => {
                engine.dialogue.start('light_switch_msg');
            }
        }
    }
};
