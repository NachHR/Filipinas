/* V8.6.4 — Single source of truth for all interface translations. */
const I18N={
  es:{
    app:{title:'Filipinas · Diario de viaje',brand:'FILIPINAS',subtitle:'Diario de viaje',description:'Diario e itinerario bilingüe de viaje por Filipinas.',flagAlt:'Bandera de Filipinas',footerYear:'Filipinas · 2026'},
    shell:{nav:'Navegación',today:'Hoy',install:'Instalar aplicación',budget:'Presupuesto',itinerary:'Solo itinerario',documentary:'Modo documental',menuOpen:'Abrir menú',menuClose:'Cerrar',dayNav:'Navegación por días',footer:'Creado con la ayuda de ChatGPT',cancel:'Cancelar',save:'Guardar'},
    connection:{online:'Conectado',offline:'Desconectado'},
    status:{planned:'Planificado',pending:'Pendiente',done:'Hecho',optional:'Opcional'},
    day:{day:'Día',poi:'Puntos de interés',recording:'Grabación',gallery:'Galería',notes:'Nota',transport:'Transporte',maps:'Google Maps',directions:'Cómo llegar',duration:'Duración',theme:'Tema',plans:'Planos clave',tech:'Nota técnica',narration:'Narración',check:'Checklist de grabación',progress:'Progreso',estimate:'Estimado',spent:'Gastado',remaining:'Restante',optional:'Opcional',todayBanner:'HOY',accommodation:'Alojamiento',booking:'Reserva',totalBudget:'Presupuesto total',editBudget:'Modificar presupuesto',savedDevice:'Se guarda en este dispositivo',thisDay:'este día',trip:'viaje',generalGuidelines:'Pautas generales',noExpenses:'Sin gastos registrados todavía.',newVersion:'Nueva versión disponible',update:'Actualizar'},
    budget:{title:'Presupuesto',total:'Presupuesto total',spent:'Gastado',remaining:'Disponible',daily:'Disponible por día restante',add:'Añadir gasto',detail:'Concepto',amount:'Importe',category:'Categoría',date:'Fecha',save:'Guardar gasto',cancel:'Cancelar',edit:'Editar',delete:'Eliminar',recent:'Gastos',none:'Todavía no hay gastos registrados.',categories:'Por categorías',days:'días restantes',editing:'Editando gasto',update:'Actualizar gasto',help:'Cambia aquí el presupuesto total del viaje. Se guarda en este dispositivo.',label:'Presupuesto total (PHP)'},
    today:{today:'HOY',pre:'Preparación del viaje',after:'Viaje finalizado',start:'El viaje comienza el',days:'días',checkin:'Check-in de vuelos',outCheck:'Check-in IDA',returnCheck:'Check-in VUELTA',outRule:'48 h antes del primer vuelo de ida',returnRule:'48 h antes del primer vuelo de vuelta',view:'Ver Día 1',during:'Día de viaje',progress:'Progreso',previous:'Anterior',next:'Siguiente',back:'Volver a hoy',finished:'El viaje terminó el',last:'Ver último día',outbound:'IDA',inbound:'VUELTA',nextDay:'+1',manage:'Gestionar reserva en Etihad'},
    flights:{return:'Vuelos de vuelta',manage:'Gestionar reserva en Etihad',flight:'Vuelo'},
    recording:{wide:'Plano general',macro:'Macro / detalle',static:'Plano fijo largo',slow:'Cámara lenta',timelapse:'Timelapse / hyperlapse',sound:'Sonido ambiente',transition:'Plano de transición'}
  },
  en:{
    app:{title:'Philippines · Travel diary',brand:'PHILIPPINES',subtitle:'Travel diary',description:'Bilingual travel diary and itinerary for the Philippines.',flagAlt:'Philippines flag',footerYear:'Philippines · 2026'},
    shell:{nav:'Navigation',today:'Today',install:'Install app',budget:'Budget',itinerary:'Itinerary only',documentary:'Documentary mode',menuOpen:'Open menu',menuClose:'Close',dayNav:'Day navigation',footer:'Created with the help of ChatGPT',cancel:'Cancel',save:'Save'},
    connection:{online:'Online',offline:'Offline'},
    status:{planned:'Planned',pending:'Pending',done:'Done',optional:'Optional'},
    day:{day:'Day',poi:'Points of interest',recording:'Filming',gallery:'Gallery',notes:'Note',transport:'Transport',maps:'Google Maps',directions:'Directions',duration:'Duration',theme:'Theme',plans:'Key shots',tech:'Technical note',narration:'Narration',check:'Filming checklist',progress:'Progress',estimate:'Estimated',spent:'Spent',remaining:'Remaining',optional:'Optional',todayBanner:'TODAY',accommodation:'Accommodation',booking:'Booking',totalBudget:'Total trip budget',editBudget:'Edit budget',savedDevice:'Saved on this device',thisDay:'this day',trip:'trip',generalGuidelines:'General guidelines',noExpenses:'No expenses recorded yet.',newVersion:'New version available',update:'Update'},
    budget:{title:'Budget',total:'Total budget',spent:'Spent',remaining:'Remaining',daily:'Available per remaining day',add:'Add expense',detail:'Description',amount:'Amount',category:'Category',date:'Date',save:'Save expense',cancel:'Cancel',edit:'Edit',delete:'Delete',recent:'Expenses',none:'No expenses recorded yet.',categories:'By category',days:'days remaining',editing:'Editing expense',update:'Update expense',help:'Change the total trip budget here. It is saved on this device.',label:'Total trip budget (PHP)'},
    today:{today:'TODAY',pre:'Trip preparation',after:'Trip finished',start:'The trip starts on',days:'days',checkin:'Flight check-in',outCheck:'OUTBOUND check-in',returnCheck:'RETURN check-in',outRule:'48 hours before the first outbound flight',returnRule:'48 hours before the first return flight',view:'View Day 1',during:'Travel day',progress:'Progress',previous:'Previous',next:'Next',back:'Back to today',finished:'The trip ended on',last:'View last day',outbound:'OUTBOUND',inbound:'RETURN',nextDay:'+1',manage:'Manage booking on Etihad'},
    flights:{return:'Return flights',manage:'Manage booking on Etihad',flight:'Flight'},
    recording:{wide:'Wide shot',macro:'Macro / detail',static:'Long static shot',slow:'Slow motion',timelapse:'Timelapse / hyperlapse',sound:'Ambient sound',transition:'Transition shot'}
  }
};
const VALUE_I18N={
  'Mañana':'Morning','Mediodía':'Midday','Tarde':'Afternoon','Noche':'Evening','Día':'Day','Tarde/Noche':'Afternoon / evening','Tarde / Noche':'Afternoon / evening','Antes de salir':'Before leaving','Después':'Afterwards','Muy temprano':'Very early','Todo el día':'All day','Amanecer':'Sunrise','Al llegar':'On arrival','Antes del vuelo':'Before the flight','Pocos minutos':'A few minutes','Pendiente':'Pending','Flexible':'Flexible'
};
function t(path){const lang=(typeof state!=='undefined'&&state.lang==='en')?'en':'es';return path.split('.').reduce((obj,key)=>obj?.[key],I18N[lang])??path}
function localizeScalar(value){
  if(typeof value!=='string'||typeof state==='undefined'||state.lang!=='en')return value??'';
  if(VALUE_I18N[value])return VALUE_I18N[value];
  let m=value.match(/^Antes de(?: las)? (\d{1,2}:\d{2})$/);if(m)return `Before ${m[1]}`;
  m=value.match(/^Después de (\d{1,2}:\d{2})$/);if(m)return `After ${m[1]}`;
  return value.replace(/\bDía (\d+)\b/g,'Day $1');
}
function tr(value){
  if(Array.isArray(value))return value.map(localizeScalar);
  if(value&&typeof value==='object'){
    const lang=(typeof state!=='undefined'&&state.lang==='en')?'en':'es';
    return localizeScalar(value[lang]??value.es??value.en??'');
  }
  return localizeScalar(value);
}
function applyShellTranslations(){
  const lang=state.lang==='en'?'en':'es';document.documentElement.lang=lang;document.title=t('app.title');document.querySelector('meta[name="description"]')?.setAttribute('content',t('app.description'));
  const textMap={brandTitle:t('app.brand'),brandSubtitle:t('app.subtitle'),footerYear:t('app.footerYear'),navTitle:t('shell.nav'),todayButton:t('shell.today'),menuTodayText:t('shell.today'),menuBudgetText:t('shell.budget'),menuInstallText:t('shell.install'),modeLabel:state.itineraryOnly?t('shell.documentary'):t('shell.itinerary'),footerCredit:t('shell.footer'),budgetDialogTitle:t('budget.title'),budgetDialogHelp:t('budget.help'),budgetDialogLabel:t('budget.label'),budgetDialogCancel:t('budget.cancel'),saveBudgetButton:t('shell.save')};
  Object.entries(textMap).forEach(([id,text])=>{const el=document.getElementById(id);if(el)el.textContent=text});
  const toggle=document.getElementById('languageToggle');if(toggle)toggle.textContent=lang==='es'?'ES / EN':'EN / ES';
  const flag=document.getElementById('brandFlag');if(flag)flag.alt=t('app.flagAlt');
  document.getElementById('menuButton')?.setAttribute('aria-label',t('shell.menuOpen'));document.getElementById('closeMenu')?.setAttribute('aria-label',t('shell.menuClose'));document.getElementById('budgetCloseButton')?.setAttribute('aria-label',t('shell.menuClose'));document.getElementById('dayNavigation')?.setAttribute('aria-label',t('shell.dayNav'));
}
