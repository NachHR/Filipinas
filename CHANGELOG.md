# Changelog

## V8.6.2 — 2026-09-16
- Corregido el cambio de idioma ES/EN para que actualice navegación y contenido de forma controlada.
- Eliminado el `MutationObserver` de traducción que podía provocar ciclos de renderizado y consumo excesivo de RAM.
- Restaurados los iconos visuales **☰** y **×** del menú lateral.
- Restaurado el indicador de conexión **online/offline** con piloto de estado.
- Mejorado el espaciado vertical entre los botones de gestión de Etihad y **Ver Día 1** en la preparación del viaje.
- Alineada la actividad de checkout del último día con el alojamiento: **23 de octubre antes de las 12:00**.
- Actualizado el Service Worker y el cache-busting a `v8-6-2`.

## V8.6.1 — 2026-09-16
- Eliminado el observador permanente del atributo `lang` para evitar ciclos de traducción/renderizado.
- Ajustada la caché PWA para distribuir la corrección de estabilidad.

## V8.6.0 — 2026-09-16
- Iniciada la segmentación progresiva de la arquitectura sin introducir un framework ni reescribir de forma destructiva el núcleo existente.
- Añadido `flights.js` como módulo independiente para datos de vuelos y lógica de check-in.
- Añadido `i18n.js` como capa común para traducciones de interfaz y shell.
- Añadido `v86.js` como puente temporal de compatibilidad.
- Añadido el check-in de vuelta como actividad real del Día 24.
- Añadida la secuencia completa de vuelos de vuelta.
- Eliminadas referencias de reserva del código público de vuelos.
- Mejorado el botón **Hoy**.
- Añadida la bandera circular de Filipinas en la cabecera.
- Actualizado el README con las nuevas reglas de privacidad y arquitectura.
- Actualizado el Service Worker y cache-busting a `v8-6-0`.

## V8.5.1 — 2026-09-16
- Corregido el modelo de check-in: IDA y VUELTA tienen ventanas independientes.
- Corregida la versión visible y el cache-busting.

## V8.5 — 2026-09-16
- Nueva pantalla de presupuesto y registro local de gastos.
- Añadidas categorías, edición, eliminación y resumen por categorías.
- Añadida migración automática del formato anterior.

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
