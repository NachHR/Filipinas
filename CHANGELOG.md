# Changelog

## V8.6.0 — 2026-09-16
- Iniciada la segmentación progresiva de la arquitectura sin introducir un framework ni reescribir de forma destructiva el núcleo existente.
- Añadido `flights.js` como módulo independiente para datos de vuelos y lógica de check-in.
- Añadido `i18n.js` como capa común para traducciones de interfaz y shell.
- Añadido `v86.js` como puente temporal de compatibilidad para nuevas funciones mientras continúa la segmentación de `script.js`.
- Añadido el **check-in de vuelta** como actividad real del Día 24, con acceso a la página oficial de gestión de reserva de Etihad.
- Añadida la secuencia completa de vuelos de vuelta al Día 26 y un resumen específico de la vuelta a Madrid.
- Eliminadas las referencias de reserva del código público de la sección de vuelos.
- Mejorado el botón **Hoy** de la cabecera: antes del viaje lleva al Día 1, durante el viaje lleva al día actual y después del viaje lleva al último día.
- Sustituido el icono decorativo de la cabecera por una bandera circular de Filipinas.
- Actualizado el README para eliminar el identificador de reserva y documentar las nuevas reglas de privacidad y arquitectura.
- Actualizado el Service Worker y el cache-busting a `v8-6-0`.

## V8.5.1 — 2026-09-16
- Corregido el modelo de check-in: la **IDA** y la **VUELTA** tienen ventanas de check-in independientes.
- **Check-in IDA:** 48 horas antes del primer vuelo de ida.
- **Check-in VUELTA:** 48 horas antes del primer vuelo de vuelta.
- Corregida la versión visible en la esquina inferior derecha.
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

## V8.4.2 — 2026-09-16
- Corregido el modelo de check-in y clarificadas visualmente las fechas de todos los vuelos mediante bloques separados de **IDA** y **VUELTA**.

## V8.4.1 — 2026-09-16
- Actualizados los datos reales de vuelos de ida y vuelta en **Hoy**.

## V8.4.0 — 2026-09-16
- Convertido **Hoy** en un contexto dinámico que distingue entre preparación, viaje en curso y viaje terminado.

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
