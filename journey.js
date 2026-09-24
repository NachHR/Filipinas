/* V8.7.1 — Door-to-door journey composition.
   Extends the destination itinerary from Madrid departure to Madrid arrival,
   migrates local day-based data once, and keeps the 26-day Philippines core intact. */
(function composeDoorToDoorJourney(){
  if(typeof tripData==='undefined'||!Array.isArray(tripData.days))return;
  const VERSION='8.7';
  const MIGRATION_KEY='filipinasJourneyModel';
  const oldDays=tripData.days.slice();

  function bilingual(es,en){return {es,en}}
  function activity({time,title,description,notes='',place=null,maps='',directions='',status='planned',duration=null,transport='',externalUrl='',externalLabel=''}){
    const a={time,title,description,notes:typeof notes==='string'?bilingual(notes,notes):notes,place,maps,directions,status,duration,transport:typeof transport==='string'?bilingual(transport,transport):transport,budget:0,recording:{}};
    if(externalUrl){a.externalUrl=externalUrl;a.externalLabel=externalLabel||bilingual('Más información','More information')}
    return a;
  }

  function migrateLocalDayState(){
    if(localStorage.getItem(MIGRATION_KEY)===VERSION)return;
    const shift=id=>{const n=Number(id);return Number.isInteger(n)&&n>=1&&n<=26?n+2:n};
    const selected=localStorage.getItem('selectedDay');
    if(selected!==null)localStorage.setItem('selectedDay',String(shift(selected)));
    try{
      const items=JSON.parse(localStorage.getItem('expenses')||'[]');
      if(Array.isArray(items))localStorage.setItem('expenses',JSON.stringify(items.map(e=>({...e,dayId:shift(e.dayId)}))));
    }catch{}
    const keys=Array.from({length:localStorage.length},(_,i)=>localStorage.key(i)).filter(Boolean);
    keys.forEach(key=>{
      let m=key.match(/^check_(\d+)$/);
      if(m){const next=`check_${shift(m[1])}`;if(next!==key){if(localStorage.getItem(next)===null)localStorage.setItem(next,localStorage.getItem(key));localStorage.removeItem(key)}return}
      m=key.match(/^done_(\d+)_(.+)$/);
      if(m){const next=`done_${shift(m[1])}_${m[2]}`;if(next!==key){if(localStorage.getItem(next)===null)localStorage.setItem(next,localStorage.getItem(key));localStorage.removeItem(key)}}
    });
    localStorage.setItem(MIGRATION_KEY,VERSION);
  }

  migrateLocalDayState();
  oldDays.forEach(day=>{day.id+=2});

  const madridCover='./images/madrid-barajas.webp';
  const abuDhabiCover='./images/zayed-airport.webp';
  const mosqueCover='./images/sheikh-zayed-mosque.webp';
  const locations=[
    {key:'madrid-departure',name:bilingual('Madrid · salida','Madrid · departure'),cover:madridCover,gallery:[madridCover]},
    {key:'abu-dhabi',name:bilingual('Abu Dhabi · escala','Abu Dhabi · layover'),cover:abuDhabiCover,gallery:[abuDhabiCover,mosqueCover]},
    {key:'madrid-return',name:bilingual('Madrid · regreso','Madrid · return'),cover:madridCover,gallery:[madridCover]}
  ];
  locations.forEach(loc=>{if(!tripData.locations.some(x=>x.key===loc.key))tripData.locations.push(loc)});

  const day1={
    id:1,date:'2026-09-26',dateLabel:bilingual('26 de septiembre','26 September'),
    location:bilingual('Madrid → Abu Dhabi','Madrid → Abu Dhabi'),locationKey:'madrid-departure',
    title:bilingual('Comienza el viaje','The journey begins'),status:'planned',budget:0,budgetNote:bilingual('Inicio del viaje internacional.','Start of the international journey.'),loc:null,
    activities:[
      activity({time:'18:30',title:bilingual('Llegar a Madrid-Barajas','Arrive at Madrid-Barajas'),description:bilingual('Llegar al aeropuerto con margen para facturación, controles y embarque.','Arrive at the airport with enough time for check-in, security and boarding.'),place:'Adolfo Suárez Madrid-Barajas Airport',maps:'https://www.google.com/maps/search/?api=1&query=Adolfo+Suarez+Madrid+Barajas+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Adolfo+Suarez+Madrid+Barajas+Airport',transport:bilingual('Traslado al aeropuerto','Airport transfer')}),
      activity({time:'21:50',title:bilingual('Vuelo Madrid → Abu Dhabi','Flight Madrid → Abu Dhabi'),description:bilingual('Salida de Madrid hacia Abu Dhabi. Llegada prevista al día siguiente a las 06:45.','Depart Madrid for Abu Dhabi. Scheduled arrival the following day at 06:45.'),notes:bilingual('Primer tramo del viaje internacional.','First international flight segment.'),duration:'≈ 6 h 55 min',transport:bilingual('Vuelo','Flight')})
    ],
    pois:[{name:bilingual('Adolfo Suárez Madrid-Barajas Airport','Adolfo Suárez Madrid-Barajas Airport'),description:bilingual('Punto de salida del viaje.','Trip departure point.'),place:'Adolfo Suárez Madrid-Barajas Airport',maps:'https://www.google.com/maps/search/?api=1&query=Adolfo+Suarez+Madrid+Barajas+Airport',optional:false,image:null}]
  };

  const day2={
    id:2,date:'2026-09-27',dateLabel:bilingual('27 de septiembre','27 September'),
    location:bilingual('Abu Dhabi · escala','Abu Dhabi · layover'),locationKey:'abu-dhabi',
    title:bilingual('Escala larga en Abu Dhabi','Long layover in Abu Dhabi'),status:'planned',budget:0,budgetNote:bilingual('Plan flexible de escala; costes no incluidos hasta reservar.','Flexible layover plan; costs not included until booked.'),loc:null,
    activities:[
      activity({time:'06:45',title:bilingual('Llegada a Abu Dhabi','Arrival in Abu Dhabi'),description:bilingual('Llegada a Zayed International Airport. Confirmar equipaje, tarjeta de embarque y condiciones de tránsito antes de decidir si salir del aeropuerto.','Arrive at Zayed International Airport. Confirm baggage, boarding pass and transit conditions before deciding whether to leave the airport.'),place:'Zayed International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Zayed+International+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Zayed+International+Airport',transport:bilingual('Vuelo / tránsito','Flight / transit')}),
      activity({time:'09:00–14:30',title:bilingual('Opción A · Visitar Abu Dhabi','Option A · Visit Abu Dhabi'),description:bilingual('Si inmigración, equipaje y tiempos lo permiten, salir del aeropuerto y visitar la Gran Mezquita Sheikh Zayed. Mantener el plan flexible y regresar al aeropuerto con mucho margen.','If immigration, baggage and timing allow, leave the airport and visit Sheikh Zayed Grand Mosque. Keep the plan flexible and return to the airport with a generous buffer.'),notes:bilingual('Objetivo recomendado: estar de vuelta en la terminal sobre las 16:30 como máximo. Verificar ese día requisitos de entrada y tiempos reales.','Suggested target: be back at the terminal by around 16:30 at the latest. Check entry requirements and real travel times that day.'),place:'Sheikh Zayed Grand Mosque',maps:'https://www.google.com/maps/place/Sheikh+Zayed+Grand+Mosque/@24.4128334,54.4749754,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e4273e8dafe49:0x248fbbcbefe2afc7!8m2!3d24.4128334!4d54.4749754!16s%2Fm%2F025_jz8',directions:'https://www.google.com/maps/dir/?api=1&destination=24.4128334,54.4749754',status:'optional',transport:bilingual('Taxi / transporte local','Taxi / local transport')}),
      activity({time:'08:00–16:30',title:bilingual('Opción B · Descansar en el aeropuerto','Option B · Rest at the airport'),description:bilingual('Alternativa sin salir de AUH: desayuno, paseo por la terminal, descanso y preparación tranquila para el siguiente vuelo.','Alternative without leaving AUH: breakfast, explore the terminal, rest and prepare calmly for the next flight.'),notes:bilingual('Elegir esta opción si prefieres minimizar trámites, desplazamientos o cansancio.','Choose this option if you prefer to minimise formalities, transfers or fatigue.'),place:'Zayed International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Zayed+International+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Zayed+International+Airport',status:'optional',transport:bilingual('A pie','On foot')}),
      activity({time:'17:30–20:15',title:bilingual('Pearl Lounge · comida, ducha y descanso','Pearl Lounge · food, shower and rest'),description:bilingual('Entrar al Pearl Lounge de Terminal A para comer, ducharse, cargar dispositivos y descansar antes del vuelo a Manila.','Use the Pearl Lounge in Terminal A to eat, shower, charge devices and rest before the Manila flight.'),notes:bilingual('La estancia estándar es de hasta 3 horas. Comprar o comprobar el pase en Revolut → RevPoints → Salas VIP; Revolut usa LoungeKey. Verificar disponibilidad y condiciones en la app antes de comprar.','The standard stay is up to 3 hours. Buy or check the pass in Revolut → RevPoints → Lounges; Revolut uses LoungeKey. Verify availability and conditions in the app before purchase.'),place:'Pearl Lounge, Terminal A, Zayed International Airport',status:'planned',transport:bilingual('A pie · zona airside','On foot · airside'),externalUrl:'https://www.plazapremiumlounge.com/en-uk/find/india-middle-east-south-africa/united-arab-emirates/abu-dhabi/zayed-international-airport/pearl-lounge',externalLabel:bilingual('Información oficial del Pearl Lounge','Official Pearl Lounge information')}),
      activity({time:'21:45',title:bilingual('Vuelo Abu Dhabi → Manila','Flight Abu Dhabi → Manila'),description:bilingual('Salida hacia Manila. Llegada prevista el 28 de septiembre a las 11:05.','Depart for Manila. Scheduled arrival on 28 September at 11:05.'),notes:bilingual('Salir del lounge con margen suficiente para localizar la puerta y embarcar.','Leave the lounge with enough time to find the gate and board.'),duration:'≈ 9 h 20 min',transport:bilingual('Vuelo','Flight')})
    ],
    pois:[
      {name:bilingual('Sheikh Zayed Grand Mosque','Sheikh Zayed Grand Mosque'),description:bilingual('Visita opcional durante la escala larga.','Optional visit during the long layover.'),place:'Sheikh Zayed Grand Mosque',maps:'https://www.google.com/maps/place/Sheikh+Zayed+Grand+Mosque/@24.4128334,54.4749754,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e4273e8dafe49:0x248fbbcbefe2afc7!8m2!3d24.4128334!4d54.4749754!16s%2Fm%2F025_jz8',optional:true,image:mosqueCover},
      {name:bilingual('Pearl Lounge','Pearl Lounge'),description:bilingual('Lounge airside de Terminal A, cerca de D43, con comida, zonas de descanso y duchas.','Terminal A airside lounge near D43 with food, rest areas and showers.'),place:'Pearl Lounge, Zayed International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Pearl+Lounge+Zayed+International+Airport',optional:false,image:abuDhabiCover}
    ]
  };

  const day3=oldDays.find(d=>d.date==='2026-09-28');
  if(day3){
    day3.activities[0].time='17:55';
    const additions=[
      activity({time:'11:05',title:bilingual('Llegada a Manila','Arrival in Manila'),description:bilingual('Llegada internacional a Manila y comienzo de la conexión hacia Cagayan de Oro.','International arrival in Manila and start of the connection to Cagayan de Oro.'),place:'Ninoy Aquino International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Ninoy+Aquino+International+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Ninoy+Aquino+International+Airport',transport:bilingual('Vuelo / tránsito','Flight / transit')}),
      activity({time:'11:30–15:30',title:bilingual('Conexión en Manila','Connection in Manila'),description:bilingual('Tiempo para inmigración, equipaje si corresponde, cambio de zona/terminal y preparación del vuelo doméstico.','Time for immigration, baggage if required, terminal/area transfer and preparation for the domestic flight.'),notes:bilingual('Confirmar en el aeropuerto el procedimiento real de conexión y el terminal del vuelo a CGY.','Confirm the actual connection procedure and the CGY flight terminal at the airport.'),place:'Ninoy Aquino International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Ninoy+Aquino+International+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Ninoy+Aquino+International+Airport',transport:bilingual('Tránsito aeroportuario','Airport transit')}),
      activity({time:'16:15',title:bilingual('Vuelo Manila → Cagayan de Oro','Flight Manila → Cagayan de Oro'),description:bilingual('Último tramo de ida hacia Laguindingan Airport (CGY).','Final outbound segment to Laguindingan Airport (CGY).'),notes:bilingual('Llegada prevista a las 17:55.','Scheduled arrival at 17:55.'),duration:'≈ 1 h 40 min',transport:bilingual('Vuelo','Flight')})
    ];
    day3.activities=[...additions,...day3.activities];
  }

  const day29={
    id:29,date:'2026-10-24',dateLabel:bilingual('24 de octubre','24 October'),
    location:bilingual('Manila → Abu Dhabi → Madrid','Manila → Abu Dhabi → Madrid'),locationKey:'madrid-return',
    title:bilingual('Regreso a Madrid','Return to Madrid'),status:'planned',budget:0,budgetNote:bilingual('Último día del viaje y llegada a Madrid.','Final travel day and arrival in Madrid.'),loc:null,
    activities:[
      activity({time:'05:50',title:bilingual('Vuelo Manila → Abu Dhabi','Flight Manila → Abu Dhabi'),description:bilingual('Salida de Manila hacia Abu Dhabi.','Depart Manila for Abu Dhabi.'),notes:bilingual('Llegada prevista a AUH a las 10:50.','Scheduled arrival at AUH at 10:50.'),duration:'≈ 9 h',transport:bilingual('Vuelo','Flight')}),
      activity({time:'10:50–14:05',title:bilingual('Conexión en Abu Dhabi','Connection in Abu Dhabi'),description:bilingual('Escala de conexión en Zayed International Airport antes del último vuelo a Madrid.','Connection at Zayed International Airport before the final flight to Madrid.'),notes:bilingual('Seguir señalización de conexiones y comprobar la puerta del AUH → MAD.','Follow transfer signs and check the gate for AUH → MAD.'),place:'Zayed International Airport',maps:'https://www.google.com/maps/search/?api=1&query=Zayed+International+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Zayed+International+Airport',transport:bilingual('Tránsito aeroportuario','Airport transit')}),
      activity({time:'14:05',title:bilingual('Vuelo Abu Dhabi → Madrid','Flight Abu Dhabi → Madrid'),description:bilingual('Último vuelo del viaje con destino Madrid.','Final flight of the trip to Madrid.'),notes:bilingual('Llegada prevista a Madrid a las 19:40.','Scheduled arrival in Madrid at 19:40.'),duration:'≈ 8 h 35 min',transport:bilingual('Vuelo','Flight')}),
      activity({time:'19:40',title:bilingual('Llegada a Madrid · fin del viaje','Arrival in Madrid · end of trip'),description:bilingual('Llegada a Madrid y cierre del itinerario puerta a puerta.','Arrive in Madrid and complete the door-to-door itinerary.'),place:'Adolfo Suárez Madrid-Barajas Airport',maps:'https://www.google.com/maps/search/?api=1&query=Adolfo+Suarez+Madrid+Barajas+Airport',directions:'https://www.google.com/maps/dir/?api=1&destination=Adolfo+Suarez+Madrid+Barajas+Airport',transport:bilingual('Llegada','Arrival')})
    ],
    pois:[{name:bilingual('Adolfo Suárez Madrid-Barajas Airport','Adolfo Suárez Madrid-Barajas Airport'),description:bilingual('Punto final del viaje.','Final point of the trip.'),place:'Adolfo Suárez Madrid-Barajas Airport',maps:'https://www.google.com/maps/search/?api=1&query=Adolfo+Suarez+Madrid+Barajas+Airport',optional:false,image:null}]
  };

  tripData.days=[day1,day2,...oldDays,day29];
  tripData.meta.start='2026-09-26';
  tripData.meta.end='2026-10-24';
  tripData.meta.totalDays=29;
})();