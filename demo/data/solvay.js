const solvay_items = {
    walkman: { name: "Walkman", icon: "" },
    pedra: { name: "Pedra", icon: "" },
    bisturi: { name: "Bisturí", icon: "" },
    alcohol: { name: "Alcohol", icon: "" },
    fil_de_coure: { name: "Fil de coure", icon: "" },
    escut_magnetic: { name: "Escut magnètic", icon: "" },
    cartell_enrotllat: { name: "Cartell enrotllat", icon: "" },
    clau_radio: { name: "Clau de la ràdio", icon: "" },
    emissora_mobil: { name: "Emissora mòbil", icon: "" },
    llanterna_dinamo: { name: "Llanterna dinamo", icon: "" },
    xocolatina: { name: "Xocolatina", icon: "" },
    targeta_solvay: { name: "Targeta Solvay", icon: "" },
    clau_anglesa_gran: { name: "Clau anglesa gran", icon: "" },
    codi_cremat: { name: "Codi cremat", icon: "" }
};
const solvay_dialogues = {
    generic_look: {
        start: {
            text: (engine, ctx) => ctx || "No veig res d'interès.",
            choices: [{ text: "ui.close" }]
        }
    }
};

Object.assign(solvay_dialogues, {
    habitacio_finestra: {
        start: {
            text: "No es veu el carrer. Hi ha una boira molt espessa i tòxica... i sento sirenes al fons.",
            choices: [{ text: "ui.close" }]
        }
    },
    habitacio_llit: {
        start: {
            text: "He dormit fatal. Hi va haver una explosió sorda ahir a la nit.",
            choices: [{ text: "ui.close" }]
        }
    },
    habitacio_walkman: {
        start: {
            text: "El meu reproductor de cassets. La cinta de Sopa de Cabra encara hi és a dins.",
            onEnter: (engine) => engine.state.addToInventory('walkman'),
            choices: [{ text: "ui.close" }]
        }
    },
    menjador_televisor: {
        start: {
            text: "Només hi ha soroll blanc i un rètol d'emergència militar intermitent.",
            choices: [{ text: "ui.close" }]
        }
    },
    menjador_pare: {
        start: {
            text: "On he posat les claus del SEAT Ibiza? He d'anar a treballar... no recordo on treballo.",
            choices: [{ text: "ui.close" }]
        }
    },
    menjador_mare: {
        start: {
            text: "Qui ets tu? Què fas a casa nostra? Surt d'aquí o crido a la policia!",
            choices: [{ text: "ui.close" }]
        }
    },
    menjador_porta: {
        start: {
            text: "No puc quedar-me aquí, els pares no em reconeixen. He de trobar la resta del grup.",
            choices: [{ text: "Sortir", action: (engine) => engine.state.loadScene('carrer') }]
        }
    },
    carrer_soldat: {
        start: {
            text: "Alto! Quarantena militar. Torna a casa teva o seràs retingut!",
            choices: [{ text: "ui.close" }]
        }
    },
    carrer_pedra: {
        start: {
            text: "Una llamborda solta.",
            onEnter: (engine) => engine.state.addToInventory('pedra'),
            choices: [{ text: "ui.close" }]
        }
    },
    carrer_cubell: {
        start: {
            text: "És un cubell buit d'aquells de metall antics. Si l'hi dono un cop, farà un soroll eixordador.",
            choices: [{ text: "ui.close" }]
        }
    },
    carrer_cubell_hit: {
        start: {
            text: "El soldat es gira de cop i marxa corrents cap al fons del carrer a investigar.",
            onEnter: (engine) => engine.state.setFlag('soldat_distret', true),
            choices: [{ text: "ui.close" }]
        }
    },
    rodalies_pont: {
        start: {
            text: "El vell pont romà/gòtic. La gent gran deia que s'emportava ànimes... Ara sembla que ens estigui ofegant en gas.",
            choices: [{ text: "ui.close" }]
        }
    },
    rodalies_cordo: {
        start: {
            text: "Està ple de soldats amunt i avall. No puc passar per l'avinguda principal.",
            choices: [{ text: "ui.close" }]
        }
    },
    rodalies_mates: {
        start: {
            text: "Sembla que hi ha un forat darrere d'aquests matolls... Descobreixes una antiga canonada de desguàs seca.",
            onEnter: (engine) => engine.state.setFlag('canonada_descoberta', true),
            choices: [{ text: "ui.close" }]
        }
    },
    cau_pissarra: {
        start: {
            text: "Retalls sobre fuites de 'Solvay'. Això no és el Diable reclamant ànimes, això és un desastre químic.",
            choices: [{ text: "ui.close" }]
        }
    },
    cau_amic: {
        start: {
            text: "Què ha passat?",
            choices: [
                { text: "Els meus pares no em coneixen...", nextNode: "amic_resposta" },
                { text: "Què és aquesta boira?", nextNode: "amic_resposta" }
            ]
        },
        amic_resposta: {
            text: "Som els únics que recordem coses. Hem d'entrar al CAP per veure els historials metges i saber per què som immunes.",
            choices: [{ text: "ui.close" }]
        }
    },
    exterior_porta: {
        start: {
            text: "Està tancada per dins amb clau. A través del vidre veig una infermera donant voltes en cercles.",
            choices: [{ text: "ui.close" }]
        }
    },
    exterior_ambulancia: {
        start: {
            text: "El conductor va fugir deixant-ho tot obert. Hi ha material mèdic escampat.",
            choices: [{ text: "ui.close" }]
        }
    },
    exterior_farmaciola: {
        start: {
            text: "Un bisturí quirúrgic. Molt afilat, compte amb els dits.",
            onEnter: (engine) => engine.state.addToInventory('bisturi'),
            choices: [{ text: "ui.close" }]
        }
    },
    exterior_finestra: {
        start: {
            text: "És la finestra dels vestidors. Està entreoberta, però té un precinte de plàstic dur que no em deixa obrir-la del tot.",
            choices: [{ text: "ui.close" }]
        }
    },
    exterior_finestra_tallada: {
        start: {
            text: "Perfecte! He tallat el precinte. Ara puc colar-m'hi.",
            onEnter: (engine) => engine.state.setFlag('finestra_tallada', true),
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_infermera: {
        start: {
            text: "Si us plau, agafi tanda... agafi tanda... agafi tanda...",
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_maquina: {
        start: {
            text: "Està encallada. No surt cap número.",
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_porta: {
        start: {
            text: "La infermera em bloqueja el pas. Si intento passar, cridarà.",
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_carro: {
        start: {
            text: "Una ampolla d'alcohol de 96 graus.",
            onEnter: (engine) => engine.state.addToInventory('alcohol'),
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_alarma: {
        start: {
            text: "És un detector de fum molt antic. Si l'activo, els aspersors saltaran i la infermera haurà d'evacuar.",
            choices: [{ text: "ui.close" }]
        }
    },
    recepcio_alarma_activa: {
        start: {
            text: "La infermera obre la porta i marxa lentament pel passadís. La via està lliure.",
            onEnter: (engine) => engine.state.setFlag('infermera_fora', true),
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_ordinador: {
        start: {
            text: "Demana una contrasenya de 4 xifres. No la sé pas.",
            choices: [
                { text: "Provar 1996", nextNode: "ordinador_pass", condition: (engine) => engine.state.getFlag('pissarra_vista') },
                { text: "Sortir" }
            ]
        },
        ordinador_pass: {
            text: "Expedients de nens no afectats pel gas: Tots presenten camps electromagnètics inusuals prop del crani.",
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_pissarra: {
        start: {
            text: "El Doctor Soler sempre feia el torn de les 19:96... Un moment, 1996! Podria ser.",
            onEnter: (engine) => engine.state.setFlag('pissarra_vista', true),
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_caixa: {
        start: {
            text: "Hi ha coses dels pacients que van ingressar ahir.",
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_bobina: {
        start: {
            text: "Sembla que ho han tret d'un aparell d'electroteràpia vell.",
            onEnter: (engine) => engine.state.addToInventory('fil_de_coure'),
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_taula: {
        start: {
            text: "Amb l'expedient llegit i aquest coure, potser podria modificar el meu reproductor de cassets...",
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_taula_escut: {
        start: {
            text: "He embolicat els auriculars amb el fil de coure connectat a les piles. Ara zumzeja de forma estranya. Crec que aquest camp de freqüència magnètica repel·lirà el gas tòxic del meu cervell!",
            onEnter: (engine) => {
                engine.state.removeFromInventory('walkman');
                engine.state.removeFromInventory('fil_de_coure');
                engine.state.addToInventory('escut_magnetic');
            },
            choices: [{ text: "ui.close" }]
        }
    },
    arxiu_finestra: {
        start: {
            text: "Ara que tinc l'escut, puc sortir cap a la zona nord de Martorell, cap a les Torretes.",
            choices: [{ text: "Sortir", action: (engine) => engine.state.loadScene('carrero_radio') }]
        }
    },
    carrero_porta: {
        start: {
            text: "Tancada amb pany i clau. És una porta de ferro pesada.",
            choices: [{ text: "ui.close" }]
        }
    },
    carrero_porta_oberta: {
        start: {
            text: "Ja soc a dins.",
            choices: [{ text: "Entrar", action: (engine) => engine.state.loadScene('estudi_radio') }]
        }
    },
    carrero_reixa: {
        start: {
            text: "El ventilador està apagat. Veig que el conserge solia amagar unes claus de recanvi aquí dins lligades amb un fil... però el meu braç no hi arriba.",
            choices: [{ text: "ui.close" }]
        }
    },
    carrero_reixa_clau: {
        start: {
            text: "Perfecte! He utilitzat el cartell com a ganxo per apropar el fil i agafar la clau.",
            onEnter: (engine) => {
                engine.state.removeFromInventory('cartell_enrotllat');
                engine.state.addToInventory('clau_radio');
            },
            choices: [{ text: "ui.close" }]
        }
    },
    carrero_cartell: {
        start: {
            text: "Un cartell vell de Els Pets, enrotllat en forma de tub dur.",
            onEnter: (engine) => engine.state.addToInventory('cartell_enrotllat'),
            choices: [{ text: "ui.close" }]
        }
    },
    estudi_finestra: {
        start: {
            text: "L'antena principal de l'edifici ha estat sabotejada pels militars. Està doblegada. Aquí no podré emetre res.",
            choices: [{ text: "ui.close" }]
        }
    },
    estudi_armari: {
        start: {
            text: "Hi ha una motxilla pesada... és l'equip d'enllaç mòbil! El feien servir per retransmetre els partits del CF Martorell fora de l'estudi.",
            choices: [{ text: "ui.close" }]
        }
    },
    estudi_equip: {
        start: {
            text: "Pesa molt, però amb això puc emetre si trobo una antena prou alta.",
            onEnter: (engine) => engine.state.addToInventory('emissora_mobil'),
            choices: [{ text: "ui.close" }]
        }
    },
    estudi_planol: {
        start: {
            text: "És un mapa topogràfic. La zona més alta sense interferències són les ruïnes de les Torretes.",
            choices: [{ text: "ui.close" }]
        }
    },
    estudi_porta: {
        start: {
            text: "Aquesta porta porta directament al sender de la muntanya.",
            choices: [{ text: "Sortir", action: (engine) => engine.state.loadScene('sender_serra') }]
        }
    },
    sender_soldat: {
        start: {
            text: "Està vigilant l'accés a dalt de la muntanya. Si faig un pas en fals amb aquest focus encès, em veurà i m'arrestarà.",
            choices: [{ text: "ui.close" }]
        }
    },
    sender_soldat_distret: {
        start: {
            text: "Maleïda ferralla...",
            choices: [{ text: "ui.close" }]
        }
    },
    sender_generador: {
        start: {
            text: "El focus del vehicle està connectat a aquest generador portàtil a causa de l'apagada general. Els cables estan exposats.",
            choices: [{ text: "ui.close" }]
        }
    },
    sender_generador_tallat: {
        start: {
            text: "He tallat la corretja del motor del generador. El focus s'apaga de cop!",
            onEnter: (engine) => engine.state.setFlag('focus_apagat', true),
            choices: [{ text: "ui.close" }]
        }
    },
    sender_cami: {
        start: {
            text: "Ara és la meva oportunitat de córrer cap al cim.",
            choices: [{ text: "Pujar", action: (engine) => engine.state.loadScene('torretes') }]
        }
    },
    torretes_estructura: {
        start: {
            text: "L'estructura de metall d'aquestes ruïnes farà una antena parabòlica perfecta si la connecto a l'emissora.",
            choices: [{ text: "ui.close" }]
        }
    },
    torretes_emissio: {
        start: {
            text: "He d'introduir la freqüència d'emergència internacional.",
            choices: [
                { text: "Introduir 121.5", nextNode: "torretes_sos" },
                { text: "Cancel·lar" }
            ]
        },
        torretes_sos: {
            text: "SOS Martorell. Fàbrica Solvay. Emergència química, la població ha perdut la memòria. Necessitem ajuda externa, trenquin la quarantena militar.",
            onEnter: (engine) => engine.state.setFlag('missatge_enviat', true),
            choices: [{ text: "ui.close" }]
        }
    },
    torretes_boira: {
        start: {
            text: "Oh no... han detectat l'origen del senyal de radiodifusió.",
            choices: [{ text: "ui.close" }]
        }
    },
    torretes_sirena: {
        start: {
            text: "Estan pujant pel camí principal! No puc tornar per on he vingut.",
            choices: [{ text: "ui.close" }]
        }
    },
    torretes_reixa: {
        start: {
            text: "Això sembla que connecta amb els antics conductes de ventilació dels túnels de FGC (Ferrocarrils de la Generalitat). És l'única sortida!",
            choices: [{ text: "Baixar", action: (engine) => engine.state.loadScene('pou_ventilacio') }]
        }
    },
    pou_reixa: {
        start: {
            text: "Sento les botes dels militars trepitjant just a sobre. Per aquí no hi puc tornar a pujar.",
            choices: [{ text: "ui.close" }]
        }
    },
    pou_foscor: {
        start: {
            text: "Està massa fosc. Si camino per aquí em trencaré el coll amb les vies del tren.",
            choices: [{ text: "ui.close" }]
        }
    },
    pou_motxilla: {
        start: {
            text: "Sembla d'un treballador de manteniment de la via. Està plena de fang.",
            choices: [{ text: "ui.close" }]
        }
    },
    pou_motxilla_agafar: {
        start: {
            text: "Una llanterna de maneta! No necessita piles, només una mica d'esforç físic.",
            onEnter: (engine) => engine.state.addToInventory('llanterna_dinamo'),
            choices: [{ text: "ui.close" }]
        }
    },
    pou_foscor_llum: {
        start: {
            text: "Ara sí que veig per on trepitjo. Sembla que hi ha uns vagons més endavant.",
            onEnter: (engine) => engine.state.setFlag('pou_illuminat', true),
            choices: [{ text: "ui.close" }]
        }
    },
    campament_refugiats: {
        start: {
            text: "Cap d'ells respon. Estan totalment buits per culpa del gas de Solvay. Fa molta pena veure'ls així.",
            choices: [{ text: "ui.close" }]
        }
    },
    campament_guarda: {
        start: {
            text: "Té la mirada perduda. Està abraçant fortament un objecte contra el seu pit: és una targeta d'accés magnètica de Solvay! Però no la vol deixar anar, s'hi aferra com un nen a un peluix.",
            choices: [{ text: "ui.close" }]
        }
    },
    campament_guarda_intercanvi: {
        start: {
            text: "M'ha agafat la xocolatina i ha deixat caure la targeta a terra. L'intercanvi més trist de la història.",
            onEnter: (engine) => {
                engine.state.removeFromInventory('xocolatina');
                engine.state.addToInventory('targeta_solvay');
            },
            choices: [{ text: "ui.close" }]
        }
    },
    campament_maquina: {
        start: {
            text: "Una vella màquina expenedora d'Aperitius. Encara hi queda una xocolatina Bony a l'interior. Està desconnectada.",
            choices: [{ text: "ui.close" }]
        }
    },
    campament_maquina_trencada: {
        start: {
            text: "He hagut de trencar el vidre. Sort que el tren sorollós de dalt ha tapat el so.",
            onEnter: (engine) => engine.state.addToInventory('xocolatina'),
            choices: [{ text: "ui.close" }]
        }
    },
    campament_vago: {
        start: {
            text: "Puc creuar pels vagons per arribar a la sortida nord.",
            choices: [{ text: "Creuar", action: (engine) => engine.state.loadScene('ascensor_carrega') }]
        }
    },
    ascensor_boto: {
        start: {
            text: "No fa res. No hi ha corrent elèctric.",
            choices: [{ text: "ui.close" }]
        }
    },
    ascensor_lector: {
        start: {
            text: "El pilot vermell està apagat. Tot el sistema d'obertura necessita energia de reserva.",
            choices: [{ text: "ui.close" }]
        }
    },
    ascensor_panell: {
        start: {
            text: "Els cables estan arrencats. Segurament va ser a causa de la primera explosió. M'hi falta alguna cosa per tancar el circuit.",
            choices: [{ text: "ui.close" }]
        }
    },
    ascensor_panell_energia: {
        start: {
            text: "He connectat la bateria de la ràdio de l'inventari als borns. El lector de targetes s'ha encès!",
            onEnter: (engine) => engine.state.setFlag('ascensor_energia', true),
            choices: [{ text: "ui.close" }]
        }
    },
    ascensor_lector_obert: {
        start: {
            text: "Bingo. L'ascensor comença a pujar cap al cor de la fàbrica.",
            onEnter: (engine) => engine.state.setFlag('ascensor_obert', true),
            choices: [{ text: "ui.close" }]
        }
    },
    ascensor_interior: {
        start: {
            text: "Allà vaig. Espero que l'escut del Walkman aguanti...",
            choices: [{ text: "Pujar", action: (engine) => engine.state.loadScene('passarella_control') }]
        }
    },
    passarella_director: {
        start: {
            text: "Porta una màscara de gas militar. Està triturant documents frenèticament. No puc passar sense que em vegi.",
            choices: [{ text: "ui.close" }]
        }
    },
    passarella_caixa: {
        start: {
            text: "Una clau anglesa industrial. Pesa moltíssim.",
            onEnter: (engine) => engine.state.addToInventory('clau_anglesa_gran'),
            choices: [{ text: "ui.close" }]
        }
    },
    passarella_valvula: {
        start: {
            text: "És una canonada vella de vapor d'aigua per netejar els tancs. La roda està rovellada.",
            choices: [{ text: "ui.close" }]
        }
    },
    passarella_valvula_trencada: {
        start: {
            text: "Un raig de vapor blanc inofensiu inunda la zona oposada. \"Maleïda sigui, què és això ara?!\" crida el director, allunyant-se de la porta per investigar.",
            onEnter: (engine) => engine.state.setFlag('director_distret', true),
            choices: [{ text: "ui.close" }]
        }
    },
    despatx_paperera: {
        start: {
            text: "Hi ha papers cremats a mig apagar.",
            choices: [{ text: "ui.close" }]
        }
    },
    despatx_fragment: {
        start: {
            text: "Només es llegeix: Codi d'emergència: OVERRIDE_94.",
            onEnter: (engine) => engine.state.addToInventory('codi_cremat'),
            choices: [{ text: "ui.close" }]
        }
    },
    despatx_ordinador: {
        start: {
            text: "La consola demana l'ordre de comandament manual.",
            choices: [{ text: "ui.close" }]
        }
    },
    despatx_ordinador_hackejat: {
        start: {
            text: "PROJECTE OBLIT. El director revela que la pèrdua de memòria era un efecte secundari buscat per un projecte de control social finançat en secret.",
            choices: [{ text: "Executar Programa", nextNode: "despatx_programa" }]
        },
        despatx_programa: {
            text: "ERROR. El tancament automàtic està bloquejat. Si us plau, utilitzi la roda manual a la Sala de Màquines Principal.",
            onEnter: (engine) => engine.state.setFlag('ordinador_hackejat', true),
            choices: [{ text: "ui.close" }]
        }
    },
    despatx_porta: {
        start: {
            text: "Aquesta escala baixa directe al cor del reactor. Allà hi ha d'haver la roda manual.",
            choices: [{ text: "Baixar", action: (engine) => engine.state.loadScene('sala_maquines') }]
        }
    },
    sala_roda: {
        start: {
            text: "És la vàlvula principal. Si la tanco, el gas deixarà de sortir.",
            choices: [{ text: "ui.close" }]
        }
    },
    sala_director: {
        start: {
            text: "No ho entens, nen! Aquest poble era el conillet d'índies perfecte. Un cop ho oblidin tot, podrem reescriure la societat. Dona'm el teu reproductor de cassets i deixa't portar per l'oblit.",
            choices: [{ text: "ui.close" }]
        }
    },
    sala_walkman_utilitzat: {
        start: {
            text: "El director cau de genolls, agafant-se les orelles i arrencant-se la màscara per aturar el soroll. Queda exposat al seu propi gas tòxic i la seva mirada es torna buida al moment.",
            onEnter: (engine) => engine.state.setFlag('director_derrotat', true),
            choices: [{ text: "ui.close" }]
        }
    },
    sala_roda_tancada: {
        start: {
            text: "Gires la vàlvula amb totes les teves forces. La pressió cau en picat. Els tubs deixen de xiular.",
            onEnter: (engine) => engine.state.setFlag('roda_tancada', true),
            choices: [{ text: "Mirar Sostre", nextNode: "sala_final" }]
        },
        sala_final: {
            text: "El gas de la sala s'atura! Els ventiladors d'extracció absorbeixen la resta i dissipen la boira cap a l'atmosfera alta. A través del vidre net, veig els flaixos dels helicòpters de les televisions sobrevolant Martorell. Ho hem aconseguit.",
            choices: [{ text: "FI", action: (engine) => alert("Gràcies per jugar!") }]
        }
    }
});

const habitacio_scene = {
    background: 'assets/street.png',
    hotspots: {
        finestra: {
            name: "Finestra",
            x: 100, y: 100, width: 200, height: 300,
            onClick: (engine) => engine.dialogue.start('habitacio_finestra')
        },
        llit: {
            name: "Llit",
            x: 500, y: 600, width: 400, height: 200,
            onClick: (engine) => engine.dialogue.start('habitacio_llit')
        },
        walkman: {
            name: "Walkman",
            x: 800, y: 500, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('walkman')) {
                    engine.dialogue.start('habitacio_walkman');
                } else {
                    engine.dialogue.start('generic_look', 'start', "Ja he agafat el walkman.");
                }
            }
        },
        porta: {
            name: "Porta de l'habitació",
            x: 1200, y: 300, width: 200, height: 500,
            onClick: (engine) => engine.state.loadScene('menjador')
        }
    }
};

const menjador_scene = {
    background: 'assets/street.png',
    hotspots: {
        televisor: {
            name: "Televisor",
            x: 300, y: 400, width: 200, height: 200,
            onClick: (engine) => engine.dialogue.start('menjador_televisor')
        },
        pare: {
            name: "Pare",
            x: 600, y: 500, width: 150, height: 300,
            onClick: (engine) => engine.dialogue.start('menjador_pare')
        },
        mare: {
            name: "Mare",
            x: 900, y: 500, width: 150, height: 300,
            onClick: (engine) => engine.dialogue.start('menjador_mare')
        },
        porta: {
            name: "Porta del carrer",
            x: 1300, y: 300, width: 200, height: 600,
            onClick: (engine) => engine.dialogue.start('menjador_porta')
        }
    }
};

const carrer_scene = {
    background: 'assets/street.png',
    hotspots: {
        soldat: {
            name: "Soldat",
            x: 1000, y: 400, width: 200, height: 400,
            onClick: (engine) => {
                if (!engine.state.getFlag('soldat_distret')) {
                    engine.dialogue.start('carrer_soldat');
                }
            }
        },
        pedra: {
            name: "Pedra",
            x: 400, y: 800, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('pedra')) {
                    engine.dialogue.start('carrer_pedra');
                }
            }
        },
        cubell: {
            name: "Cubell d'escombraries",
            x: 600, y: 700, width: 150, height: 200,
            onClick: (engine) => engine.dialogue.start('carrer_cubell'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'pedra') {
                    engine.dialogue.start('carrer_cubell_hit');
                    return false; // Don't consume stone necessarily, or return true to consume
                }
                return false;
            }
        },
        carrero: {
            name: "Carreró",
            x: 1400, y: 300, width: 300, height: 600,
            onClick: (engine) => {
                if (engine.state.getFlag('soldat_distret')) {
                    engine.state.loadScene('rodalies_pont');
                } else {
                    engine.dialogue.start('generic_look', 'start', "El soldat no em deixa passar.");
                }
            }
        }
    }
};

const rodalies_pont_scene = {
    background: 'assets/street.png',
    hotspots: {
        pont: {
            name: "Pont del Diable",
            x: 1000, y: 100, width: 600, height: 300,
            onClick: (engine) => engine.dialogue.start('rodalies_pont')
        },
        cordo: {
            name: "Cordó militar",
            x: 800, y: 500, width: 1000, height: 100,
            onClick: (engine) => engine.dialogue.start('rodalies_cordo')
        },
        mates: {
            name: "Mates del Riu",
            x: 300, y: 700, width: 300, height: 200,
            onClick: (engine) => engine.dialogue.start('rodalies_mates')
        },
        canonada: {
            name: "Canonada de desguàs",
            x: 350, y: 750, width: 150, height: 100,
            onClick: (engine) => {
                if (engine.state.getFlag('canonada_descoberta')) {
                    engine.state.loadScene('cau');
                }
            }
        }
    }
};

const cau_scene = {
    background: 'assets/street.png',
    hotspots: {
        pissarra: {
            name: "Pissarra de proves",
            x: 400, y: 200, width: 400, height: 300,
            onClick: (engine) => engine.dialogue.start('cau_pissarra')
        },
        amic: {
            name: "Amic/a (Marc/Júlia)",
            x: 1000, y: 400, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('cau_amic')
        },
        mapa: {
            name: "Mapa sobre la taula",
            x: 700, y: 600, width: 200, height: 150,
            onClick: (engine) => engine.state.loadScene('exterior_cap')
        }
    }
};

const exterior_cap_scene = {
    background: 'assets/street.png',
    hotspots: {
        porta: {
            name: "Porta Principal del CAP",
            x: 500, y: 300, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('exterior_porta')
        },
        ambulancia: {
            name: "Ambulància",
            x: 1000, y: 400, width: 400, height: 300,
            onClick: (engine) => engine.dialogue.start('exterior_ambulancia')
        },
        farmaciola: {
            name: "Farmaciola de l'ambulància",
            x: 1100, y: 500, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('bisturi')) {
                    engine.dialogue.start('exterior_farmaciola');
                }
            }
        },
        finestra: {
            name: "Finestra lateral",
            x: 200, y: 400, width: 150, height: 150,
            onClick: (engine) => {
                if (engine.state.getFlag('finestra_tallada')) {
                    engine.state.loadScene('recepcio_cap');
                } else {
                    engine.dialogue.start('exterior_finestra');
                }
            },
            onUseItem: (engine, itemId) => {
                if (itemId === 'bisturi' && !engine.state.getFlag('finestra_tallada')) {
                    engine.dialogue.start('exterior_finestra_tallada');
                    return false;
                }
                return false;
            }
        }
    }
};

const recepcio_cap_scene = {
    background: 'assets/street.png',
    hotspots: {
        infermera: {
            name: "Infermera amnèsica",
            x: 700, y: 300, width: 200, height: 300,
            onClick: (engine) => {
                if (!engine.state.getFlag('infermera_fora')) {
                    engine.dialogue.start('recepcio_infermera');
                }
            }
        },
        maquina: {
            name: "Màquina de torns",
            x: 1000, y: 400, width: 100, height: 150,
            onClick: (engine) => engine.dialogue.start('recepcio_maquina')
        },
        porta: {
            name: "Porta de l'Arxiu",
            x: 500, y: 200, width: 150, height: 400,
            onClick: (engine) => {
                if (engine.state.getFlag('infermera_fora')) {
                    engine.state.loadScene('arxiu_medic');
                } else {
                    engine.dialogue.start('recepcio_porta');
                }
            }
        },
        carro: {
            name: "Carro de medicaments",
            x: 200, y: 500, width: 150, height: 200,
            onClick: (engine) => {
                if (!engine.state.hasItem('alcohol')) {
                    engine.dialogue.start('recepcio_carro');
                }
            }
        },
        alarma: {
            name: "Alarma d'incendis",
            x: 1200, y: 200, width: 100, height: 100,
            onClick: (engine) => engine.dialogue.start('recepcio_alarma'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'alcohol') {
                    engine.dialogue.start('recepcio_alarma_activa');
                    return true;
                }
                return false;
            }
        }
    }
};

const arxiu_medic_scene = {
    background: 'assets/street.png',
    hotspots: {
        ordinador: {
            name: "Ordinador",
            x: 600, y: 400, width: 150, height: 150,
            onClick: (engine) => engine.dialogue.start('arxiu_ordinador')
        },
        pissarra: {
            name: "Pissarra de torns",
            x: 300, y: 200, width: 200, height: 200,
            onClick: (engine) => engine.dialogue.start('arxiu_pissarra')
        },
        caixa: {
            name: "Caixa d'Objectes",
            x: 900, y: 500, width: 150, height: 150,
            onClick: (engine) => engine.dialogue.start('arxiu_caixa')
        },
        bobina: {
            name: "Bobina de coure",
            x: 920, y: 520, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('fil_de_coure')) {
                    engine.dialogue.start('arxiu_bobina');
                }
            }
        },
        taula: {
            name: "Taula de treball",
            x: 500, y: 550, width: 400, height: 200,
            onClick: (engine) => engine.dialogue.start('arxiu_taula'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'walkman' && engine.state.hasItem('fil_de_coure')) {
                    engine.dialogue.start('arxiu_taula_escut');
                    return false;
                }
                if (itemId === 'fil_de_coure' && engine.state.hasItem('walkman')) {
                    engine.dialogue.start('arxiu_taula_escut');
                    return false;
                }
                return false;
            }
        },
        finestra: {
            name: "Finestra de la sala d'arxius",
            x: 100, y: 200, width: 150, height: 300,
            onClick: (engine) => {
                if (engine.state.hasItem('escut_magnetic')) {
                    engine.dialogue.start('arxiu_finestra');
                } else {
                    engine.dialogue.start('generic_look', 'start', "A fora la boira és massa densa. Necessito alguna cosa per protegir-me.");
                }
            }
        }
    }
};

const carrero_radio_scene = {
    background: 'assets/street.png',
    hotspots: {
        porta: {
            name: "Porta del darrere",
            x: 500, y: 300, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('carrero_porta'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'clau_radio') {
                    engine.dialogue.start('carrero_porta_oberta');
                    return false;
                }
                return false;
            }
        },
        reixa: {
            name: "Reixa de ventilació",
            x: 200, y: 600, width: 150, height: 100,
            onClick: (engine) => engine.dialogue.start('carrero_reixa'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'cartell_enrotllat') {
                    engine.dialogue.start('carrero_reixa_clau');
                    return false;
                }
                return false;
            }
        },
        cartell: {
            name: "Pedaç de cartell",
            x: 800, y: 700, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('cartell_enrotllat')) {
                    engine.dialogue.start('carrero_cartell');
                }
            }
        }
    }
};

const estudi_radio_scene = {
    background: 'assets/street.png',
    hotspots: {
        finestra: {
            name: "Finestra de la peixera",
            x: 400, y: 200, width: 300, height: 200,
            onClick: (engine) => engine.dialogue.start('estudi_finestra')
        },
        armari: {
            name: "Armari d'equipament",
            x: 100, y: 300, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('estudi_armari')
        },
        equip: {
            name: "Equip d'enllaç",
            x: 150, y: 500, width: 100, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('emissora_mobil')) {
                    engine.dialogue.start('estudi_equip');
                }
            }
        },
        planol: {
            name: "Plànol a la paret",
            x: 800, y: 200, width: 150, height: 150,
            onClick: (engine) => engine.dialogue.start('estudi_planol')
        },
        porta: {
            name: "Porta de sortida d'emergència",
            x: 1100, y: 300, width: 200, height: 500,
            onClick: (engine) => engine.dialogue.start('estudi_porta')
        }
    }
};

const sender_serra_scene = {
    background: 'assets/street.png',
    hotspots: {
        soldat: {
            name: "Soldat",
            x: 600, y: 400, width: 150, height: 300,
            onClick: (engine) => {
                if (engine.state.getFlag('focus_apagat')) {
                    engine.dialogue.start('sender_soldat_distret');
                } else {
                    engine.dialogue.start('sender_soldat');
                }
            }
        },
        generador: {
            name: "Generador elèctric",
            x: 400, y: 600, width: 150, height: 150,
            onClick: (engine) => engine.dialogue.start('sender_generador'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'bisturi') {
                    engine.dialogue.start('sender_generador_tallat');
                    return false;
                }
                return false;
            }
        },
        cami: {
            name: "Camí de terra",
            x: 900, y: 200, width: 300, height: 500,
            onClick: (engine) => {
                if (engine.state.getFlag('focus_apagat')) {
                    engine.dialogue.start('sender_cami');
                } else {
                    engine.dialogue.start('generic_look', 'start', "El focus il·lumina tot el camí. Si passo em veuran.");
                }
            }
        }
    }
};

const torretes_scene = {
    background: 'assets/street.png',
    hotspots: {
        estructura: {
            name: "Estructura metàl·lica",
            x: 500, y: 100, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('torretes_estructura'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'emissora_mobil') {
                    engine.dialogue.start('torretes_emissio');
                    return false;
                }
                return false;
            }
        },
        boira: {
            name: "Boira al poble",
            x: 200, y: 500, width: 1000, height: 300,
            onClick: (engine) => {
                if (engine.state.getFlag('missatge_enviat')) {
                    engine.dialogue.start('torretes_boira');
                }
            }
        },
        sirena: {
            name: "Sirena militar",
            x: 100, y: 100, width: 100, height: 100,
            onClick: (engine) => {
                if (engine.state.getFlag('missatge_enviat')) {
                    engine.dialogue.start('torretes_sirena');
                }
            }
        },
        reixa: {
            name: "Reixa de clavegueram",
            x: 800, y: 700, width: 150, height: 100,
            onClick: (engine) => {
                if (engine.state.getFlag('missatge_enviat')) {
                    engine.dialogue.start('torretes_reixa');
                } else {
                    engine.dialogue.start('generic_look', 'start', "Això sembla que connecta amb els antics conductes de ventilació. Encara he d'enviar el missatge.");
                }
            }
        }
    }
};

const pou_ventilacio_scene = {
    background: 'assets/street.png',
    hotspots: {
        reixa: {
            name: "Reixa superior",
            x: 600, y: 100, width: 200, height: 100,
            onClick: (engine) => engine.dialogue.start('pou_reixa')
        },
        foscor: {
            name: "Foscor",
            x: 500, y: 300, width: 400, height: 500,
            onClick: (engine) => {
                if (engine.state.getFlag('pou_illuminat')) {
                    engine.state.loadScene('campament_oblidats');
                } else {
                    engine.dialogue.start('pou_foscor');
                }
            },
            onUseItem: (engine, itemId) => {
                if (itemId === 'llanterna_dinamo') {
                    engine.dialogue.start('pou_foscor_llum');
                    return false;
                }
                return false;
            }
        },
        motxilla: {
            name: "Motxilla abandonada",
            x: 300, y: 700, width: 150, height: 150,
            onClick: (engine) => {
                if (!engine.state.hasItem('llanterna_dinamo')) {
                    engine.dialogue.start('pou_motxilla');
                    engine.dialogue.start('pou_motxilla_agafar');
                }
            }
        }
    }
};

const campament_oblidats_scene = {
    background: 'assets/street.png',
    hotspots: {
        refugiats: {
            name: "Refugiats",
            x: 200, y: 400, width: 400, height: 300,
            onClick: (engine) => engine.dialogue.start('campament_refugiats')
        },
        guarda: {
            name: "Guarda de Seguretat",
            x: 800, y: 450, width: 150, height: 300,
            onClick: (engine) => {
                if (!engine.state.hasItem('targeta_solvay')) {
                    engine.dialogue.start('campament_guarda');
                }
            },
            onUseItem: (engine, itemId) => {
                if (itemId === 'xocolatina') {
                    engine.dialogue.start('campament_guarda_intercanvi');
                    return false;
                }
                return false;
            }
        },
        maquina: {
            name: "Màquina expenedora",
            x: 1200, y: 300, width: 200, height: 500,
            onClick: (engine) => engine.dialogue.start('campament_maquina'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'pedra' || itemId === 'clau_anglesa_gran') {
                    engine.dialogue.start('campament_maquina_trencada');
                    return false;
                }
                return false;
            }
        },
        vago: {
            name: "Vagó del tren",
            x: 1000, y: 200, width: 200, height: 400,
            onClick: (engine) => engine.dialogue.start('campament_vago')
        }
    }
};

const ascensor_carrega_scene = {
    background: 'assets/street.png',
    hotspots: {
        boto: {
            name: "Botó de crida",
            x: 400, y: 400, width: 50, height: 50,
            onClick: (engine) => engine.dialogue.start('ascensor_boto')
        },
        lector: {
            name: "Lector de targetes",
            x: 500, y: 400, width: 50, height: 100,
            onClick: (engine) => engine.dialogue.start('ascensor_lector'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'targeta_solvay' && engine.state.getFlag('ascensor_energia')) {
                    engine.dialogue.start('ascensor_lector_obert');
                    return false;
                }
                return false;
            }
        },
        panell: {
            name: "Panell elèctric",
            x: 300, y: 400, width: 80, height: 120,
            onClick: (engine) => engine.dialogue.start('ascensor_panell'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'emissora_mobil' || itemId === 'walkman') {
                    engine.dialogue.start('ascensor_panell_energia');
                    return false;
                }
                return false;
            }
        },
        interior: {
            name: "Interior de l'ascensor",
            x: 600, y: 200, width: 400, height: 600,
            onClick: (engine) => {
                if (engine.state.getFlag('ascensor_obert')) {
                    engine.dialogue.start('ascensor_interior');
                } else {
                    engine.dialogue.start('generic_look', 'start', "Les portes estan tancades.");
                }
            }
        }
    }
};

