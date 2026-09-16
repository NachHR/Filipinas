# Changelog

## V8.5.1 — 2026-09-16
- Corregido el modelo de check-in: la **IDA** y la **VUELTA** tienen ventanas de check-in independientes.
- **Check-in IDA:** 48 horas antes del primer vuelo de ida, Madrid (MAD) → Abu Dhabi (AUH), 26/09/2026 21:50. Apertura: **24/09/2026 21:50**.
- **Check-in VUELTA:** 48 horas antes del primer vuelo de vuelta, Cagayan de Oro (CGY) → Manila (MNL), 23/10/2026 21:55. Apertura: **21/10/2026 21:55**.
- Manteniendo el localizador `8V4RGE` y los horarios reales de todos los tramos.
- Corregida la versión visible en la esquina inferior derecha: ahora muestra **V8.5.1**, coincidiendo con la versión publicada.
- Actualizado el cache-busting y el Service Worker a `v8-5-1`.
- README actualizado para identificar explícitamente **V8.5.1** como versión publicada.

## V8.5 — 2026-09-16
- Nueva pantalla de **Presupuesto** con resumen de presupuesto total, gastado, disponible y porcentaje consumido.
- Añadido cálculo de **presupuesto disponible por día restante** durante el viaje.
- Registro de gastos con concepto, importe, categoría y fecha.
- Añadidas categorías: transporte, alojamiento, comida, actividades, transporte local, compras y otros.
- Los gastos pueden editarse y eliminarse.
- Añadido resumen del gasto por categorías.
- El panel muestra los gastos asociados al día seleccionado.
- Compatibilidad/migración automática con gastos registrados en versiones anteriores.
- Datos de presupuesto y gastos almacenados exclusivamente en el dispositivo mediante `localStorage`.
- Nueva capa aislada `budget.js` + `budget.css`.
- Service Worker actualizado a `filipinas-v8-5-0` e incorpora los nuevos recursos.
- Actualizados `index.html` y cache-busting a `v8.5`.
- README actualizado para documentar la funcionalidad actual.

## V8.4.2 — 2026-09-16
- Corregido el modelo de check-in: todos los vuelos forman parte de la misma reserva y el check-in se muestra únicamente como una acción conjunta.
- El check-in se calcula exclusivamente **48 horas antes del primer vuelo**, que sale de Madrid el **26 de septiembre de 2026 a las 21:50**; apertura: **24 de septiembre de 2026 a las 21:50**.
- Eliminadas las fechas de check-in individuales de los demás tramos.
- Clarificadas visualmente las fechas de todos los vuelos mediante bloques separados de **IDA** y **VUELTA**.
- Manteniendo el localizador `8V4RGE` y todos los horarios reales proporcionados.
- Actualizada la versión visible y el cache-busting a `v8.4.2`.

## V8.4.1 — 2026-09-16
- Actualizados los datos reales de vuelos de ida y vuelta en **Hoy**.
- Añadido el localizador aéreo `8V4RGE`.
- Ida: 26 sep MAD 21:50 → AUH 06:45 (+1); 27 sep AUH 21:45 → MNL 11:05 (+1); 28 sep MNL 16:15 → CGY 17:55.
- Vuelta: 23 oct CGY 21:55 → MNL 23:30; 24 oct MNL 05:50 → AUH 10:50; 24 oct AUH 14:05 → MAD 19:40.

## V8.4.0 — 2026-09-16
- Convertido **Hoy** en un contexto dinámico que distingue entre preparación, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás hasta el 28 de septiembre y acceso al Día 1.
- Durante el viaje, identifica el día actual, muestra progreso y permite navegación anterior/siguiente.
- Después del viaje, mantiene acceso al último día.
- Nueva responsabilidad aislada en `today.js` y `today.css`.

## V8.3.0 — 2026-09-16
- Reorganización de la cabecera móvil, menú lateral, estado online/offline, actualización PWA, shortcuts y mejoras del Service Worker.

## V8.2.1 — 2026-09-15
- Corrección de la capa fotográfica local y de las referencias a `tripData`.

## V8.2.0 — 2026-09-15
- Migración definitiva de las fotografías a `images/` y eliminación de dependencias externas de imágenes.

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
