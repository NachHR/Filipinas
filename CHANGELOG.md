# Changelog

## V8.2.0 — 2026-09-15
- Migración definitiva de las fotografías a archivos locales dentro de `images/`.
- Nueva capa `photos.js` para centralizar las rutas locales de destinos y POIs.
- Eliminada la dependencia de Wikimedia para la carga de imágenes de la aplicación.
- Service Worker actualizado a `filipinas-v8-2-0`.
- Las 17 fotografías locales se precargan junto con el App Shell para mejorar el funcionamiento offline.
- Eliminada la antigua capa `photos-v8.1.js`.
- Eliminadas referencias y dependencias del antiguo `assets.js`.
- Añadido crédito visible en el pie: «Creado por NachHR con la ayuda de ChatGPT».
- CSS de imágenes consolidado y limpiado.
- README actualizado con la arquitectura final y las instrucciones de uso.
- Mantenimiento de `PHOTO-CREDITS.md` para documentar las fuentes y licencias de las fotografías utilizadas.

## V8.1.1 — 2026-09-15
- Corrección de un problema por el que algunos días seguían mostrando imágenes SVG decorativas heredadas.
- Las fotografías reales sobrescriben también las referencias `day.loc` del itinerario.
- Actualización de cache-busting de los recursos principales.

## V8.1 — 2026-09-15
- Sustitución de imágenes decorativas por fotografías auténticas de destinos y POIs.
- Nueva capa fotográfica para centralizar las imágenes.
- Actualización del Service Worker para mejorar la caché de fotografías.
- Documentación de fuentes y licencias.

## V8
- Incorporación de fotografías auténticas de destinos mediante Wikimedia Commons.
- Eliminación de la dependencia de `assets.js` para la carga principal de imágenes.
- Correcciones de carga y compatibilidad con GitHub Pages.

## V7
- Revisión de la carga de imágenes y recursos locales.
- Presupuesto y sección documental visibles incluso después de activar «Solo itinerario».
- Service Worker actualizado para recursos de la aplicación.

## V6
- Iteración de la PWA con mejoras de navegación, itinerario y experiencia móvil.
- Ajustes de presupuesto, progreso y almacenamiento local.

## V5
- Consolidación del itinerario de viaje y navegación por días.
- Mejoras de interfaz y adaptación a móvil.

## V4
- Ampliación del itinerario con puntos de interés, mapas y notas.
- Mejoras de organización y presentación de los días.

## V3
- Incorporación de funcionalidades de diario y seguimiento del viaje.
- Primeras mejoras de navegación y estructura PWA.

## V2
- Evolución del prototipo inicial hacia una aplicación web móvil.
- Incorporación de contenido de viaje más estructurado.

## V1
- Primera versión del diario/itinerario de viaje por Filipinas.
- Estructura inicial de la PWA y contenido básico del viaje.