const passarella_control_scene = {
    background: 'assets/street.png',
    hotspots: {
        director: {
            name: "Director de Solvay",
            x: 800, y: 300, width: 200, height: 400,
            onClick: (engine) => {
                if (!engine.state.getFlag('director_distret')) {
                    engine.dialogue.start('passarella_director');
                }
            }
        },
        caixa: {
            name: "Caixa d'eines",
            x: 200, y: 600, width: 150, height: 100,
            onClick: (engine) => {
                if (!engine.state.hasItem('clau_anglesa_gran')) {
                    engine.dialogue.start('passarella_caixa');
                }
            }
        },
        valvula: {
            name: "Vàlvula de pressió de vapor",
            x: 100, y: 300, width: 100, height: 150,
            onClick: (engine) => engine.dialogue.start('passarella_valvula'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'clau_anglesa_gran') {
                    engine.dialogue.start('passarella_valvula_trencada');
                    return false;
                }
                return false;
            }
        },
        porta: {
            name: "Porta del Despatx",
            x: 1200, y: 200, width: 200, height: 500,
            onClick: (engine) => {
                if (engine.state.getFlag('director_distret')) {
                    engine.state.loadScene('despatx_director');
                } else {
                    engine.dialogue.start('generic_look', 'start', "El director em bloqueja el pas.");
                }
            }
        }
    }
};

