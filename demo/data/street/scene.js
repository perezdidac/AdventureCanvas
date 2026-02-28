const street_scene = {
    background: 'assets/street.png',
    onEnter: (engine) => {
        console.log("Welcome to La Vila, Martorell!");
    },
    hotspots: {
        door: {
            name: "Wooden Door",
            x: 167,
            y: 421,
            width: 333,
            height: 934,
            onClick: (engine) => {
                engine.dialogue.start('street_house_door_msg');
            }
        },
        plant: {
            name: "Senyora Maria's Geranium",
            x: 737,
            y: 713,
            width: 140,
            height: 190,
            onClick: (engine) => {
                engine.dialogue.start('grandma_chat', 'praise_plant');
            }
        },
        grandma: {
            name: "Senyora Maria",
            x: 1097,
            y: 699,
            width: 225,
            height: 339,
            onClick: (engine) => {
                engine.dialogue.start('grandma_chat');
            }
        },
        fountain: {
            name: "The Fountain",
            x: 1480,
            y: 888,
            width: 540,
            height: 490,
            onClick: (engine) => {
                engine.dialogue.start('fountain_msg');
            }
        },
        man: {
            name: "Paco",
            x: 2036,
            y: 739,
            width: 202,
            height: 455,
            onClick: (engine) => {
                engine.dialogue.start('paco_chat');
            }
        },
        dog: {
            name: "Tobi the Dog",
            x: 2267,
            y: 1020,
            width: 184,
            height: 171,
            onClick: (engine) => {
                engine.dialogue.start('paco_chat', 'dog_info');
            }
        },
        flyer: {
            name: "Lost Flyer",
            x: 2527,
            y: 722,
            width: 123,
            height: 213,
            onClick: (engine) => {
                engine.dialogue.start('flyer_msg');
            }
        },
        sign: {
            name: "Bar Sign",
            x: 1816,
            y: 453,
            width: 220,
            height: 150,
            onClick: (engine) => {
                engine.dialogue.start('bar_sign_msg');
            }
        },
        sun: {
            name: "The Scorching Sun",
            x: 1668,
            y: 30,
            width: 170,
            height: 128,
            onClick: (engine) => {
                engine.dialogue.start('sun_msg');
            }
        }
    }
};
