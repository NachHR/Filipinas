/* V8.10.0 — Three achievable P1 and complementary clips per ISO date.
   Adapted from the supplied 29-day filming guide; Cebu remains conditional.
   Keep shot IDs stable when editing wording or ordering. */
const SHOOTING_PLANS = {
  "2026-09-26": {
    "p1": [
      {
        "id": "close-luggage-hands-and-zip-detail",
        "text": {
          "es": "Cerrar equipaje: detalle de manos y cremallera",
          "en": "Close luggage: hands and zip detail"
        },
        "duration": "10–15 s"
      },
      {
        "id": "terminal-wide-shot-without-personal-data",
        "text": {
          "es": "Terminal: plano general sin datos personales",
          "en": "Terminal: wide shot without personal data"
        },
        "duration": "10–15 s"
      },
      {
        "id": "aircraft-or-runway-through-the-window-if-possible",
        "text": {
          "es": "Aeronave o pista desde ventanilla, si es posible",
          "en": "Aircraft or runway through the window, if possible"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Ruedas de maleta: plano bajo desde un lugar seguro, 8–10 s",
        "en": "Suitcase wheels: low shot from a safe spot, 8–10 s"
      },
      {
        "es": "Ambiente de puerta: 30–60 s sin conversaciones reconocibles",
        "en": "Gate ambience: 30–60 s without recognisable conversations"
      }
    ]
  },
  "2026-09-27": {
    "p1": [
      {
        "id": "first-light-at-auh-static-wide-shot",
        "text": {
          "es": "Primera luz en AUH: plano fijo amplio",
          "en": "First light at AUH: static wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "terminal-geometry-symmetrical-framing",
        "text": {
          "es": "Geometrías de la terminal: encuadre simétrico",
          "en": "Terminal geometry: symmetrical framing"
        },
        "duration": "10–15 s"
      },
      {
        "id": "night-departure-lights-from-a-permitted-area",
        "text": {
          "es": "Salida nocturna: luces desde zona permitida",
          "en": "Night departure: lights from a permitted area"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Si se visita la mezquita: exterior fijo, 10–15 s, respetando permisos",
        "en": "If visiting the mosque: static exterior, 10–15 s, respecting permissions"
      },
      {
        "es": "Terminal o lounge: 30–60 s de ambiente discreto, sin primeros planos ajenos",
        "en": "Terminal or lounge: 30–60 s of discreet ambience, no close-ups of others"
      }
    ]
  },
  "2026-09-28": {
    "p1": [
      {
        "id": "manila-connection-terminal-wide-shot",
        "text": {
          "es": "Conexión en Manila: plano general de la terminal",
          "en": "Manila connection: terminal wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "coast-or-clouds-from-the-plane-if-visible",
        "text": {
          "es": "Costa o nubes desde el avión, si son visibles",
          "en": "Coast or clouds from the plane, if visible"
        },
        "duration": "10–15 s"
      },
      {
        "id": "cdo-arrival-traffic-from-a-safe-position",
        "text": {
          "es": "Llegada a CDO: tráfico desde un punto seguro",
          "en": "CDO arrival: traffic from a safe position"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Equipaje y primera comida: dos detalles de 8–10 s, sin datos privados",
        "en": "Luggage and first meal: two 8–10 s details, no private data"
      },
      {
        "es": "Primera noche tropical: 30–60 s de ambiente",
        "en": "First tropical night: 30–60 s of ambience"
      }
    ]
  },
  "2026-09-29": {
    "p1": [
      {
        "id": "cdo-street-wide-shot-with-traffic",
        "text": {
          "es": "Calle de CDO: plano general con tráfico",
          "en": "CDO street: wide shot with traffic"
        },
        "duration": "10–15 s"
      },
      {
        "id": "market-exchange-with-permission",
        "text": {
          "es": "Mercado: intercambio con permiso",
          "en": "Market: exchange with permission"
        },
        "duration": "10–15 s"
      },
      {
        "id": "food-hands-completing-a-preparation-action",
        "text": {
          "es": "Comida: manos preparando una acción completa",
          "en": "Food: hands completing a preparation action"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Fruta, vapor o lluvia sobre asfalto: detalle desde 0,4 m, 10 s",
        "en": "Fruit, steam or rain on asphalt: detail from 0.4 m, 10 s"
      },
      {
        "es": "Mercado o cocina: 30–60 s de sonido desde un punto fijo",
        "en": "Market or kitchen: 30–60 s of sound from a fixed position"
      }
    ]
  },
  "2026-09-30": {
    "p1": [
      {
        "id": "shopping-interior-geometry-in-a-static-shot",
        "text": {
          "es": "Interior comercial: geometría en plano fijo",
          "en": "Shopping interior: geometry in a static shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "high-ridge-before-sunset-wide-shot",
        "text": {
          "es": "High Ridge antes del ocaso: plano amplio",
          "en": "High Ridge before sunset: wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "same-framing-with-city-lights",
        "text": {
          "es": "Mismo encuadre con las luces de la ciudad",
          "en": "Same framing with city lights"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "High Ridge: timelapse de 15–25 min con trípode y WB fijo",
        "en": "High Ridge: 15–25 min timelapse with tripod and locked WB"
      },
      {
        "es": "Ciudad desde el mirador: 45 s de ambiente limpio",
        "en": "City from the viewpoint: 45 s of clean ambience"
      }
    ]
  },
  "2026-10-01": {
    "p1": [
      {
        "id": "bag-and-departure-from-vinyce-detail-without-address",
        "text": {
          "es": "Mochila y salida de Vinyce: detalle sin dirección",
          "en": "Bag and departure from Vinyce: detail without address"
        },
        "duration": "10–15 s"
      },
      {
        "id": "departure-road-shot-from-a-safe-position",
        "text": {
          "es": "Carretera de salida: plano desde punto seguro",
          "en": "Departure road: shot from a safe position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "new-surroundings-wide-shot-without-identifying-private-acces",
        "text": {
          "es": "Nuevo entorno: plano general sin identificar accesos privados",
          "en": "New surroundings: wide shot without identifying private access"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Provisiones o puerta cerrándose: detalle de 8–10 s sin datos privados",
        "en": "Supplies or door closing: 8–10 s detail without private data"
      },
      {
        "es": "Cremallera, puerta y motor: sonidos separados, 10–20 s cada uno",
        "en": "Zip, door and engine: separate sounds, 10–20 s each"
      }
    ]
  },
  "2026-10-02": {
    "p1": [
      {
        "id": "camiguin-appears-silhouette-during-the-crossing",
        "text": {
          "es": "Camiguin aparece: silueta desde la travesía",
          "en": "Camiguin appears: silhouette during the crossing"
        },
        "duration": "10–15 s"
      },
      {
        "id": "wake-or-bow-secured-camera",
        "text": {
          "es": "Estela o proa: cámara asegurada",
          "en": "Wake or bow: secured camera"
        },
        "duration": "10–15 s"
      },
      {
        "id": "arrival-wide-shot-of-harbour-and-terrain",
        "text": {
          "es": "Llegada: plano amplio del puerto y relieve",
          "en": "Arrival: wide shot of harbour and terrain"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Vegetación y descarga: planos de 8–10 s desde un lugar permitido",
        "en": "Vegetation and unloading: 8–10 s shots from a permitted area"
      },
      {
        "es": "Puerto y tarde en Mambajao: 30–60 s de ambiente",
        "en": "Harbour and afternoon in Mambajao: 30–60 s of ambience"
      }
    ]
  },
  "2026-10-03": {
    "p1": [
      {
        "id": "mambajao-at-dawn-static-shot",
        "text": {
          "es": "Mambajao al amanecer: plano fijo",
          "en": "Mambajao at dawn: static shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "clouds-over-the-terrain-patient-framing",
        "text": {
          "es": "Nubes sobre el relieve: encuadre paciente",
          "en": "Clouds over the terrain: patient framing"
        },
        "duration": "10–15 s"
      },
      {
        "id": "everyday-life-one-scene-with-permission",
        "text": {
          "es": "Vida cotidiana: una escena con permiso",
          "en": "Everyday life: one scene with permission"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Hojas mojadas o insectos: detalle desde 0,4 m, 10–15 s",
        "en": "Wet leaves or insects: detail from 0.4 m, 10–15 s"
      },
      {
        "es": "Mañana y costa: 60 s de ambiente en cada lugar",
        "en": "Morning and coast: 60 s of ambience at each location"
      }
    ]
  },
  "2026-10-04": {
    "p1": [
      {
        "id": "guiob-wide-shot-before-entering",
        "text": {
          "es": "Guiob: plano general antes de entrar",
          "en": "Guiob: wide shot before entering"
        },
        "duration": "10–15 s"
      },
      {
        "id": "hot-spring-steam-from-outside-the-water",
        "text": {
          "es": "Vapor de la fuente termal desde fuera del agua",
          "en": "Hot spring steam from outside the water"
        },
        "duration": "10–15 s"
      },
      {
        "id": "tuasan-first-reveal-and-static-wide-shot",
        "text": {
          "es": "Tuasan: primera revelación y plano amplio fijo",
          "en": "Tuasan: first reveal and static wide shot"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Piedra y musgo en Guiob: plano fijo de 10–15 s",
        "en": "Stone and moss at Guiob: static 10–15 s shot"
      },
      {
        "es": "Guiob y Tuasan: 30–60 s de ambiente lejos de salpicaduras",
        "en": "Guiob and Tuasan: 30–60 s of ambience away from splashes"
      }
    ]
  },
  "2026-10-05": {
    "p1": [
      {
        "id": "white-island-wide-shot-of-sand-and-horizon",
        "text": {
          "es": "White Island: plano amplio de arena y horizonte",
          "en": "White Island: wide shot of sand and horizon"
        },
        "duration": "10–15 s"
      },
      {
        "id": "camiguin-silhouette-from-the-shore",
        "text": {
          "es": "Silueta de Camiguin desde la orilla",
          "en": "Camiguin silhouette from the shore"
        },
        "duration": "10–15 s"
      },
      {
        "id": "mantigue-stable-underwater-shot-no-chasing-wildlife",
        "text": {
          "es": "Mantigue: plano submarino estable, sin perseguir fauna",
          "en": "Mantigue: stable underwater shot, no chasing wildlife"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Huellas borradas por olas: plano fijo de 10–15 s",
        "en": "Footprints erased by waves: static 10–15 s shot"
      },
      {
        "es": "Orilla y casco del barco: 30–60 s de sonido protegido del viento",
        "en": "Shore and boat hull: 30–60 s of sound sheltered from wind"
      }
    ]
  },
  "2026-10-06": {
    "p1": [
      {
        "id": "farewell-to-camiguin-coast-or-wake",
        "text": {
          "es": "Despedida de Camiguin: costa o estela",
          "en": "Farewell to Camiguin: coast or wake"
        },
        "duration": "10–15 s"
      },
      {
        "id": "transition-to-mountains-road-from-a-safe-position",
        "text": {
          "es": "Transición a montaña: carretera desde lugar seguro",
          "en": "Transition to mountains: road from a safe position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "manolo-fortich-first-low-clouds-or-terrain",
        "text": {
          "es": "Manolo Fortich: primeras nubes bajas o relieve",
          "en": "Manolo Fortich: first low clouds or terrain"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Unir estela y carretera con dirección similar: dos clips de 10 s",
        "en": "Match wake and road in a similar direction: two 10 s clips"
      },
      {
        "es": "Primer ambiente de Bukidnon: 45–60 s sin hablar",
        "en": "First Bukidnon ambience: 45–60 s without talking"
      }
    ]
  },
  "2026-10-07": {
    "p1": [
      {
        "id": "highlands-mist-or-clouds-over-mountains",
        "text": {
          "es": "Tierras altas: niebla o nubes sobre montañas",
          "en": "Highlands: mist or clouds over mountains"
        },
        "duration": "10–15 s"
      },
      {
        "id": "prepare-the-transfer-one-complete-action",
        "text": {
          "es": "Preparar el traslado: una acción completa",
          "en": "Prepare the transfer: one complete action"
        },
        "duration": "10–15 s"
      },
      {
        "id": "arrival-in-kisolon-wide-shot-of-surroundings",
        "text": {
          "es": "Llegada a Kisolon: plano general del entorno",
          "en": "Arrival in Kisolon: wide shot of surroundings"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Vegetación o manos preparando provisiones: 12–20 s, con permiso",
        "en": "Vegetation or hands preparing supplies: 12–20 s, with permission"
      },
      {
        "es": "Aves, viento y motor distante: 45–60 s",
        "en": "Birds, wind and distant engine: 45–60 s"
      }
    ]
  },
  "2026-10-08": {
    "p1": [
      {
        "id": "kisolon-river-static-wide-shot-from-a-safe-bank",
        "text": {
          "es": "Río de Kisolon: plano fijo amplio desde ribera segura",
          "en": "Kisolon river: static wide shot from a safe bank"
        },
        "duration": "10–15 s"
      },
      {
        "id": "water-around-stones-detail-from-a-dry-position",
        "text": {
          "es": "Agua rodeando piedras: detalle desde zona seca",
          "en": "Water around stones: detail from a dry position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "human-scale-beside-the-river-with-permission",
        "text": {
          "es": "Escala humana junto al río, con permiso",
          "en": "Human scale beside the river, with permission"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Si se acampa: montaje o cocina con permiso, secuencia de 3 × 10 s",
        "en": "If camping: setup or cooking with permission, 3 × 10 s sequence"
      },
      {
        "es": "Río: 60 s; campamento autorizado: 45 s de ambiente",
        "en": "River: 60 s; authorised campsite: 45 s of ambience"
      }
    ]
  },
  "2026-10-09": {
    "p1": [
      {
        "id": "repeat-the-river-framing-in-different-light",
        "text": {
          "es": "Repetir el encuadre del río con otra luz",
          "en": "Repeat the river framing in different light"
        },
        "duration": "10–15 s"
      },
      {
        "id": "campsite-routine-if-undertaken-preparation-and-ending",
        "text": {
          "es": "Rutina del campamento, si se realiza: preparación y final",
          "en": "Campsite routine, if undertaken: preparation and ending"
        },
        "duration": "10–15 s"
      },
      {
        "id": "same-surroundings-at-the-end-of-the-day-static-shot",
        "text": {
          "es": "Mismo entorno al final del día: plano fijo",
          "en": "Same surroundings at the end of the day: static shot"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Sombras o nubes: plano fijo de 20 s, sin forzar acción",
        "en": "Shadows or clouds: static 20 s shot, no forced action"
      },
      {
        "es": "Comparar mañana y tarde desde el mismo punto: 45 s cada una",
        "en": "Compare morning and afternoon from the same spot: 45 s each"
      }
    ]
  },
  "2026-10-10": {
    "p1": [
      {
        "id": "transfer-to-iligan-road-from-a-safe-position",
        "text": {
          "es": "Traslado a Iligan: carretera desde punto seguro",
          "en": "Transfer to Iligan: road from a safe position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "arrival-sign-or-city-skyline",
        "text": {
          "es": "Llegada: señal o perfil general de la ciudad",
          "en": "Arrival: sign or city skyline"
        },
        "duration": "10–15 s"
      },
      {
        "id": "urban-water-or-rain-if-it-occurs-naturally",
        "text": {
          "es": "Agua urbana o lluvia, si aparece de forma natural",
          "en": "Urban water or rain, if it occurs naturally"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Preparar calzado y protección del equipo: detalles de 8–10 s",
        "en": "Prepare footwear and equipment protection: 8–10 s details"
      },
      {
        "es": "Carretera y ciudad al final del día: 30–60 s",
        "en": "Road and city at the end of the day: 30–60 s"
      }
    ]
  },
  "2026-10-11": {
    "p1": [
      {
        "id": "descent-to-tinago-shots-from-safe-stopping-points",
        "text": {
          "es": "Descenso a Tinago: planos desde paradas seguras",
          "en": "Descent to Tinago: shots from safe stopping points"
        },
        "duration": "10–15 s"
      },
      {
        "id": "first-view-and-wide-shot-of-the-waterfall",
        "text": {
          "es": "Primera vista y plano amplio de la cascada",
          "en": "First view and wide shot of the waterfall"
        },
        "duration": "10–15 s"
      },
      {
        "id": "human-scale-and-departure-without-blocking-the-path",
        "text": {
          "es": "Escala humana y salida, sin obstaculizar el paso",
          "en": "Human scale and departure, without blocking the path"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Agua lenta con luz abundante: 5–8 s; Timoga solo donde se permita",
        "en": "Slow water in bright light: 5–8 s; Timoga only where permitted"
      },
      {
        "es": "Tinago desde tres distancias seguras: 30 s de ambiente por punto",
        "en": "Tinago from three safe distances: 30 s of ambience per spot"
      }
    ]
  },
  "2026-10-12": {
    "p1": [
      {
        "id": "cdo-harbour-moorings-and-loading-from-an-authorised-area",
        "text": {
          "es": "Puerto de CDO: amarras y carga desde zona autorizada",
          "en": "CDO harbour: moorings and loading from an authorised area"
        },
        "duration": "10–15 s"
      },
      {
        "id": "ferry-departure-lights-or-coast-receding",
        "text": {
          "es": "Salida del ferry: luces o costa alejándose",
          "en": "Ferry departure: lights or coast receding"
        },
        "duration": "10–15 s"
      },
      {
        "id": "lit-deck-static-shot-with-supported-camera",
        "text": {
          "es": "Cubierta iluminada: plano fijo con cámara apoyada",
          "en": "Lit deck: static shot with supported camera"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Pasillo o luz sobre el agua: plano apoyado de 10–15 s",
        "en": "Corridor or light on water: supported 10–15 s shot"
      },
      {
        "es": "Motor grave y viento protegido: 30–60 s; primera luz si coincide",
        "en": "Low engine sound and sheltered wind: 30–60 s; first light if timing fits"
      }
    ]
  },
  "2026-10-13": {
    "p1": [
      {
        "id": "arrival-in-cebu-harbour-wide-shot",
        "text": {
          "es": "Llegada a Cebú: plano amplio del puerto",
          "en": "Arrival in Cebu: harbour wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "contrast-between-harbour-and-streets-from-a-safe-spot",
        "text": {
          "es": "Contraste entre puerto y calles, desde punto seguro",
          "en": "Contrast between harbour and streets, from a safe spot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "city-waking-up-one-everyday-scene",
        "text": {
          "es": "Ciudad despertando: una escena cotidiana",
          "en": "City waking up: one everyday scene"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Jeepneys y carteles: planos fijos de 8–10 s desde la acera",
        "en": "Jeepneys and signs: static 8–10 s shots from the pavement"
      },
      {
        "es": "Puerto y tarde urbana: 30–60 s de ambiente",
        "en": "Harbour and urban afternoon: 30–60 s of ambience"
      }
    ]
  },
  "2026-10-14": {
    "p1": [
      {
        "id": "if-visiting-the-hills-city-from-above",
        "text": {
          "es": "Si se visitan las colinas: ciudad desde altura",
          "en": "If visiting the hills: city from above"
        },
        "duration": "10–15 s"
      },
      {
        "id": "temple-of-leah-if-visited-exterior-symmetry",
        "text": {
          "es": "Temple of Leah, si se visita: simetría exterior",
          "en": "Temple of Leah, if visited: exterior symmetry"
        },
        "duration": "10–15 s"
      },
      {
        "id": "sirao-if-visited-gardens-and-small-figure-with-permission",
        "text": {
          "es": "Sirao, si se visita: jardines y figura pequeña con permiso",
          "en": "Sirao, if visited: gardens and small figure with permission"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Jardines, piedra y skyline: detalles de 10–15 s solo si se visita",
        "en": "Gardens, stone and skyline: 10–15 s details only if visited"
      },
      {
        "es": "Viento y ambiente de colinas: 30–60 s con micro protegido",
        "en": "Wind and hill ambience: 30–60 s with sheltered microphone"
      }
    ]
  },
  "2026-10-15": {
    "p1": [
      {
        "id": "historic-centre-if-visited-full-exterior",
        "text": {
          "es": "Centro histórico, si se visita: exterior completo",
          "en": "Historic centre, if visited: full exterior"
        },
        "duration": "10–15 s"
      },
      {
        "id": "stone-wood-or-candles-detail-where-permitted",
        "text": {
          "es": "Piedra, madera o velas: detalle donde se permita",
          "en": "Stone, wood or candles: detail where permitted"
        },
        "duration": "10–15 s"
      },
      {
        "id": "walking-transition-between-places-from-a-safe-stopping-point",
        "text": {
          "es": "Transición caminando entre lugares desde una parada segura",
          "en": "Walking transition between places from a safe stopping point"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Puertas o pasos: detalles de 8–10 s con permiso, sin interrumpir culto",
        "en": "Doors or footsteps: 8–10 s details with permission, without disrupting worship"
      },
      {
        "es": "Ambiente del centro: 30–60 s, evitando conversaciones privadas",
        "en": "Downtown ambience: 30–60 s, avoiding private conversations"
      }
    ]
  },
  "2026-10-16": {
    "p1": [
      {
        "id": "carcar-if-visited-market-wide-shot",
        "text": {
          "es": "Carcar, si se visita: mercado en plano general",
          "en": "Carcar, if visited: market wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "food-preparation-hands-with-permission",
        "text": {
          "es": "Preparación de comida: manos con permiso",
          "en": "Food preparation: hands with permission"
        },
        "duration": "10–15 s"
      },
      {
        "id": "road-south-changing-urban-density",
        "text": {
          "es": "Carretera hacia el sur: cambio de densidad urbana",
          "en": "Road south: changing urban density"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Vapor, frutas o letreros: detalle desde 0,4 m, 10 s",
        "en": "Steam, fruit or signs: detail from 0.4 m, 10 s"
      },
      {
        "es": "Mercado con permiso: 30–60 s de ambiente desde un punto fijo",
        "en": "Market with permission: 30–60 s of ambience from a fixed point"
      }
    ]
  },
  "2026-10-17": {
    "p1": [
      {
        "id": "kawasan-if-visited-approach-and-water-before-entering",
        "text": {
          "es": "Kawasan, si se visita: aproximación y agua antes de entrar",
          "en": "Kawasan, if visited: approach and water before entering"
        },
        "duration": "10–15 s"
      },
      {
        "id": "wide-waterfall-shot-from-an-authorised-position",
        "text": {
          "es": "Cascada amplia desde un punto autorizado",
          "en": "Wide waterfall shot from an authorised position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "current-vegetation-and-human-scale-with-permission",
        "text": {
          "es": "Corriente, vegetación y escala humana con permiso",
          "en": "Current, vegetation and human scale with permission"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Roca y vegetación: detalle de 10–15 s desde suelo seguro",
        "en": "Rock and vegetation: 10–15 s detail from secure ground"
      },
      {
        "es": "Agua desde zona sin salpicaduras: 30–60 s",
        "en": "Water from a splash-free spot: 30–60 s"
      }
    ]
  },
  "2026-10-18": {
    "p1": [
      {
        "id": "if-visiting-oslob-wide-shot-keeping-distance",
        "text": {
          "es": "Si se realiza Oslob: plano amplio manteniendo distancia",
          "en": "If visiting Oslob: wide shot keeping distance"
        },
        "duration": "10–15 s"
      },
      {
        "id": "wildlife-crossing-the-frame-without-touching-or-chasing",
        "text": {
          "es": "Fauna cruzando el encuadre sin tocar ni perseguir",
          "en": "Wildlife crossing the frame without touching or chasing"
        },
        "duration": "10–15 s"
      },
      {
        "id": "alternative-if-visited-sumilon-horizon-or-tumalog-water",
        "text": {
          "es": "Alternativa si se visita: horizonte de Sumilon o agua de Tumalog",
          "en": "Alternative if visited: Sumilon horizon or Tumalog water"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Sumilon o Tumalog como alternativa: plano amplio de 15 s si se visita",
        "en": "Sumilon or Tumalog alternative: 15 s wide shot if visited"
      },
      {
        "es": "Costa desde tierra: 45–60 s de ambiente; no perseguir animales",
        "en": "Coast from land: 45–60 s of ambience; never chase animals"
      }
    ]
  },
  "2026-10-19": {
    "p1": [
      {
        "id": "repeat-an-arrival-composition-in-different-light",
        "text": {
          "es": "Repetir un encuadre de llegada con otra luz",
          "en": "Repeat an arrival composition in different light"
        },
        "duration": "10–15 s"
      },
      {
        "id": "preparing-to-return-one-complete-action",
        "text": {
          "es": "Preparación del regreso: una acción completa",
          "en": "Preparing to return: one complete action"
        },
        "duration": "10–15 s"
      },
      {
        "id": "city-at-the-end-of-the-day-static-wide-shot",
        "text": {
          "es": "Ciudad al final del día: plano fijo amplio",
          "en": "City at the end of the day: static wide shot"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Compras o embalaje: acción completa con permiso, 12–20 s",
        "en": "Shopping or packing: complete action with permission, 12–20 s"
      },
      {
        "es": "Ambiente urbano calmado y cierre de equipaje: 30–60 s",
        "en": "Quiet urban ambience and luggage closing: 30–60 s"
      }
    ]
  },
  "2026-10-20": {
    "p1": [
      {
        "id": "repeat-moorings-or-wake-from-the-outbound-ferry",
        "text": {
          "es": "Repetir amarras o estela del ferry de ida",
          "en": "Repeat moorings or wake from the outbound ferry"
        },
        "duration": "10–15 s"
      },
      {
        "id": "horizon-in-different-light-same-camera-height",
        "text": {
          "es": "Horizonte con otra luz: misma altura de cámara",
          "en": "Horizon in different light: same camera height"
        },
        "duration": "10–15 s"
      },
      {
        "id": "return-to-cdo-arrival-and-luggage-no-private-access",
        "text": {
          "es": "Regreso a CDO: llegada y equipaje, sin accesos privados",
          "en": "Return to CDO: arrival and luggage, no private access"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Comparar captura del día 17: repetir dirección y duración, 10–15 s",
        "en": "Compare day 17 frame: repeat direction and duration, 10–15 s"
      },
      {
        "es": "Motor y puerto: 30–60 s para un puente sonoro con la ida",
        "en": "Engine and harbour: 30–60 s for a sound bridge with the outbound trip"
      }
    ]
  },
  "2026-10-21": {
    "p1": [
      {
        "id": "amaya-view-if-visited-framing-recalling-high-ridge",
        "text": {
          "es": "Amaya View, si se visita: encuadre que recuerde High Ridge",
          "en": "Amaya View, if visited: framing recalling High Ridge"
        },
        "duration": "10–15 s"
      },
      {
        "id": "city-at-sunset-from-a-safe-position",
        "text": {
          "es": "Ciudad al atardecer desde un punto seguro",
          "en": "City at sunset from a safe position"
        },
        "duration": "10–15 s"
      },
      {
        "id": "everyday-detail-echoing-day-4",
        "text": {
          "es": "Detalle cotidiano que dialogue con el día 4",
          "en": "Everyday detail echoing day 4"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Reflejos o comida: detalle de 10 s para enlazar con el inicio",
        "en": "Reflections or food: 10 s detail to link with the beginning"
      },
      {
        "es": "Ciudad desde altura o calle: 45–60 s",
        "en": "City from above or street level: 45–60 s"
      }
    ]
  },
  "2026-10-22": {
    "p1": [
      {
        "id": "cdo-or-chosen-outing-calm-wide-shot",
        "text": {
          "es": "CDO o excursión elegida: plano general tranquilo",
          "en": "CDO or chosen outing: calm wide shot"
        },
        "duration": "10–15 s"
      },
      {
        "id": "prepare-to-depart-hands-packing-objects",
        "text": {
          "es": "Preparar la salida: manos guardando objetos",
          "en": "Prepare to depart: hands packing objects"
        },
        "duration": "10–15 s"
      },
      {
        "id": "simple-farewell-with-consent",
        "text": {
          "es": "Despedida sencilla con consentimiento",
          "en": "Simple farewell with consent"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Plano de pausa sin acción forzada: 20 s; excursiones solo si se confirman",
        "en": "Quiet shot without forced action: 20 s; outings only if confirmed"
      },
      {
        "es": "Último ambiente limpio de CDO: 60 s",
        "en": "Final clean CDO ambience: 60 s"
      }
    ]
  },
  "2026-10-23": {
    "p1": [
      {
        "id": "luggage-closing-before-checkout",
        "text": {
          "es": "Equipaje cerrándose antes del check-out",
          "en": "Luggage closing before checkout"
        },
        "duration": "10–15 s"
      },
      {
        "id": "last-street-and-transfer-to-laguindingan",
        "text": {
          "es": "Última calle y traslado a Laguindingan",
          "en": "Last street and transfer to Laguindingan"
        },
        "duration": "10–15 s"
      },
      {
        "id": "last-view-of-mindanao-if-visible-through-the-window",
        "text": {
          "es": "Última vista de Mindanao, si es visible desde ventanilla",
          "en": "Last view of Mindanao, if visible through the window"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Guardar un recuerdo: detalle de 8–10 s sin documentos visibles",
        "en": "Pack a keepsake: 8–10 s detail with no documents visible"
      },
      {
        "es": "Cremallera, puerta y motor: 10–20 s por sonido",
        "en": "Zip, door and engine: 10–20 s per sound"
      }
    ]
  },
  "2026-10-24": {
    "p1": [
      {
        "id": "first-light-through-the-window-if-visible",
        "text": {
          "es": "Primera luz desde ventanilla, si es visible",
          "en": "First light through the window, if visible"
        },
        "duration": "10–15 s"
      },
      {
        "id": "auh-repeat-a-geometry-from-day-2",
        "text": {
          "es": "AUH: repetir una geometría del día 2",
          "en": "AUH: repeat a geometry from day 2"
        },
        "duration": "10–15 s"
      },
      {
        "id": "madrid-final-shot-of-luggage-at-rest",
        "text": {
          "es": "Madrid: último plano del equipaje detenido",
          "en": "Madrid: final shot of luggage at rest"
        },
        "duration": "10–15 s"
      }
    ],
    "clips": [
      {
        "es": "Reloj o café en tránsito: plano fijo de 8–10 s",
        "en": "Clock or coffee in transit: static 8–10 s shot"
      },
      {
        "es": "Terminal y llegada a Madrid: 30–60 s, sin datos privados",
        "en": "Terminal and Madrid arrival: 30–60 s, no private data"
      }
    ]
  }
};