const despatx_director_scene = {
    background: 'assets/street.png',
    hotspots: {
        paperera: {
            name: "Paperera metàl·lica",
            x: 800, y: 600, width: 100, height: 150,
            onClick: (engine) => engine.dialogue.start('despatx_paperera')
        },
        fragment: {
            name: "Fragment de paper",
            x: 810, y: 610, width: 50, height: 50,
            onClick: (engine) => {
                if (!engine.state.hasItem('codi_cremat')) {
                    engine.dialogue.start('despatx_fragment');
                }
            }
        },
        ordinador: {
            name: "Ordinador (MS-DOS)",
            x: 500, y: 300, width: 200, height: 200,
            onClick: (engine) => {
                if (!engine.state.getFlag('ordinador_hackejat')) {
                    engine.dialogue.start('despatx_ordinador');
                }
            },
            onUseItem: (engine, itemId) => {
                if (itemId === 'codi_cremat') {
                    engine.dialogue.start('despatx_ordinador_hackejat');
                    return false;
                }
                return false;
            }
        },
        porta: {
            name: "Porta de manteniment",
            x: 1100, y: 200, width: 200, height: 600,
            onClick: (engine) => {
                if (engine.state.getFlag('ordinador_hackejat')) {
                    engine.dialogue.start('despatx_porta');
                } else {
                    engine.dialogue.start('generic_look', 'start', "Aquesta porta dóna a la sala de màquines, primer he de veure què volia amagar el director a l'ordinador.");
                }
            }
        }
    }
};

const sala_maquines_scene = {
    background: 'assets/street.png',
    hotspots: {
        roda: {
            name: "Roda Vermella",
            x: 600, y: 200, width: 400, height: 400,
            onClick: (engine) => engine.dialogue.start('sala_roda'),
            onUseItem: (engine, itemId) => {
                if (itemId === 'clau_anglesa_gran' && engine.state.getFlag('director_derrotat')) {
                    engine.dialogue.start('sala_roda_tancada');
                    return false;
                }
                return false;
            }
        },
        director: {
            name: "Director de Solvay",
            x: 800, y: 400, width: 200, height: 400,
            onClick: (engine) => {
                if (!engine.state.getFlag('director_derrotat')) {
                    engine.dialogue.start('sala_director');
                }
            },
            onUseItem: (engine, itemId) => {
                // Any of the walkman variants
                if (itemId === 'escut_magnetic' || itemId === 'walkman') {
                    engine.dialogue.start('sala_walkman_utilitzat');
                    return false;
                }
                return false;
            }
        }
    }
};
