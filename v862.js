/* V8.6.2 — Stable UI patch. Rebinds language/connection controls without observers or render loops. */
(function(){
  function connection(){
    const online=navigator.onLine;
    document.querySelectorAll('#connectionStatus,#menuConnection').forEach(el=>{
      el.classList.toggle('online',online);el.classList.toggle('offline',!online);
      const dot=el.querySelector('i');if(dot)dot.setAttribute('aria-hidden','true');
    });
    const top=document.querySelector('#connectionStatus span');if(top)top.textContent=online?'Online':(state.lang==='es'?'Sin conexión':'Offline');
    const menu=document.querySelector('#menuConnection span');if(menu)menu.textContent=state.lang==='es'?'Conexión':'Connection';
  }
  function translate(){
    if(typeof applyShellTranslations==='function')applyShellTranslations();
    if(typeof renderLocationNav==='function')renderLocationNav();
    if(typeof renderDayNav==='function')renderDayNav();
    if(typeof renderDay==='function')renderDay(state.selectedDay);
    connection();
  }
  function language(){
    const old=document.getElementById('languageToggle');if(!old||old.__v862)return;
    const fresh=old.cloneNode(true);fresh.__v862=true;old.replaceWith(fresh);
    fresh.addEventListener('click',()=>{
      state.lang=state.lang==='es'?'en':'es';
      persist();
      translate();
    });
  }
  function icons(){
    const menu=document.getElementById('menuButton');
    if(menu){menu.textContent='☰';menu.setAttribute('aria-label',T('menuOpen'));}
    const close=document.getElementById('closeMenu');
    if(close){close.textContent='×';close.setAttribute('aria-label',T('menuClose'));}
    document.querySelectorAll('#budgetDialog .section-head > .icon-button').forEach(b=>b.textContent='×');
  }
  function checkout(){
    const day=tripData.days.find(d=>d.date==='2026-10-23');
    const a=tripData.meta.accommodations?.['return-cdo'];
    if(!day||!a)return;
    day.activities.forEach(act=>{
      const title=String(act.title?.es||'').toLowerCase(),desc=String(act.description?.es||'').toLowerCase();
      if(title.includes('checkout')||title.includes('check-out')||title.includes('check out')||desc.includes('confirmar fechas de checkout')){
        act.description={es:'Check-out del alojamiento antes de las 12:00.',en:'Check out of the accommodation before 12:00.'};
        act.notes={es:'El alojamiento indica check-out el 23 de octubre antes de las 12:00.',en:'The accommodation states check-out on 23 October before 12:00.'};
      }
    });
  }
  function spacing(){
    const s=document.createElement('style');s.textContent='.today-before .today-action{display:block;width:100%;margin-top:14px}.today-before .today-action + .today-action{margin-top:10px}.today-before .today-action{padding-top:11px;padding-bottom:11px}';document.head.appendChild(s);
  }
  window.addEventListener('online',connection);window.addEventListener('offline',connection);
  window.addEventListener('load',()=>{checkout();language();icons();spacing();connection();});
})();
