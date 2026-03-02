const locales_en = {
    "ui": {
        "inventory_title": "Backpack",
        "debug_tools": "🔧 Debug Tools",
        "hide_debug": "⬇️ Hide Debug",
        "edit_hotspots": "Edit Hotspots",
        "new_object": "New Object",
        "copy_coords": "Copy Coords",
        "continue": "Continue...",
        "close": "Close",
        "lang_toggle": "Switch Language",
        "mute_toggle": "Toggle Music"
    },
    "items": {
        "bone": {
            "name": "Juicy Bone"
        },
        "flyer_item": {
            "name": "Concert Flyer"
        },
        "strange_lens": {
            "name": "Strange Lens"
        },
        "river_crystal": {
            "name": "River Crystal"
        },
        "the_core": {
            "name": "The Core"
        },
        "charged_core": {
            "name": "Charged Core"
        },
        "matchbook": {
            "name": "Matchbook"
        },
        "journal": {
            "name": "Gregori's Journal"
        },
        "brass_key": {
            "name": "Old Brass Key"
        },
        "silver_ring": {
            "name": "Silver Ring"
        },
        "neighbor_letter": {
            "name": "Neighbor's Letter"
        },
        "rusty_gear": {
            "name": "Rusty Gear"
        },
        "torn_flyer": {
            "name": "Torn Flyer"
        },
        "uv_flashlight": {
            "name": "Heavy Flashlight"
        }
    },
    "intro": {
        "title": "Summer of '94 in Martorell",
        "start": "START GAME"
    },
    "street": {
        "name": "Carrer Major",
        "hotspots": {
            "grandma": "Senyora Maria",
            "man": "Paco",
            "dog": "Tobi",
            "fountain": "Village Fountain",
            "bar_door": "Bar El Gato Negro (Closed)",
            "house_portal": "Building Portal",
            "alley_entrance": "Dark Alleyway",
            "river_path": "Path to River",
            "door": "Townhouse Portal",
            "plant": "Senyora Maria's Geraniums",
            "flyer": "Concert Flyer",
            "sign": "Bar Gato Negro Sign",
            "sun": "The Afternoon Sun",
            "alley": "The Alleyway",
            "riverside": "The River Llobregat"
        },
        "door": {
            "info": "A beautiful entry to a neighboring townhouse."
        },
        "sign": {
            "info": "The Bar El Gato Negro sign. It's unlit right now."
        },
        "sun": {
            "info": "The Mediterranean sun is high. Perfect for a siesta."
        },
        "grandma": {
            "start": "Hello, son! Be careful with my plant. It's very delicate.",
            "choices": {
                "praise": "Your plant looks beautiful, Senyora Maria.",
                "tickets": "Have you heard about the concert tickets?",
                "pere": "Have you seen Pere from the building next door?"
            },
            "praise_plant": "Oh, you have good taste! Use the fountain to get some fresh water if it looks dry, please!",
            "tickets_hint": "Tickets? Bah! Go ask that man with the dog. He listens to the radio at the bar all day.",
            "about_pere": "Pere? He left in a hurry this morning. Said he dropped something important. He's always losing things.",
            "about_ring": "My ring! You found it! Oh, you're a saint. I was so worried. Here, take this — Gregori once told me a secret about the alley sundial: 3, 12, 1. I never knew what it meant.",
            "thanks": "Thank you again for the ring, son."
        },
        "paco": {
            "start": "Hey! Beautiful day for a walk, isn't it? Tobi thinks so too, though he's a bit hungry.",
            "choices": {
                "dog_info": "Nice dog! Does he bite?",
                "bar_info": "Do you know anything about the Bar El Gato Negro?",
                "tickets_found": "I heard you found some tickets?",
                "give_bone": "Here, give Tobi this bone.",
                "trade_flyer": "I found this torn flyer piece.",
                "leave": "See you later, Paco."
            },
            "dog_info": "Tobi? He wouldn't hurt a fly. But he loves finding things. He buried something shiny near the fountain earlier.",
            "bar_info": "The Gato Negro? Best coffee in Martorell. But the owner, Quimet, is a bit grumpy. He only talks to people who bring him his morning flyer.",
            "tickets_found": "Ah, yes! I taped a note in the portal of that building over there. I left the tickets with Quimet inside the bar.",
            "give_bone": "Whoa, a juicy bone! Tobi, look what Joan brought you. Thanks, friend!",
            "trade_flyer": "Is that... half of the Festa Major flyer? I've been looking everywhere for the lineup! Here, take this old heavy flashlight I found in the river in exchange. It still works, but the light looks a bit purple."
        },
        "fountain": {
            "start": "The local fountain. The water is cold and clear. It smells like old stone and summer.",
            "choices": {
                "look": "Look behind the fountain"
            },
            "find_bone": "You find a juicy bone hidden behind some loose stones! Tobi must have buried it here.",
            "choices_bone": {
                "nice": "Nice."
            }
        },
        "flyer_item": {
            "start": "It's a colorful flyer: 'FESTA MAJOR 1994 - SOLD OUT'. There's a handwritten note on the back: 'Ask Quimet at the bar'."
        },
        "sunset": {
            "start": "The sun is high above Martorell. Long, lazy afternoon shadows.",
            "choices": {
                "watch": "Watch the sun set over the town",
                "too_bright": "Too bright to look at."
            },
            "watch_sunset": "You wait. The light turns gold, then orange, then pink. Paco waves goodbye with Tobi trotting beside him. The Bar El Gato Negro door swings open.",
            "choices_watch": {
                "evening": "Evening in La Vila."
            }
        },
        "bar_door": {
            "choices": {
                "go_inside": "Go inside",
                "closed": "It's closed.",
                "later": "Maybe later"
            },
            "locked": "The Bar El Gato Negro. Closed until the evening."
        },
        "bar_door_open": {
            "start": "The door to Bar El Gato Negro is wide open this evening. Jazz drifts out along with the smell of coffee and cigarettes.",
            "choices": {
                "go": "Go inside",
                "later": "Maybe later."
            }
        },
        "house_door": {
            "start": "The heavy wooden door to the building portal. It's slightly ajar.",
            "choices": {
                "go": "Go inside",
                "stay": "Stay here"
            }
        },
        "transitions": {
            "alley": {
                "start": "A narrow, dark alleyway. It looks mysterious.",
                "choices": {
                    "head": "Head down the alley",
                    "spooky": "Too spooky."
                }
            },
            "river": {
                "start": "A dirt path leading down towards the Llobregat river.",
                "choices": {
                    "go": "Go to the river",
                    "stay": "Stay in town"
                }
            },
            "evening": {
                "start": "The afternoon has slipped away. The sky over Martorell is deep orange and the air is finally cooler. Paco and Tobi have gone home for dinner.",
                "choices": {
                    "already": "Evening already..."
                }
            }
        }
    },
    "street2": {
        "hotspots": {
            "bar_door": "Bar El Gato Negro (Open!)",
            "grandma": "Senyora Maria"
        },
        "grandma": {
            "start": "Oh, it's you again. The air is finally cooler. Have you seen? The bar is finally open.",
            "choices": {
                "bar": "The bar looks lively."
            },
            "comment": "Lively? It's the same three people every night! But they have the best coffee. Go on, don't let me keep you."
        }
    },
    "bar": {
        "name": "Bar El Gato Negro",
        "hotspots": {
            "exit": "Back to Street",
            "quimet": "Quimet",
            "taps": "Beer Taps",
            "calendar": "Old Calendar",
            "scarf": "Barça Scarf",
            "photos": "Old Photos",
            "slot_machine": "Slot Machine",
            "radio": "Bakelite Radio"
        },
        "quimet": {
            "start": "'Are you lost, or just looking for a coffee?' Quimet grunts without looking up from a glass.",
            "choices": {
                "nephew": "I'm looking for Gregori's nephew.",
                "key": "Did anyone leave a key here?",
                "place": "Nice place you've got here."
            },
            "about_nephew": "'Pere? He's a strange one. Spends all day in that attic tinkering. Tell him he still owes me for a month of cortados.'",
            "find_key": "'This key? Found it under a stool yesterday. Probably Gregori's. Take it if you want, it's just gathering dust.'",
            "nice_place": "'It's a job. Been here since before you were born. The walls have seen more history than the town museum.'"
        },
        "taps": {
            "info": "Three Estrella Damm taps, cold and sweating in the summer heat."
        },
        "calendar": {
            "info": "A faded calendar from 1994. Several dates are circled in red."
        },
        "scarf": {
            "info": "A dusty Blaugrana scarf. 'Més que un club'."
        },
        "photos": {
            "info": "Old photos of Martorell. One shows a man with a strange crystal device. Parts of the photo look freshly smudged.",
            "choices": {
                "use_uv": "Shine the Heavy Flashlight on the photos",
                "use_core": "Hold 'The Core' against the glowing symbol"
            },
            "uv_reveal": "The purple light reveals hidden luminescent ink! A swirling symbol on the photo begins to glow, resonating with a strange frequency.",
            "choices_uv": {
                "interesting": "It's a power source."
            },
            "charge_core": "You press the amber gem against the glowing symbol. The light drains from the photo and surges into the gem. It's now pulsing with intense, raw energy.",
            "choices_charge": {
                "take": "Take the Charged Core"
            }
        },
        "slot": {
            "info": "The slot machine is 'OUT OF ORDER'. Probably saved me some money."
        },
        "radio": {
            "info": "A heavy Bakelite radio tuned to Radio Martorell."
        }
    },
    "house": {
        "name": "Building Entrance",
        "hotspots": {
            "exit": "Exit to Street",
            "mailboxes": "The Mailboxes",
            "stairs": "Stairs Up",
            "drawer": "Small Drawer",
            "notes": "The Corkboard",
            "breakers": "Electrical Box",
            "boxes": "Storage Boxes",
            "bicycle": "Neighbor's Bicycle",
            "light_switch": "Light Switch"
        },
        "notes": {
            "info": "Notes about lost cats and apartment rentals. A typical neighborhood board."
        },
        "breakers": {
            "info": "A grey metal box. A faint electrical hum comes from within.",
            "start": "The main electrical breakers for the whole building. They look dangerously outdated.",
            "choices": {
                "mess": "Mess with the switches",
                "leave": "Leave them alone"
            },
            "danger": "A small spark jumps out. You decide that playing with electricity in a building from the 1900s is a bad idea.",
            "choices_danger": {
                "good": "Good call."
            }
        },
        "mailbox": {
            "start": "The mailboxes for the building. One of them, 2-1, is hanging open. It seems to have a lot of letters sticking out.",
            "choices": {
                "search": "Search the open mailbox",
                "look": "Just look at the names"
            },
            "find_letter": "You find a letter addressed to 'Pere Fontanals, Pis 2-1'. It must have been delivered while he was away.",
            "choices_letter": {
                "return": "Return it later"
            },
            "look": "Fontanals, Puig, Garcès... all local names from Martorell."
        },
        "corkboard": {
            "start": "A messy bulletin board with flyers, notes, and local classifieds.",
            "choices": {
                "yellow": "Read the bright yellow note",
                "meeting": "Read the neighbors' meeting notice",
                "warning": "Read the warning about the pipes"
            },
            "yellow_note": "'CONCERT TICKETS: I left the spare tickets with Quimet at the Gato Negro. First come, first served! - Paco'",
            "choices_yellow": {
                "wait": "Concert tickets at the bar? Interesting."
            },
            "meeting": "The next meeting is scheduled for July 15th. Topic: 'The strange humming in the attic'.",
            "choices_meeting": {
                "spooky": "Must be industrial-strength humming."
            },
            "warning": "'URGENT: Do not touch the blue pipes in the basement. They are under high pressure.'",
            "choices_warning": {
                "serious": "Good to know."
            }
        },
        "light_switch_gag": {
            "start": "You reach for the light switch. It's oddly warm to the touch.",
            "choices": {
                "toggle": "Flick it off and back on",
                "touch": "Inspect the warmth"
            },
            "toggle": "You flick the switch. After a second of darkness, the hallway light buzzes back to life with a sickly yellow glow.",
            "choices_toggle": {
                "trope": "Classic horror trope avoided."
            },
            "sticky": "It's not just warm, it's slightly sticky. You decide not to dwell on what that might be.",
            "choices_sticky": {
                "ew": "Ew."
            }
        },
        "boxes": {
            "info": "Old cardboard boxes. One is labeled 'Fes-t-ho tu mateix' (Do it yourself).",
            "start": "A mountain of cardboard boxes. They smell of old books and mothballs.",
            "choices": {
                "rummage": "Rummage through them",
                "leave": "Leave them alone"
            },
            "find_gear": "You dig deep into a box marked 'DO NOT THROW AWAY' and find a heavy Rusty Gear.",
            "choices_gear": {
                "useful": "This might be useful."
            },
            "find_nothing": "You only find some old newspapers from 1982 and a single mismatched shoe.",
            "choices_find": {
                "empty": "Nothing else of value here."
            }
        },
        "bicycle": {
            "info": "A sturdy mountain bike. It's chained to the railing."
        },
        "light_switch": {
            "info": "A standard light switch. It's already on."
        },
        "drawer": {
            "locked": "A small wooden drawer. It's locked tight.",
            "open": "You unlock the drawer with the brass key. Inside is a handwritten note: 'The crystal responds to the light of the river.'"
        },
        "house_exit": {
            "start": "Back to the sunny streets of Martorell?",
            "choices": {
                "go_outside": "Go outside",
                "stay": "Stay here"
            }
        },
        "stairs_msg": {
            "start": "The stairs lead up into darkness.",
            "choices": {
                "go_up": "Go to second floor",
                "stay": "Stay here"
            }
        },
        "mailbox": {
            "start": "A row of old, dented mailboxes. One of them is slightly ajar.",
            "choices": {
                "search": "Search the open mailbox",
                "look": "Just look at them"
            },
            "find_letter": "You find a letter addressed to 'Senior Pere' from Floor 2-1. It mentions something about 'The Gato Negro' and 'A favor'.",
            "choices_letter": {
                "return": "I should probably return this... or investigate."
            },
            "look": "Names of neighbors are faded. This building has seen better days."
        },
        "corkboard": {
            "start": "The corkboard is covered in dusty notes and old bills.",
            "choices": {
                "yellow": "Read the yellow note",
                "meeting": "Look at the meeting announcement",
                "warning": "Read the passive-aggressive warning"
            },
            "yellow_note": "It reads: 'To anyone looking for Festa Major tickets—I left a spare pair at the Bar! Ask Paco if he's seen my dog.'",
            "choices_yellow": {
                "wait": "Wait, Paco is outside! I should ask him about the dog."
            },
            "meeting": "'Neighborhood meeting: Thursday. Topic: The strange noise coming from the basement.'",
            "choices_meeting": {
                "spooky": "Spooky."
            },
            "warning": "'To whoever keeps leaving their bike blocking the stairs: I WILL call the municipal police. - Floor 1-2.'",
            "choices_warning": {
                "serious": "People take their stairs seriously."
            }
        },
        "light_switch_gag": {
            "start": "The light switch. It's covered in sticky grime.",
            "choices": {
                "toggle": "Toggle it",
                "touch": "Touch it with the back of my hand"
            },
            "toggle": "Click! Nothing happens. The bulb must be burnt out... or someone cut the wires.",
            "choices_toggle": {
                "trope": "Classic mystery trope."
            },
            "sticky": "It feels warm, and your hand comes back covered in... jam?",
            "choices_sticky": {
                "ew": "Ew."
            }
        },
        "generic": {
            "start": "You don't see anything unusual."
        },
        "drawer_msg": {
            "choices": {
                "use_key": "Use Old Brass Key"
            }
        }
    },
    "secondfloor": {
        "exit": {
            "start": "Go back down to the entrance?",
            "choices": {
                "go_down": "Go down",
                "stay": "Stay here"
            }
        },
        "door2_1": {
            "start": "The door to apartment 2-1. A small plaque reads 'P. Fontanals'. The same last name as the one in the secret room...",
            "choices": {
                "slide_letter": "Slide the letter under the door",
                "try_handle": "Try the handle",
                "knock": "Knock",
                "walk_away": "Walk away"
            },
            "try_handle": "Locked. But you can hear a faint noise from within—a low, rhythmic hum. Like electrical machinery.",
            "choices_handle": {
                "what": "What is that?"
            },
            "knock": "You knock twice. Silence. And then—unmistakably—the sound of someone moving quickly and quietly away from the door.",
            "choices_knock": {
                "someone_there": "There's definitely someone in there."
            },
            "slide_letter": "You slide the letter addressed to 'Senior Pere' under the door. A pause. The humming stops. And you hear a soft *click* as it's unlocked from the inside.",
            "choices_letter": {
                "enter": "Enter the apartment"
            }
        },
        "joanas_apartment": {
            "start": "Door 2-3. The plaque says 'Joana Puig'. You can hear the TV through the door—it sounds like the evening news.",
            "choices": {
                "knock": "Knock on the door",
                "ask_pere": "Ask about Pere Fontanals",
                "leave": "Leave her alone"
            },
            "joana_knock": "'One moment!' Shuffling footsteps follow. The door opens slightly. A woman in her sixties with an apron dusted with flour. 'What did you want?'",
            "choices_knock": {
                "ask": "Do you know Pere from 2-1?",
                "sorry": "Sorry to bother you."
            },
            "joana_about_pere": "'Pere? He comes and goes at very odd hours. I saw him carrying a huge brass tube once—like a telescope. Very private. And that hum coming from his place... I've already called the building manager twice.'",
            "choices_about": {
                "thanks": "Thanks, Joana."
            },
            "ask_pere": "'Still here? Look—last week I saw a man arguing with Pere in the hallway. An older man, dark coat. He dropped something on the stairs. I left it there so as not to touch it.'",
            "choices_ask": {
                "dropped": "He dropped something... on the stairs?"
            }
        },
        "hallway_book": {
            "start": "A thick, hardcover book left on the floor by the wall. No title on the spine. The cover is a deep wine color.",
            "choices": {
                "look": "Pick it up and look inside",
                "leave": "Leave it"
            },
            "open_book": "The first page is blank. On the second is a handwritten dedication: 'To G.F.—may this guide you back home safely. — J.P.' J.P. Joana Puig? Did she know Gregori Fontanals?",
            "choices_open": {
                "more_to_her": "There's more to Joana than flour and news."
            }
        },
        "floor2_breakers": {
            "start": "The floor's electrical panel. Someone has taped a note over one switch: 'DO NOT TOUCH — P.F.'",
            "choices": {
                "reset": "Reset the tripped breaker",
                "switch": "Flip it anyway",
                "respect": "Respect the note."
            },
            "switch_breaker": "The switch clicks. The hallway light dims. A sudden mechanical clatter followed by a muffled shout comes from behind the door of 2-1—then the humming gets much louder before the breaker pops back up.",
            "choices_switch": {
                "needs_power": "That machine. Whatever it is, it needs a lot of power."
            },
            "reset_breaker": "You flip the tripped breaker back into place. The lights flicker and steady."
        },
        "pis_1_3": {
            "start": "Door 1-3. No plaque. A thin sliver of light is visible under the door. Someone is inside.",
            "choices": {
                "knock": "Knock",
                "move_on": "Move on."
            },
            "pis_1_3_knock": "Absolute silence. The light clicks off. Whoever it is, they don't want to be found.",
            "choices_knock": {
                "secrets": "Three mysterious neighbors. This building is full of secrets."
            }
        },
        "floor2_window": {
            "start": "The hallway window over the alley. From here, you can clearly see the alleyway—the sundial, the lantern, and the padlocked door at the end.",
            "choices": {
                "watch": "Watch the alley",
                "turn": "Turn away"
            },
            "watch_alley": "As you watch, a figure in a dark coat slips into the alley, pauses by the sundial as if checking it, and disappears again. The same figure from before?",
            "choices_watch": {
                "not_coincidence": "They keep appearing and disappearing. This can't be a coincidence."
            }
        },
        "floor2_switch": {
            "start": "A plain light switch. You click it—the hallway bulb flickers a few times before humming to life.",
            "choices": {
                "better": "Much better."
            }
        },
        "floor2_plants": {
            "start": "A cluster of potted plants in a corner—geraniums, a small fern. They are lovingly cared for. Someone on this floor has a softer side.",
            "choices": {
                "check": "Look under the pots",
                "pretty": "That's nice."
            },
            "check_pots": "Under the pot of the largest geranium, taped with a strip of old masking tape: a small iron key with a sun symbol engraved on it.",
            "choices_check": {
                "sun_symbol": "A sun symbol—like the one on the hidden door..."
            }
        }
    },
    "alley": {
        "hotspots": {
            "exit": "Back to Street",
            "sundial": "The Deep Sundial",
            "door": "The Secret Entrance",
            "lens": "Strange Lens",
            "matches": "Old Matchbook",
            "figure": "Shadowy Figure",
            "lantern": "Wrought Iron Lantern",
            "cat": "The Watching Cat",
            "inscriptions": "Wall Inscriptions",
            "shady_person": "Shady Person",
            "matches_on_floor": "Discarded Matches"
        },
        "shady_person": {
            "info": "They seem to be waiting for someone. Best not to bother them."
        },
        "matches_on_floor": {
            "info": "A few burnt matches. Someone was trying to light something here."
        },
        "sundial": {
            "info": "An old stone sundial. It's too dark to read the time."
        },
        "sewer_grate": {
            "info": "A heavy iron sewer grate. You can hear water trickling far below.",
            "choices": {
                "use_gear": "Use the Rusty Gear as a lever",
                "reach": "Try to reach your hand inside",
                "look_inside": "Look inside the open grate"
            },
            "stuck": "Your arm is too thick, and the grate is too heavy to lift with your bare hands. You need some kind of tool to pry it open.",
            "choices_stuck": {
                "tool": "I need leverage."
            },
            "open": "You wedge the Rusty Gear between the iron bars and push with all your might. With a rusty screech, the heavy grate pops open.",
            "choices_open": {
                "look": "Let's see what's down there."
            },
            "opened_view": "Looking into the dark shaft, you see a piece of brightly colored paper snagged on a dry ledge.",
            "choices_view": {
                "take": "Reach in and grab the paper"
            },
            "take_flyer": "You carefully reach in and pull it out. It's half of a concert flyer.",
            "choices_take": {
                "nice": "Got it."
            }
        },
        "cat": {
            "info": "A stray cat with glowing eyes. It stares at you judgmentally."
        },
        "inscriptions": {
            "info": "One set of scratches looks fresh: 'The light of the river leads to the truth.'"
        },
        "door": {
            "locked": "A heavy wooden door sealed with a rusted padlock. There's a curious lens-like fitting above the lock.",
            "match": "You strike a match, but the wind immediately blows it out.",
            "open": "The intense beam of light heats the mechanism. With a clack, the lock springs open.",
            "choices": {
                "use_match": "Use Matchbook",
                "focus_lens": "Focus lantern through Lens",
                "enter": "Enter"
            }
        }
    },
    "riverview": {
        "hotspots": {
            "exit": "Back to Town",
            "crystal": "River Crystal",
            "ring": "Silver Ring",
            "car_1": "Old SEAT 600",
            "car_2": "SEAT 124",
            "car_3": "SEAT 131",
            "gardener": "The Gardener",
            "river": "The Llobregat River"
        },
        "car_1": {
            "info": "A classic SEAT 600. The car that put Spain on wheels."
        },
        "car_2": {
            "info": "A sturdy SEAT 124. Still looks reliable after all these years."
        },
        "car_3": {
            "info": "A sleek SEAT 131. The choice of the modern 70s driver."
        },
        "gardener": {
            "info": "He's busy tending to the riverside bushes."
        },
        "river": {
            "info": "The Llobregat River. It's the lifeblood of Martorell."
        },
        "crystal": {
            "info": "A smooth, palm-sized crystal. It has a tiny sun engraved on it."
        },
        "ring": {
            "info": "A simple silver ring with a blue stone. It looks like it belongs to Senyora Maria."
        }
    },
    "secretroom": {
        "name": "Gregori's Study",
        "hotspots": {
            "exit": "Exit to Hallway",
            "device": "Prototypus Martorell",
            "map": "Ley Line Map",
            "journal": "Gregori's Journal",
            "gem": "The Core"
        },
        "device": {
            "info": "Gregori's masterwork: the 'Prototypus Martorell'. It features a large brass lens mount, an exposed gear mechanism that looks jammed, and a hollow receptacle that seems built for a power source.",
            "choices": {
                "activate": "Try to activate the Prototypus",
                "no_power": "The machine is dead. The breaker must have tripped."
            },
            "try_activate": "You try to start the sequence. The machine groans as it attempts to draw power and align the optics...",
            "choices_try": {
                "check": "See what happens."
            },
            "success": "With a deafening hum, the Rusty Gear turns smoothly. The Charged Core surges with energy, directing a blinding beam of light through the River Crystal lens. The light hits the wall map, projecting a glowing, complex constellation of ley lines focused directly on the Pont del Diable. You've uncovered the secret of Martorell.",
            "failure": "The machine shudders violently. Without all the properly prepared components—the lens, a working gear, and a charged power source—it draws too much raw electricity. CRACK! The power cuts out. You've tripped the breaker for the entire floor.",
            "no_power": "Nothing happens. The electrical breaker on the floor outside must be reset before trying again."
        },
        "journal": {
            "read": "July 12, 1994: The Prototypus is almost complete. The ley-lines of Martorell are stronger than I imagined. I must hide the Core until the solstice."
        },
        "map": {
            "info": "A map showing glowing lines connecting the Old Bridge, the Fountain, and this building."
        },
        "gem": {
            "info": "A glowing amber gem. It feels like the battery for the device.",
            "choices": {
                "take": "Take 'The Core'"
            }
        }
    }
};
