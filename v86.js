/* V8.6 — Small compatibility layer while the legacy core is progressively segmented. */
(function(){
  function patchDayRenderer(){
    if(typeof window.renderDay!=='function'||window.renderDay.__v86)return;
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
    wrapped.__v86=true;
    window.renderDay=wrapped;
  }
  function bindToday(){
    const b=document.getElementById('todayButton');
    if(!b||b.__v86)return;
    b.__v86=true;
    b.addEventListener('click',()=>{
      const d=typeof todayDay==='function'?todayDay():tripData.days[0];
      if(typeof selectDay==='function')selectDay(d.id);
      else window.scrollTo({top:0,behavior:'smooth'});
    });
  }
  function translateDialog(){
    const en=state?.lang==='en';
    const cancel=document.querySelector('#budgetDialog .dialog-actions button[value="cancel"]');
    const save=document.getElementById('saveBudgetButton');
    if(cancel)cancel.textContent=en?'Cancel':'Cancelar';
    if(save)save.textContent=en?'Save':'Guardar';
  }
  window.addEventListener('load',()=>{
    patchDayRenderer();
    bindToday();
    translateDialog();
    if(typeof applyShellTranslations==='function')applyShellTranslations();
    if(typeof renderDay==='function')renderDay(state.selectedDay);
  });
})();
