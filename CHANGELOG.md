# Changelog

## V8.6.3 — 2026-09-16
- Corregido definitivamente el cambio de idioma de la shell: **Hoy/Today**, navegación del menú, presupuesto, instalación y navegación por ubicaciones/días se regeneran con el idioma activo.
- Los controles visuales de abrir/cerrar el menú mantienen siempre **☰** y **×** y solo traducen su etiqueta de accesibilidad.
- Restaurado el estado de conexión en tiempo real mediante `navigator.onLine` y los eventos `online` / `offline`.
- Añadido estado visual inequívoco: piloto verde cuando hay conexión y rojo cuando no la hay.
- El texto de conexión también cambia entre idioma y estado: **Online / Desconectado** en español y **Online / Offline** en inglés.
- Mejorado el espaciado y la altura de las acciones de Etihad y **Ver Día 1** durante la preparación del viaje.
- Alineada la actividad de checkout con la información del alojamiento: **23 de octubre antes de las 12:00**.
- Evitado cualquier `MutationObserver` para la traducción o el estado de shell.
- Service Worker y cache-busting actualizados a `v8-6-3` para invalidar versiones anteriores.
- README actualizado con los principios de la arquitectura base estabilizada.

## V8.6.2 — 2026-09-16
- Corregido el cambio de idioma ES/EN para que actualice navegación y contenido de forma controlada.
- Eliminado el `MutationObserver` de traducción que podía provocar ciclos de renderizado y consumo excesivo de RAM.
- Restaurados los iconos visuales **☰** y **×** del menú lateral.
- Restaurado el indicador de conexión online/offline con piloto de estado.
- Mejorado el espaciado vertical entre los botones de gestión de Etihad y **Ver Día 1**.
- Alineada la actividad de checkout del último día con el alojamiento.

## V8.6.1 — 2026-09-16
- Eliminado el observador permanente del atributo `lang`.
- Ajustada la caché PWA para distribuir la corrección de estabilidad.

## V8.6.0 — 2026-09-16
- Iniciada la segmentación progresiva de la arquitectura sin framework.
- Añadidos módulos independientes para vuelos, contexto Hoy, presupuesto, traducción y compatibilidad.
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
