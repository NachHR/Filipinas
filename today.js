/* V8.4 — Today context and pre-trip flight check-in reminder. */
const TODAY_TRIP_START='2026-09-28';
const TODAY_TRIP_END='2026-10-23';
const TODAY_FLIGHT_DEPARTURE='2026-09-27';
const TODAY_CHECKIN_HOURS=48;

(function bootToday(){
  const iso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  const dayNumber=(value,start)=>Math.floor((Date.parse(`${value}T12:00:00`)-Date.parse(`${start}T12:00:00`))/86400000)+1;
  const now=iso();
  const selected=now<TODAY_TRIP_START?1:now>TODAY_TRIP_END?tripData.days.length:dayNumber(now,TODAY_TRIP_START);
  localStorage.setItem('selectedDay',String(Math.max(1,Math.min(tripData.days.length,selected))));
})();

function todayIso(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function todayPhase(){const now=todayIso();if(now<TODAY_TRIP_START)return 'before';if(now>TODAY_TRIP_END)return 'after';return 'during'}
function todayDaysBetween(from,to){return Math.round((Date.parse(`${to}T12:00:00`)-Date.parse(`${from}T12:00:00`))/86400000)}
function todayCheckinDate(){const departure=new Date(`${TODAY_FLIGHT_DEPARTURE}T12:00:00`);departure.setHours(departure.getHours()-TODAY_CHECKIN_HOURS);return `${departure.getFullYear()}-${String(departure.getMonth()+1).padStart(2,'0')}-${String(departure.getDate()).padStart(2,'0')}`}
function todayFormatDate(iso){return new Intl.DateTimeFormat(state.lang==='es'?'es-ES':'en-US',{weekday:'long',day:'numeric',month:'long'}).format(new Date(`${iso}T12:00:00`))}
function todayShortDate(iso){return new Intl.DateTimeFormat(state.lang==='es'?'es-ES':'en-US',{day:'numeric',month:'long'}).format(new Date(`${iso}T12:00:00`))}
function todayLabels(){return state.lang==='es'?{
  today:'HOY',pre:'Preparación del viaje',beforeTitle:'El viaje comienza el',days:'días',checkin:'Check-in del vuelo',available:'Puedes hacer el check-in',notYet:'El check-in estará disponible',already:'El check-in debería estar disponible',beforeRule:'48 h antes de la salida',departure:'Salida del primer vuelo',viewDay:'Ver Día 1',previous:'Anterior',next:'Siguiente',backToday:'Volver a hoy',finished:'El viaje terminó el',viewLast:'Ver último día',during:'Día de viaje',progress:'Progreso'
}:{today:'TODAY',pre:'Trip preparation',beforeTitle:'The trip starts on',days:'days',checkin:'Flight check-in',available:'You can check in',notYet:'Check-in will be available',already:'Check-in should be available',beforeRule:'48 hours before departure',departure:'First flight departure',viewDay:'View Day 1',previous:'Previous',next:'Next',backToday:'Back to today',finished:'The trip ended on',viewLast:'View last day',during:'Travel day',progress:'Progress'}}
function todayContext(){
  const phase=todayPhase(),l=todayLabels(),now=todayIso(),checkin=todayCheckinDate();
  if(phase==='before'){
    const daysToTrip=todayDaysBetween(now,TODAY_TRIP_START),daysToCheckin=todayDaysBetween(now,checkin);
    const checkinMessage=daysToCheckin>0?`${l.notYet} ${todayShortDate(checkin)} · ${l.beforeRule}.`:daysToCheckin===0?`${l.available} ${l.beforeRule}.`:`${l.already} · ${l.beforeRule}.`;
    return `<section class="today-context today-before"><div class="today-context-head"><span class="today-badge">${l.today}</span><span>${l.pre}</span></div><h2>${l.beforeTitle} ${todayFormatDate(TODAY_TRIP_START)}</h2><p class="today-lead">${daysToTrip} ${l.days}</p><div class="today-checkin"><div><div class="today-label">✈ ${l.checkin}</div><strong>${todayShortDate(checkin)}</strong><p>${checkinMessage}</p></div><div class="today-countdown">${daysToCheckin>0?`${daysToCheckin} ${l.days}`:l.available}</div></div><div class="today-meta">${l.departure}: <strong>${todayShortDate(TODAY_FLIGHT_DEPARTURE)}</strong></div><button class="action primary today-action" data-today-action="first" type="button">${l.viewDay}</button></section>`;
  }
  if(phase==='after'){
    return `<section class="today-context today-after"><div class="today-context-head"><span class="today-badge">${l.today}</span><span>${l.pre}</span></div><h2>${l.finished} ${todayFormatDate(TODAY_TRIP_END)}</h2><p class="today-lead">${l.viewLast}</p><button class="action primary today-action" data-today-action="last" type="button">${l.viewLast}</button></section>`;
  }
  const current=todayIso(),day=tripData.days.find(d=>d.date===current)||todayDay(),index=tripData.days.findIndex(d=>d.id===day.id),prev=tripData.days[index-1],next=tripData.days[index+1];
  const completed=day.activities.filter(a=>getActivityDone(day.id,a)).length,total=day.activities.length,pct=total?Math.round(completed/total*100):0;
  return `<section class="today-context today-during"><div class="today-context-head"><span class="today-badge">${l.today}</span><span>${l.during}</span></div><h2>${tr(day.title)}</h2><div class="today-meta">${todayFormatDate(day.date)} · ${tr(day.location)}</div><div class="today-progress"><span>${l.progress}: ${completed}/${total} · ${pct}%</span><div class="today-progress-line"><i style="width:${pct}%"></i></div></div><div class="today-nav"><button class="action" data-today-action="prev" ${prev?'':'disabled'}>← ${l.previous}</button><button class="action primary" data-today-action="today">${l.backToday}</button><button class="action" data-today-action="next" ${next?'':'disabled'}>${l.next} →</button></div></section>`;
}
function renderTodayContext(){const content=document.querySelector('#dayContent');if(!content)return;document.querySelector('#todayContext')?.remove();content.insertAdjacentHTML('afterbegin',`<div id="todayContext">${todayContext()}</div>`);document.querySelectorAll('[data-today-action]').forEach(button=>button.addEventListener('click',()=>{const action=button.dataset.todayAction;if(action==='first')selectDay(1);if(action==='last')selectDay(tripData.days[tripData.days.length-1].id);if(action==='today'){const d=tripData.days.find(x=>x.date===todayIso())||todayDay();selectDay(d.id)}if(action==='prev'){const d=tripData.days.find(x=>x.date===todayIso())||todayDay(),i=tripData.days.findIndex(x=>x.id===d.id);if(i>0)selectDay(tripData.days[i-1].id)}if(action==='next'){const d=tripData.days.find(x=>x.date===todayIso())||todayDay(),i=tripData.days.findIndex(x=>x.id===d.id);if(i<tripData.days.length-1)selectDay(tripData.days[i+1].id)}}))}

window.addEventListener('load',()=>{
  const originalRenderDay=window.renderDay;
  if(typeof originalRenderDay==='function'){
    window.renderDay=function(id){originalRenderDay(id);renderTodayContext()};
    renderDay(state.selectedDay);
  }
  document.querySelector('#todayButton')?.addEventListener('click',()=>{if(todayPhase()==='after')selectDay(tripData.days[tripData.days.length-1].id)});
});
