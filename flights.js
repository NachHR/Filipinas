/* V8.12.0 — Flight details supplied by the owner on 23 September 2026.
   Dates and times are local to each airport. Never store booking references here. */
const FLIGHT_MANAGE_URL='https://www.etihad.com/es-es/manage';
const TRIP_FLIGHTS={
  outbound:[
    {date:'2026-09-26',arrivalDate:'2026-09-27',from:'MAD',to:'AUH',depart:'21:50',arrive:'06:45',nextDay:true,number:'EY104',airline:'ETIHAD',operator:'ETIHAD',departureTerminal:'4',arrivalTerminal:'A',checkedBags:0},
    {date:'2026-09-27',arrivalDate:'2026-09-28',from:'AUH',to:'MNL',depart:'21:45',arrive:'11:05',nextDay:true,number:'EY440',airline:'ETIHAD',operator:'ETIHAD',departureTerminal:'A',arrivalTerminal:'3',checkedBags:0},
    {date:'2026-09-28',arrivalDate:'2026-09-28',from:'MNL',to:'CGY',depart:'16:15',arrive:'17:55',nextDay:false,number:'PR2525',airline:'PHILIPPINE AIRLINES',operator:'PAL EXPRESS',departureTerminal:'2',arrivalTerminal:null,checkedBags:0}
  ],
  return:[
    {date:'2026-10-23',arrivalDate:'2026-10-23',from:'CGY',to:'MNL',depart:'21:55',arrive:'23:30',nextDay:false,number:'PR2528',airline:'PHILIPPINE AIRLINES',operator:'PAL EXPRESS',departureTerminal:null,arrivalTerminal:'2',checkedBags:1,checkedBagKg:25},
    {date:'2026-10-24',arrivalDate:'2026-10-24',from:'MNL',to:'AUH',depart:'05:50',arrive:'10:50',nextDay:false,number:'EY447',airline:'ETIHAD',operator:'ETIHAD',departureTerminal:'3',arrivalTerminal:'A',checkedBags:1,checkedBagKg:25},
    {date:'2026-10-24',arrivalDate:'2026-10-24',from:'AUH',to:'MAD',depart:'14:05',arrive:'19:40',nextDay:false,number:'EY103',airline:'ETIHAD',operator:'ETIHAD',departureTerminal:'A',arrivalTerminal:'4',checkedBags:1,checkedBagKg:25}
  ],
  returnCheckin:{date:'2026-10-21',time:'21:55'}
};
const FLIGHT_AIRPORTS={
  MAD:{es:'Adolfo Suárez Madrid-Barajas',en:'Adolfo Suárez Madrid-Barajas'},
  AUH:{es:'Internacional Zayed',en:'Zayed International'},
  MNL:{es:'Internacional Ninoy Aquino',en:'Ninoy Aquino International'},
  CGY:{es:'Laguindingan · Cagayan de Oro',en:'Laguindingan · Cagayan de Oro'}
};
function flightBaggage(f){return t(f.checkedBags?'flights.oneBag':'flights.noBags');}
function flightTerminal(value){return value?`${t('flights.terminal')} ${value}`:t('flights.terminalUnknown');}
function flightConnection(f,next){
  // Both timestamps refer to the same connection airport: no device-zone conversion.
  const minutes=(Date.parse(`${next.date}T${next.depart}:00Z`)-Date.parse(`${f.arrivalDate}T${f.arrive}:00Z`))/60000;
  return `${Math.floor(minutes/60)} h ${String(minutes%60).padStart(2,'0')} min`;
}
function flightDetails(f){
  return `<article class="flight-detail"><h3>${f.number} · ${f.from} → ${f.to}</h3><p>${tr(FLIGHT_AIRPORTS[f.from])} → ${tr(FLIGHT_AIRPORTS[f.to])}</p><dl><div><dt>${t('flights.departure')}</dt><dd>${f.date} · <strong>${f.depart}</strong> · ${flightTerminal(f.departureTerminal)}</dd></div><div><dt>${t('flights.arrival')}</dt><dd>${f.arrivalDate} · <strong>${f.arrive}</strong> · ${flightTerminal(f.arrivalTerminal)}</dd></div><div><dt>${t('flights.airline')}</dt><dd>${f.airline}</dd></div><div><dt>${t('flights.operator')}</dt><dd>${f.operator}</dd></div></dl><p>${flightBaggage(f)}</p><span class="pill confirmed">${t('flights.confirmed')}</span></article>`;
}
function flightList(flights){
  return flights.map((f,i)=>flightDetails(f)+(flights[i+1]?`<p class="flight-connection">${t('flights.connection')} ${f.to}: <strong>${flightConnection(f,flights[i+1])}</strong>${f.arrivalTerminal!==flights[i+1].departureTerminal?` · ${t('flights.terminalChange')} ${f.arrivalTerminal} → ${flights[i+1].departureTerminal}`:''}</p>`:'')).join('');
}
function renderFlightSection(day){
  const direction=TRIP_FLIGHTS.outbound.some(f=>f.date===day?.date)?'outbound':TRIP_FLIGHTS.return.some(f=>f.date===day?.date)?'return':null;
  if(!direction)return '';
  return `<section class="flight-section"><div class="section-head"><h2>✈ ${t(`flights.${direction}`)}</h2></div><p class="muted">${t('flights.localTimes')}</p><div class="card flight-card">${flightList(TRIP_FLIGHTS[direction])}</div></section>`;
}
(function updateFlightActivities(){
  if(typeof tripData==='undefined')return;
  const bi=(es,en)=>({es,en});
  const checkinDay=tripData.days.find(d=>d.date==='2026-10-21');
  if(checkinDay&&!checkinDay.activities.some(a=>a.flightTask==='return-checkin')){
    checkinDay.activities.unshift({time:'21:55',title:bi('Check-in de vuelos de vuelta','Return flight check-in'),description:bi('Hacer el check-in de los vuelos de vuelta. Disponible desde el 21 de octubre a las 21:55 (48 h antes del primer vuelo).','Complete the return flight check-in. Available from 21 October at 21:55 (48 hours before the first return flight).'),notes:bi('Comprobar los tramos de Philippine Airlines / PAL Express y Etihad con cada aerolínea.','Check the Philippine Airlines / PAL Express and Etihad segments with each airline.'),status:'planned',budget:0,recording:{},flightTask:'return-checkin',externalUrl:FLIGHT_MANAGE_URL,externalLabel:bi('Gestionar reserva en Etihad','Manage booking on Etihad')});
  }
  const mapping=[['2026-09-26','Vuelo Madrid → Abu Dhabi',TRIP_FLIGHTS.outbound[0]],['2026-09-27','Vuelo Abu Dhabi → Manila',TRIP_FLIGHTS.outbound[1]],['2026-09-28','Vuelo Manila → Cagayan de Oro',TRIP_FLIGHTS.outbound[2]],['2026-10-23','Vuelo a Madrid',TRIP_FLIGHTS.return[0]],['2026-10-24','Vuelo Manila → Abu Dhabi',TRIP_FLIGHTS.return[1]],['2026-10-24','Vuelo Abu Dhabi → Madrid',TRIP_FLIGHTS.return[2]]];
  for(const [date,title,f] of mapping){
    const a=tripData.days.find(d=>d.date===date)?.activities.find(a=>a.title.es===title);if(!a)continue;
    a.flightNumber=f.number;a.time=f.depart;
    if(date==='2026-10-23'){
      a.id='return-first-flight';a.legacyTitles=['Vuelo a Madrid','Vuelos de vuelta a Madrid'];
      a.title=bi('Vuelo Cagayan de Oro → Manila','Flight Cagayan de Oro → Manila');a.duration='1 h 35 min';
    }
    const departure=f.departureTerminal?` · Terminal ${f.departureTerminal}`:'';
    const arrival=f.arrivalTerminal?` · Terminal ${f.arrivalTerminal}`:'';
    a.description=bi(`${f.number} · ${f.from} ${f.depart}${departure} → ${f.to} ${f.arrive}${arrival}. Llegada: ${f.arrivalDate}.`,`${f.number} · ${f.from} ${f.depart}${departure} → ${f.to} ${f.arrive}${arrival}. Arrival: ${f.arrivalDate}.`);
    const es=`${f.airline} · Operado por ${f.operator}. Confirmado. ${f.checkedBags?'1 maleta facturada de hasta 25 kg incluida.':'La tarifa no incluye maletas facturadas.'}`;
    const en=`${f.airline} · Operated by ${f.operator}. Confirmed. ${f.checkedBags?'1 checked bag up to 25 kg included.':'The fare does not include checked baggage.'}`;
    a.notes=bi(es+(a.notes?.es?' '+a.notes.es:''),en+(a.notes?.en?' '+a.notes.en:''));
  }
  const connection=tripData.days.find(d=>d.date==='2026-09-28')?.activities.find(a=>a.title.es==='Conexión en Manila');
  if(connection){connection.time='11:05–16:15';connection.duration='5 h 10 min';connection.description=bi('Conexión de EY440 a PR2525: llegada a Terminal 3 y salida de Terminal 2. Prever inmigración, equipaje si corresponde y traslado de terminal.','Connection from EY440 to PR2525: arrive at Terminal 3 and depart from Terminal 2. Allow for immigration, baggage if needed and terminal transfer.');}
  const returnDay=tripData.days.find(d=>d.date==='2026-10-24');
  if(returnDay){returnDay.activities.unshift({id:'manila-return-transfer',time:'23:30 (23/10)–05:50 (24/10)',title:bi('Conexión nocturna en Manila','Overnight connection in Manila'),description:bi('PR2528 llega a Terminal 2; EY447 sale de Terminal 3. Escala de 6 h 20 min con cambio de avión y terminal.','PR2528 arrives at Terminal 2; EY447 departs from Terminal 3. A 6 h 20 min layover with a change of aircraft and terminal.'),notes:bi('Confirmar el procedimiento de equipaje y conexión con las aerolíneas.','Confirm baggage and connection procedures with the airlines.'),status:'planned',duration:'6 h 20 min',budget:0,recording:{}});}
})();
