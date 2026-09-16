/* V8.6.3 — Stable shell controls. One translation path, icon-only menu controls, reliable connection state. */
(function(){
  function connection(){
    const online=navigator.onLine;
    const top=document.getElementById('connectionStatus');
    const menu=document.getElementById('menuConnection');
    [top,menu].forEach(el=>{if(!el)return;el.classList.toggle('online',online);el.classList.toggle('offline',!online)});
    const topText=top?.querySelector('span');if(topText)topText.textContent=online?'Online':(state.lang==='es'?'Desconectado':'Offline');
    const menuText=menu?.querySelector('span');if(menuText)menuText.textContent=online?'Online':(state.lang==='es'?'Desconectado':'Offline');
  }
  function icons(){
    const menu=document.getElementById('menuButton');if(menu){menu.textContent='☰';menu.setAttribute('aria-label',state.lang==='es'?'Abrir menú':'Open menu');}
    const close=document.getElementById('closeMenu');if(close){close.textContent='×';close.setAttribute('aria-label',state.lang==='es'?'Cerrar':'Close');}
    document.querySelectorAll('#budgetDialog .section-head > .icon-button').forEach(b=>b.textContent='×');
  }
  function translate(){
    state.lang=state.lang==='en'?'en':'es';
    persist();
    if(typeof applyShellTranslations==='function')applyShellTranslations();
    icons();
    if(typeof renderLocationNav==='function')renderLocationNav();
    if(typeof renderDayNav==='function')renderDayNav();
    if(typeof renderDay==='function')renderDay(state.selectedDay);
    connection();
  }
  function bindLanguage(){
    const b=document.getElementById('languageToggle');if(!b||b.__v863)return;
    b.__v863=true;b.addEventListener('click',()=>{state.lang=state.lang==='es'?'en':'es';translate()});
  }
  function checkout(){
    const day=tripData.days.find(d=>d.date==='2026-10-23');if(!day)return;
    day.activities.forEach(act=>{
      const title=String(act.title?.es||'').toLowerCase(),desc=String(act.description?.es||'').toLowerCase();
      if(title.includes('checkout')||title.includes('check-out')||title.includes('check out')||desc.includes('confirmar fechas de checkout')){
        act.description={es:'Check-out del alojamiento el 23 de octubre antes de las 12:00.',en:'Accommodation check-out on 23 October before 12:00.'};
        act.notes={es:'El alojamiento confirma check-out el 23 de octubre antes de las 12:00.',en:'The accommodation confirms check-out on 23 October before 12:00.'};
      }
    });
  }
  function spacing(){
    if(document.getElementById('v863-spacing'))return;
    const s=document.createElement('style');s.id='v863-spacing';s.textContent='.today-before .today-action{display:flex;width:100%;min-height:44px;align-items:center;justify-content:center;margin-top:14px}.today-before .today-action + .today-action{margin-top:10px}';document.head.appendChild(s);
  }
  window.addEventListener('online',connection);window.addEventListener('offline',connection);
  window.addEventListener('load',()=>{checkout();bindLanguage();icons();spacing();connection()},{once:true});
})();
