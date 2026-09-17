# Changelog

## Mantenimiento documental — 2026-09-17

- Confirmados el merge del PR #1 (`3bb4ccd`, 16/09/2026), el despliegue satisfactorio de Pages y la versión V8.8.0 servida.
- README y PROJECT_MASTER pasan de estado de revisión a versión publicada; se retiran los bloqueos de publicación ya superados.
- Actualizado el registro QA: prueba y merge comunicados por el propietario, 11 pruebas automatizadas repetidas y comprobación HTTP de recursos publicados. No se atribuyen al propietario verificaciones específicas que no detalló.
- Completada la documentación de privacidad, almacenamiento y actualización del diario, así como las reglas para cambios documentales y futuras publicaciones.
- Revisión de 50 archivos versionados y 176 referencias de imágenes en el modelo compuesto: sin temporales versionados ni imágenes inexistentes tras aplicar `photos.js`. Se documenta la capa fotográfica heredada; no se eliminan archivos utilizados ni se modifica el comportamiento de la app.
- Se mantienen V8.8.0, caché `filipinas-v8-8-0`, migración `8.7` y todos los datos del viaje.

## V8.8.0 — 2026-09-16 · Publicada

- Probada por el propietario, fusionada mediante [PR #1](https://github.com/NachHR/Filipinas/pull/1) y [desplegada en GitHub Pages](https://github.com/NachHR/Filipinas/actions/runs/35145442952).

- Añadido diario personal por fecha ISO para los 29 días, con autoguardado inmediato, última edición y funcionamiento local/offline.
- Tratamiento del texto como texto plano; no se envía ni sincroniza. Los errores de almacenamiento muestran aviso y conservan un borrador en memoria; los esquemas corruptos o desconocidos no se sobrescriben.
- Incorporados `documentary-data.js`, `documentary.js`, `journal.js` y `field-notes.css`; `script.js` sigue como coordinador.
- Guía rápida ES/EN con preset, excepción y seguridad por día; técnica y checklist plegables. El contenido documental permanece de solo lectura.
- Cebú, días 18–24: `editorial-proposal`, sin modificar actividades pendientes ni confirmar reservas.
- Notas y guía bajo el contexto Hoy; acceso rápido desde el botón existente, sin nuevos controles en la cabecera.
- Renombrado el control a Mostrar/Ocultar rodaje. Ya no oculta presupuesto, diario, galería ni POIs.
- Checklist heredada preservada, incluyendo clave `macro`; etiquetas y pautas corregidas a detalle desde 0,4 m, sin macro real. Advertencia expresa de no introducir la Action 4 en aguas termales.
- Eliminados el adaptador de traducción `L()` sin uso y el antiguo render/formulario de presupuesto sustituido por `budget.js`; movido el render documental fuera del coordinador.
- Cache-busting y badge `8.8.0`; caché `filipinas-v8-8-0` incluye nuevos módulos. Worker con activación explícita, precarga evitando caché HTTP y limpieza solo de cachés de esta app.
- Se mantienen el identificador de migración `8.7`, fechas, vuelos, check-ins y datos de gastos/progreso existentes.
- Añadidas 11 pruebas automatizadas de regresión y guía de QA manual; README y PROJECT_MASTER actualizados. La implementación se entregó inicialmente en borrador; la validación del propietario y el despliegue posterior constan en el registro QA.

## V8.7.1 — 2026-09-16
- Sustituido el placeholder genérico `images/airport.webp` de los días internacionales por fotografías locales específicas.
- Madrid salida y regreso utilizan `images/madrid-barajas.webp`.
- Abu Dhabi utiliza `images/zayed-airport.webp` como portada y añade `images/sheikh-zayed-mosque.webp` a la galería.
- El POI Sheikh Zayed Grand Mosque utiliza su fotografía específica.
- Pearl Lounge utiliza la fotografía de Zayed International Airport como contexto visual.
- Añadidas las tres nuevas fotografías a la caché offline del Service Worker.
- Service Worker actualizado a `filipinas-v8-7-1` y cache-busting actualizado a `v=8.7.1`.
- Badge visible y README sincronizados con la versión publicada V8.7.1.
- `PHOTO-CREDITS.md` actualizado con las nuevas fotografías y sus fuentes de Wikimedia Commons.
- Se mantiene intacto el identificador de migración de V8.7 para evitar una segunda renumeración de datos locales.
- Verificado que siguen existiendo dos check-ins independientes: IDA 24/09 21:50 y VUELTA 21/10 21:55.

## V8.7 — 2026-09-16
- Ampliado el viaje de **26 a 29 días**, cubriendo ahora el recorrido completo desde Madrid el 26/09 hasta Madrid el 24/10.
- Añadido **Día 1 · Madrid → Abu Dhabi** con llegada a Barajas y vuelo MAD → AUH.
- Añadido **Día 2 · escala larga en Abu Dhabi** con dos alternativas: visita opcional a Abu Dhabi / Gran Mezquita Sheikh Zayed o descanso en el aeropuerto.
- Integrado **Pearl Lounge** en Terminal A como actividad real previa al vuelo AUH → MNL, con comida, ducha, descanso y comprobación/compra del acceso desde Revolut.
- Añadido recordatorio de estancia estándar máxima de 3 h para Pearl Lounge y enlace a su información oficial.
- Ampliado el 28/09 con llegada a Manila, conexión internacional → doméstica y vuelo MNL → CGY antes de la llegada a CDO.
- Añadido **Día 29 · regreso a Madrid** con MNL → AUH, conexión en Abu Dhabi, AUH → MAD y llegada final a las 19:40.
- Los 26 días anteriores se renumeran automáticamente como **Días 3–28** sin alterar sus fechas reales.
- Añadido `journey.js` como capa de composición del itinerario puerta a puerta, manteniendo `data.js` como núcleo del recorrido original en Filipinas.
- Implementada migración local de una sola ejecución para conservar día seleccionado, gastos, checklist de grabación y actividades completadas tras la renumeración `+2`.
- Actualizado **Hoy / Today** al rango completo 26/09–24/10.
- Actualizado el presupuesto al rango completo y a 29 días restantes antes del viaje.
- Añadidas nuevas localizaciones de navegación para salida de Madrid, escala en Abu Dhabi y regreso a Madrid.
- Madrid, Abu Dhabi y regreso reutilizan temporalmente `images/airport.webp` hasta incorporar fotografías específicas.
- `journey.js` añadido al app shell offline.
- Service Worker actualizado a `filipinas-v8-7-0` y cache-busting actualizado a `v=8.7.0`.
- README actualizado con la nueva arquitectura, migración y cronología puerta a puerta.
- Revisadas referencias a versiones y módulos antiguos para mantener el repositorio limpio.

## V8.6.4 — 2026-09-16
- Refactorizada por completo la arquitectura de idioma y renderizado de la aplicación.
- `i18n.js` pasa a ser la única fuente de verdad para textos de interfaz ES/EN.
- Añadidos `setLanguage()` y `toggleLanguage()` como única ruta para cambiar `state.lang`.
- Eliminado el segundo listener del botón ES/EN que provocaba cambios dobles ES → EN → ES.
- Eliminadas las traducciones destructivas sobre `menuButton`, `closeMenu` y contenedores de conexión.
- Los botones de menú mantienen siempre **☰** y **×**; solo se traduce su `aria-label`.
- `script.js` vuelve a ser el único coordinador de `renderDay()`.
- `today.js` y `budget.js` dejan de envolver `window.renderDay` y pasan a ser módulos de render puros.
- Eliminados los archivos temporales `v86.js` y `v862.js`.
- `flights.js` usa ahora acciones externas dedicadas para Etihad en lugar de simular botones de Maps/Directions.
- Corregida la etiqueta `Siguiente / Next` del contexto Hoy.
- Añadida traducción de valores residuales procedentes de `data.js`, como `Mañana`, `Tarde`, `Pendiente`, `Antes de las 11:00`, `Después de 14:00` y títulos `Día / Day`.
- Cabecera, navegación, presupuesto, vuelos, contexto Hoy, metadatos HTML y accesibilidad se sincronizan en un único render al cambiar de idioma.
- Manifest PWA convertido a formato bilingüe/neutro para evitar una instalación exclusivamente española.
- Service Worker actualizado a `filipinas-v8-6-4` y limpiado de referencias a archivos eliminados.
- README actualizado con la nueva arquitectura y responsabilidades de módulos.

## V8.6.3 — 2026-09-16
- Corregido el cambio de idioma de la shell: **Hoy/Today**, navegación del menú, presupuesto, instalación y navegación por ubicaciones/días se regeneran con el idioma activo.
- Los controles visuales de abrir/cerrar el menú mantienen **☰** y **×** y traducen su etiqueta de accesibilidad.
- Restaurado el estado de conexión en tiempo real mediante `navigator.onLine` y los eventos `online` / `offline`.
- Añadido piloto verde cuando hay conexión y rojo cuando no la hay.
- Mejorado el espaciado de las acciones de Etihad y **Ver Día 1**.
- Actualizado el Service Worker y cache-busting a `v8-6-3`.

## V8.6.2 — 2026-09-16
- Eliminado el `MutationObserver` de traducción que podía provocar ciclos de renderizado y consumo excesivo de RAM.
- Restaurados los iconos visuales del menú lateral y el indicador de conexión.

## V8.6.1 — 2026-09-16
- Eliminado el observador permanente del atributo `lang`.
- Ajustada la caché PWA para distribuir la corrección de estabilidad.

## V8.6.0 — 2026-09-16
- Iniciada la segmentación progresiva de la arquitectura sin framework.
- Añadidos módulos independientes para vuelos, contexto Hoy, presupuesto y traducción.
- Añadido el check-in de vuelta como actividad real.
- Añadida la secuencia completa de vuelos de vuelta.
- Eliminadas referencias de reserva del código público de vuelos.
- Mejorado el botón Hoy.
- Añadida la bandera circular de Filipinas.

## V8.5.1 — 2026-09-16
- Corregido el modelo de check-in: IDA y VUELTA tienen ventanas independientes.

## V8.5 — 2026-09-16
- Nueva pantalla de presupuesto y registro local de gastos.
- Añadidas categorías, edición, eliminación y resumen por categorías.

## V8.4.2 — 2026-09-16
- Clarificadas las fechas de vuelos mediante bloques separados de IDA y VUELTA.

## V8.4.1 — 2026-09-16
- Actualizados los datos reales de vuelos de ida y vuelta en Hoy.

## V8.4.0 — 2026-09-16
- Convertido Hoy en un contexto dinámico.

## V8.3.0 — 2026-09-16
- Reorganización de cabecera móvil, menú lateral, estado online/offline, actualización PWA y shortcuts.

## V8.2.1 — 2026-09-15
- Corrección de la capa fotográfica local y referencias a `tripData`.

## V8.2.0 — 2026-09-15
- Migración definitiva de fotografías a `images/`.

## V8.1.1 — 2026-09-15
- Corrección de imágenes SVG decorativas heredadas.

## V8.1 — 2026-09-15
- Fotografías auténticas de destinos y POIs.

## V8
- Fotografías de destinos, correcciones de carga y compatibilidad con GitHub Pages.

## V7
- Revisión de imágenes, presupuesto y sección documental.

## V6
- Mejoras de navegación, itinerario y almacenamiento local.

## V5
- Consolidación del itinerario y navegación por días.

## V4
- POIs, mapas y notas.

## V3
- Diario y seguimiento del viaje.

## V2
- Evolución hacia aplicación web móvil.

## V1
- Primera versión del diario/itinerario.
