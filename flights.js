/* V8.6.4 — Flight data and itinerary injection using central i18n. */
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
function flightActivity(title,description,notes,time=''){
  return {time,title,description,notes,status:'planned',duration:'—',transport:{es:'Vuelo',en:'Flight'},budget:0,recording:{},externalUrl:FLIGHT_MANAGE_URL,externalLabel:{es:'Gestionar reserva en Etihad',en:'Manage booking on Etihad'}};
}
(function injectFlightActivities(){
  if(typeof tripData==='undefined')return;
  const checkinDay=tripData.days.find(d=>d.date==='2026-10-21');
  if(checkinDay&&!checkinDay.activities.some(a=>a.flightTask==='return-checkin')){
    const a=flightActivity({es:'Check-in de vuelos de vuelta',en:'Return flight check-in'},{es:'Hacer el check-in de los vuelos de vuelta. Disponible desde el 21 de octubre a las 21:55 (48 h antes del primer vuelo).',en:'Complete the return flight check-in. Available from 21 October at 21:55 (48 hours before the first return flight).'},{es:'Abrir la gestión oficial de la reserva de Etihad para completar el check-in.',en:'Open Etihad’s official booking management page to complete check-in.'},'21:55');
    a.flightTask='return-checkin';checkinDay.activities.unshift(a);
  }
  const departureDay=tripData.days.find(d=>d.date==='2026-10-23');
  if(departureDay&&!departureDay.activities.some(a=>a.flightTask==='return-itinerary')){
    const a=flightActivity({es:'Vuelos de vuelta a Madrid',en:'Return flights to Madrid'},{es:'CGY → MNL 21:55–23:30. Después: MNL → AUH 05:50–10:50 y AUH → MAD 14:05–19:40 el 24 de octubre.',en:'CGY → MNL 21:55–23:30. Then: MNL → AUH 05:50–10:50 and AUH → MAD 14:05–19:40 on 24 October.'},{es:'23/10: Cagayan de Oro → Manila. 24/10: Manila → Abu Dhabi → Madrid.',en:'23/10: Cagayan de Oro → Manila. 24/10: Manila → Abu Dhabi → Madrid.'},'21:55');
    a.flightTask='return-itinerary';departureDay.activities.push(a);
  }
})();
function renderFlightSection(day){
  if(!day||day.date!=='2026-10-23')return '';
  return `<section class="flight-section"><div class="section-head"><h2>✈ ${t('flights.return')}</h2><span>23–24 Oct</span></div><div class="card flight-card">${TRIP_FLIGHTS.return.map(f=>`<div class="flight-row"><strong>${f.date.slice(8,10)}/${f.date.slice(5,7)} · ${f.from} → ${f.to}</strong><span>${f.depart} → ${f.arrive}</span></div>`).join('')}<a class="action primary" target="_blank" rel="noopener" href="${FLIGHT_MANAGE_URL}">↗ ${t('flights.manage')}</a></div></section>`;
}
