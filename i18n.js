/* V8.6.1 — Shared translation helpers. No MutationObserver: changing <html lang> must never trigger a render loop. */
const I18N={
  es:{menuOpen:'Abrir menú',menuClose:'Cerrar',connection:'Conexión',footer:'Creado con la ayuda de ChatGPT',diary:'Diario de viaje',manage:'Gestionar reserva',checkin:'Hacer check-in',flight:'Vuelo',returnFlights:'Vuelos de vuelta',returnCheckin:'Check-in de vuelta',checkinRule:'48 h antes del primer vuelo de vuelta',openManage:'Gestionar reserva en Etihad',tripEnded:'El viaje ha terminado'},
  en:{menuOpen:'Open menu',menuClose:'Close',connection:'Connection',footer:'Created with the help of ChatGPT',diary:'Travel diary',manage:'Manage booking',checkin:'Check in',flight:'Flight',returnFlights:'Return flights',returnCheckin:'Return check-in',checkinRule:'48 hours before the first return flight',openManage:'Manage booking on Etihad',tripEnded:'The trip has ended'}
};
function T(key){return I18N[state?.lang||'es']?.[key]??I18N.es[key]??key}
function applyShellTranslations(){
  const lang=state?.lang||'es';
  if(document.documentElement.lang!==lang)document.documentElement.lang=lang;
  const map={menuButton:T('menuOpen'),closeMenu:T('menuClose'),connectionStatus:T('connection'),menuConnection:T('connection'),footerCredit:T('footer'),budgetDialogTitle:lang==='es'?'Presupuesto':'Budget',budgetDialogHelp:lang==='es'?'Cambia aquí el presupuesto total del viaje. Se guarda en este dispositivo.':'Change the total trip budget here. It is saved on this device.',budgetDialogLabel:lang==='es'?'Presupuesto total (PHP)':'Total trip budget (PHP)'};
  Object.entries(map).forEach(([id,text])=>{const el=document.getElementById(id);if(el&&el.textContent!==text)el.textContent=text});
  document.getElementById('closeMenu')?.setAttribute('aria-label',T('menuClose'));
  document.getElementById('menuButton')?.setAttribute('aria-label',T('menuOpen'));
  const cancel=document.querySelector('#budgetDialog .dialog-actions button[value="cancel"]');
  const save=document.getElementById('saveBudgetButton');
  if(cancel){const text=lang==='es'?'Cancelar':'Cancel';if(cancel.textContent!==text)cancel.textContent=text}
  if(save){const text=lang==='es'?'Guardar':'Save';if(save.textContent!==text)save.textContent=text}
}
window.addEventListener('load',applyShellTranslations);
