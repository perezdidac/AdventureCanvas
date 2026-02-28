const street_dialogues = {
    grandma_chat: {
        start: {
            text: "Hola, fill! Be careful with my plant. It's very delicaaaaate.",
            choices: [
                {
                    text: "Your plant looks beautiful, Senyora Maria.",
                    nextNode: "praise_plant",
                    once: true // Won't show again in the same conversation
                },
                {
                    text: "Have you heard anything about the concert tickets?",
                    nextNode: "tickets_hint",
                    once: true
                },
                {
                    text: "Have you seen my friend Pere from the building next door?",
                    condition: (engine) => engine.state.hasItem('neighbor_letter'),
                    nextNode: "about_pere",
                    once: true
                },
                {
                    text: "I'll leave you to your cleaning.",
                    nextNode: null
                }
            ]
        },
        praise_plant: {
            text: "Oh, you have good taste! Not like that Paco... his dog keeps sniffing my geraniums. Use the fountain to get some fresh water if it looks dry, please!",
            nextNode: "start"
        },
        tickets_hint: {
            text: "Tickets? Bah! In my day, we just brought a chair to the square. Go ask that man with the dog, he spends all day listening to the radio at the bar.",
            nextNode: "start"
        },
        about_pere: {
            text: "Pere? He left in a hurry this morning. Said he dropped something important. He's always losing things, that boy.",
            nextNode: "start"
        }
    },
    paco_chat: {
        start: {
            text: "Hey! Beautiful day for a walk, isn't it? Tobi thinks so too, though he's a bit hungry.",
            choices: [
                {
                    text: "Nice dog! Does he bite?",
                    nextNode: "dog_info",
                    once: true
                },
                {
                    text: "Do you know anything about the Bar El Gato Negro?",
                    nextNode: "bar_info",
                    once: true
                },
                {
                    text: "I heard you found some tickets?",
                    condition: (engine) => engine.state.getFlag('knows_about_tickets') && !engine.state.getFlag('talked_about_tickets_with_paco'),
                    nextNode: "tickets_found",
                    once: true
                },
                {
                    text: "Here, give Tobi this bone.",
                    condition: (engine) => engine.state.hasItem('bone'),
                    action: (engine) => engine.state.removeFromInventory('bone'),
                    nextNode: "give_bone",
                    once: true
                },
                {
                    text: "See you later, Paco.",
                    nextNode: null
                }
            ]
        },
        dog_info: {
            text: "Tobi? He wouldn't hurt a fly. But he loves finding things. He buried something shiny near the fountain earlier.",
            nextNode: "start"
        },
        bar_info: {
            text: "The Gato Negro? Best coffee in Martorell. But the owner, Quimet, is a bit grumpy. He only talks to people who bring him his morning flyer.",
            nextNode: "start"
        },
        tickets_found: {
            text: "Ah, yes! I taped a note in the portal of that building over there. I left the tickets with Quimet inside the bar.",
            action: (engine) => engine.state.setFlag('talked_about_tickets_with_paco', true),
            nextNode: "start"
        },
        give_bone: {
            text: "Whoa, a juicy bone! Tobi, look what Joan brought you. Thanks, friend!",
            nextNode: "start"
        }
    },
    fountain_msg: {
        start: {
            text: "The local fountain. The water is cold and clear. It smells like old stone and summer.",
            choices: [
                {
                    text: "Look behind the fountain",
                    condition: (engine) => !engine.state.hasItem('bone') && !engine.state.getFlag('found_bone'),
                    nextNode: "find_bone",
                    once: true
                },
                {
                    text: "Close"
                }
            ]
        },
        find_bone: {
            text: "You find a juicy bone hidden behind some loose stones! Tobi must have buried it here.",
            action: (engine) => {
                engine.state.addToInventory('bone');
                engine.state.setFlag('found_bone', true);
            },
            choices: [{ text: "Nice." }]
        }
    },
    flyer_msg: {
        start: {
            text: "It's a colorful flyer: 'FESTA MAJOR 1994 - SOLD OUT'. There's a handwritten note on the back: 'Ask Quimet at the bar'.",
            action: (engine) => {
                if (!engine.state.hasItem('flyer_item')) {
                    engine.state.addToInventory('flyer_item');
                }
            },
            choices: []
        }
    },
    sun_msg: {
        start: {
            text: "The sun is high above Martorell. It's going to be a hot afternoon.",
            choices: []
        }
    },
    bar_sign_msg: {
        start: {
            text: "'Bar El Gato Negro'. The sign looks like it hasn't been painted since the 70s. You can hear soft jazz coming from inside.",
            choices: []
        }
    },
    street_house_door_msg: {
        start: {
            text: "This is the entrance to the building. Want to go inside?",
            choices: [
                { text: "Enter building", action: (engine) => engine.state.loadScene('house') },
                { text: "Maybe later" }
            ]
        }
    }
};
