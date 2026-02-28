const house_dialogues = {
    // Exit door
    "house_exit_msg": {
        "start": {
            text: "Back to the sunny streets of Martorell?",
            choices: [
                { text: "Go outside", action: (engine) => engine.state.loadScene('street') },
                { text: "Stay here" }
            ]
        }
    },

    // Mailboxes Mystery
    "mailbox_msg": {
        "start": {
            text: "A row of old, dented mailboxes. One of them is slightly ajar.",
            choices: [
                {
                    text: "Search the open mailbox",
                    condition: (engine) => !engine.state.hasItem('neighbor_letter'),
                    nextNode: "find_letter"
                },
                { text: "Just look at them", nextNode: "look" }
            ]
        },
        "find_letter": {
            text: "You find a letter addressed to 'Senior Pere' from Floor 2-1. It mentions something about 'The Gato Negro' and 'A favor'.",
            onEnter: (engine) => engine.state.addToInventory('neighbor_letter'),
            choices: [
                { text: "I should probably return this... or investigate." }
            ]
        },
        "look": {
            text: "Names of neighbors are faded. This building has seen better days.",
            choices: [{ text: "Close" }]
        }
    },

    // Corkboard Clues
    "corkboard_msg": {
        "start": {
            text: "The corkboard is covered in dusty notes and old bills.",
            choices: [
                { text: "Read the yellow note", nextNode: "yellow_note", once: true },
                { text: "Look at the meeting announcement", nextNode: "meeting", once: true },
                { text: "Read the passive-aggressive warning", nextNode: "warning", once: true },
                { text: "Close" }
            ]
        },
        "yellow_note": {
            text: "It reads: 'To anyone looking for Festa Major tickets—I left a spare pair at the Bar! Ask Paco if he's seen my dog.'",
            choices: [
                { text: "Wait, Paco is outside! I should ask him about the dog.", action: (engine) => engine.state.setFlag('knows_about_tickets', true) }
            ]
        },
        "meeting": {
            text: "'Neighborhood meeting: Thursday. Topic: The strange noise coming from the basement.'",
            choices: [{ text: "Spooky." }]
        },
        "warning": {
            text: "'To whoever keeps leaving their bike blocking the stairs: I WILL call the municipal police. - Floor 1-2.'",
            choices: [{ text: "People take their stairs seriously." }]
        }
    },

    // Electrical Breakers
    "breakers_msg": {
        "start": {
            text: "The main electrical breakers for the whole building. They look dangerously outdated.",
            choices: [
                { text: "Mess with the switches", nextNode: "danger" },
                { text: "Leave them alone" }
            ]
        },
        "danger": {
            text: "A small spark jumps out. You decide that playing with electricity in a building from the 1900s is a bad idea.",
            choices: [{ text: "Good call." }]
        }
    },

    // Storage Boxes
    "boxes_msg": {
        "start": {
            text: "A mountain of cardboard boxes. They smell of old books and mothballs.",
            choices: [
                { text: "Rummage through them", nextNode: "find_nothing", once: true },
                { text: "Leave them alone" }
            ]
        },
        "find_nothing": {
            text: "You find some old newspapers from 1982 and a single mismatched shoe.",
            choices: [{ text: "Not useful for tickets." }]
        }
    },

    // Light switch gag
    "light_switch_msg": {
        "start": {
            text: "The light switch. It's covered in sticky grime.",
            choices: [
                { text: "Toggle it", nextNode: "toggle", once: true },
                { text: "Touch it with the back of my hand", nextNode: "sticky", once: true },
                { text: "Close" }
            ]
        },
        "toggle": {
            text: "Click! Nothing happens. The bulb must be burnt out... or someone cut the wires.",
            choices: [{ text: "Classic mystery trope." }]
        },
        "sticky": {
            text: "It feels warm, and your hand comes back covered in... jam?",
            choices: [{ text: "Ew." }]
        }
    },

    // Generic Look (used by generic objects)
    "generic_look": {
        "start": {
            text: (engine, data) => data || "You don't see anything unusual.",
            choices: [{ text: "Close" }]
        }
    }
};
