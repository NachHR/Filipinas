# Changelog

Historial de cambios. Para el uso de la app, consulta [README](README.md); para resultados y límites de las pruebas, los [registros QA](tests/README.md).

## Mantenimiento documental — 2026-09-23

- README centrado en uso, instalación y datos personales; historial separado en este archivo.
- Créditos unificados y ordenados por archivo, conservando fuentes, atribuciones, licencias y adaptaciones relevantes.
- PROJECT_MASTER centrado en estado vigente, decisiones, arquitectura y próximos pasos; retiradas cronologías y copias de informes QA.
- Registros QA indexados y diferenciados de la documentación actual. Sin cambios de código, versión ni caché; sin nuevas pruebas funcionales.

## Corrección de contenido — 2026-09-23 · V8.12.0

- Incorporada `high-ridge.webp`, con fuente y crédito; corregidos mapa y ruta a High Ridge Resort and Restaurant.
- Actualizada la caché interna para distribuir la foto y los enlaces, conservando la versión visible. No se ejecutaron pruebas, por indicación del propietario.

## V8.12.0 — 2026-09-23

- Seis vuelos actualizados en ES/EN: números, operadores, terminales, equipaje y conexiones de Manila explícitas.
- Bungalow previsto en Campvill Riverside Car Camping para la estancia en Kisolon; retirada la búsqueda genérica de alojamiento de esos días.
- Nuevas fotos y sustituciones asociadas a sus POI, White Island separada de Camiguin y firma NachHR en el pie.
- Respuesta al pulsar botones, foco, controles táctiles y movimiento reducido; menú con Escape y navegación de teclado.
- Marcar actividades conserva la vista y revierte ante errores de guardado. Anterior/Siguiente parten del día seleccionado; Hoy evita desplazamientos simultáneos.
- Consolidado el vuelo de vuelta duplicado preservando casillas antiguas; retirados estilos obsoletos y seguimiento en URLs de alojamientos.
- Publicación y comprobaciones: [QA V8.12.0](tests/QA_V8.12.0.md).

## V8.11.0 — 2026-09-17

- Fotografías sustituidas por el propietario, conservadas en WebP reducido; nuevas fuentes y créditos documentados.
- Galería oculta en Solo itinerario y con proporciones completas en Vista completa.
- Imágenes secundarias con carga diferida y dimensiones intrínsecas; portada prioritaria.
- Corregidas asociaciones de Santo Niño y Barajas; añadidas fotos de Magellan’s Cross, Pearl Lounge y Kitanglad.
- Créditos accesibles desde el pie ES/EN y disponibles offline.
- Publicada y validada por el propietario: [QA V8.11.0](tests/QA_V8.11.0.md).

## V8.10.0 — 2026-09-17

- Iconos PWA derivados de la bandera circular; bandera superior intacta.
- Alojamiento flexible donde no hay reserva y tarea de búsqueda al iniciar cada estancia; retiradas referencias a alojamiento familiar.
- Tres tomas P1 y dos clips por fecha, con persistencia y tratamiento de errores.
- Pautas bilingües revisadas para 29 días, 16:9, ND8 contextual y Cebú condicional.
- Retirado «Ver Día 1» de Preparación; exportaciones Markdown con UTF-8+BOM.
- Validada por el propietario; comprobaciones: [QA V8.10.0](tests/QA_V8.10.0.md).

## V8.9.0 — 2026-09-17

- Exportación de todas las notas a un Markdown ordenado por día; aviso ante datos ilegibles.
- Solo itinerario oculta POI y pautas de grabación.
- Presupuesto global con gastos por día/categoría, subtotales, saldo, edición y eliminación; editor compartido con la vista diaria.
- Exportación del presupuesto completo a Markdown; tratamiento de decimales y conservación del formulario ante fallos.
- Publicada y probada por el propietario: [QA V8.9.0](tests/QA_V8.9.0.md). La lectura de caracteres exportados se corrigió en V8.10.0.

## V8.8.1 — 2026-09-17

- Lugares ordenados por primera fecha; arranque en el día actual local y navegación manual conservada.
- Presets en 16:9 y recomendaciones contextuales del ND8 polarizado en ES/EN.
- Publicada y validada por el propietario: [QA V8.8.1](tests/QA_V8.8.1.md).

## V8.8.0 — 2026-09-16

- Diario personal por fecha con autoguardado, última edición y borrador ante fallos; protección de formatos desconocidos.
- Guía documental ES/EN con preset, excepción y seguridad, detalle técnico y checklist heredada.
- Notas y guía accesibles desde Hoy; Cebú permanece como propuesta editorial.
- Control Mostrar/Ocultar rodaje, tratamiento del detalle desde 0,4 m y pautas de seguridad de cámara revisadas.
- Separados módulos documentales; eliminados adaptador de traducción y formulario de presupuesto obsoletos.
- Actualización PWA con confirmación y preservación de datos locales.
- Probada por el propietario, fusionada y publicada: [QA V8.8.0](tests/QA_V8.8.0.md).

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
