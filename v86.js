/* V8.6.1 — Safe compatibility layer. Patches are installed once and never observe the DOM continuously. */
(function(){
  function patchDayRenderer(){
    if(typeof window.renderDay!=='function'||window.renderDay.__v861)return;
    const original=window.renderDay;
    const wrapped=function(id){
      original(id);
      const day=typeof dayById==='function'?dayById(id):tripData.days.find(d=>d.id===id);
      const content=document.querySelector('#dayContent');
      if(content&&typeof renderFlightSection==='function'){
        content.querySelector('.flight-section')?.remove();
        const html=renderFlightSection(day);
        if(html)content.insertAdjacentHTML('beforeend',html);
      }
      if(typeof applyShellTranslations==='function')applyShellTranslations();
    };
    wrapped.__v861=true;
    window.renderDay=wrapped;
  }
  function bindToday(){
    const b=document.getElementById('todayButton');
    if(!b||b.__v861)return;
    b.__v861=true;
    b.addEventListener('click',()=>{
      const d=typeof todayDay==='function'?todayDay():tripData.days[0];
      if(typeof selectDay==='function')selectDay(d.id);
      else window.scrollTo({top:0,behavior:'smooth'});
    });
  }
  window.addEventListener('load',()=>{
    patchDayRenderer();
    bindToday();
    if(typeof applyShellTranslations==='function')applyShellTranslations();
  },{once:true});
})();
