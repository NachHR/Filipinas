/* V8.6 — Flight data and itinerary injection. No reservation reference is stored in the public app. */
const FLIGHT_MANAGE_URL='https://www.etihad.com/es-es/manage';
const TRIP_FLIGHTS={
  outbound:[
    {date:'2026-09-26',from:'MAD',to:'AUH',depart:'21:50',arrive:'06:45',nextDay:true},
    {date:'2026-09-27',from:'AUH',to:'MNL',depart:'21:45',arrive:'11:05',nextDay:true},
    {date:'2026-09-28',from:'MNL',to:'CGY',depart:'16:15',arrive:'17:55',nextDay:false}
  ],
  return:[
    {date:'2026-10-23',from:'CGY',to:'MNL',depart:'21:55',arrive:'23:30',nextDay:false},
    {date:'2026-10-24',from:'MNL',to:'AUH',depart:'05:50',arrive:'10:50',nextDay:false},
    {date:'2026-10-24',from:'AUH',to:'MAD',depart:'14:05',arrive:'19:40',nextDay:false}
  ],
  returnCheckin:{date:'2026-10-21',time:'21:55'}
};
const flightText={es:{checkin:'Hacer check-in de vuelta',desc:'Check-in de los vuelos de vuelta. Disponible 48 h antes del primer vuelo de vuelta.',manage:'Gestionar reserva en Etihad',return:'Vuelos de vuelta',out:'Salida',arrive:'Llegada'},en:{checkin:'Complete return check-in',desc:'Check in for the return flights. Available 48 hours before the first return flight.',manage:'Manage booking on Etihad',return:'Return flights',out:'Departure',arrive:'Arrival'}};
function flightL(){return flightText[state?.lang||'es']||flightText.es}
function flightActivity(titleEs,titleEn,descriptionEs,descriptionEn,time=''){
  return {time,title:{es:titleEs,en:titleEn},description:{es:descriptionEs,en:descriptionEn},notes:{es:'',en:''},place:'Etihad Airways',maps:FLIGHT_MANAGE_URL,directions:FLIGHT_MANAGE_URL,status:'planned',duration:'—',transport:{es:'Vuelo',en:'Flight'},budget:0,recording:{}};
}
(function injectFlightActivities(){
  if(typeof tripData==='undefined')return;
  const checkinDay=tripData.days.find(d=>d.date==='2026-10-21');
  if(checkinDay&&!checkinDay.activities.some(a=>a.flightTask==='return-checkin')){
    const a=flightActivity('Check-in de vuelos de vuelta','Return flight check-in','Hacer el check-in de los vuelos de vuelta. Disponible desde el 21 de octubre a las 21:55 (48 h antes del primer vuelo).','Complete the return flight check-in. Available from 21 October at 21:55 (48 hours before the first return flight).');
    a.time='21:55';a.flightTask='return-checkin';a.notes={es:'Abrir la gestión oficial de la reserva de Etihad para completar el check-in.',en:'Open Etihad’s official booking management page to complete check-in.'};
    checkinDay.activities.unshift(a);
  }
  const departureDay=tripData.days.find(d=>d.date==='2026-10-23');
  if(departureDay&&!departureDay.activities.some(a=>a.flightTask==='return-itinerary')){
    const a=flightActivity('Vuelos de vuelta a Madrid','Return flights to Madrid','CGY → MNL 21:55–23:30. Después: MNL → AUH 05:50–10:50 y AUH → MAD 14:05–19:40 el 24 de octubre.','CGY → MNL 21:55–23:30. Then: MNL → AUH 05:50–10:50 and AUH → MAD 14:05–19:40 on 24 October.','21:55');
    a.flightTask='return-itinerary';a.notes={es:'23/10: Cagayan de Oro → Manila. 24/10: Manila → Abu Dhabi → Madrid.',en:'23/10: Cagayan de Oro → Manila. 24/10: Manila → Abu Dhabi → Madrid.'};
    departureDay.activities.push(a);
  }
})();
function renderFlightSection(day){
  if(!day||day.date!=='2026-10-23')return '';
  const l=flightL();
  return `<section class="flight-section"><div class="section-head"><h2>✈ ${l.return}</h2><span>23–24 Oct</span></div><div class="card flight-card">${TRIP_FLIGHTS.return.map(f=>`<div class="flight-row"><strong>${f.date.slice(8,10)}/${f.date.slice(5,7)} · ${f.from} → ${f.to}</strong><span>${f.depart} → ${f.arrive}</span></div>`).join('')}<a class="action primary" target="_blank" rel="noopener" href="${FLIGHT_MANAGE_URL}">↗ ${l.manage}</a></div></section>`;
}
