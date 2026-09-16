# Changelog

## V8.4.0 — 2026-09-16
- Convertido **Hoy** en un contexto dinámico que distingue entre preparación, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás hasta el 28 de septiembre de 2026 y permite acceder directamente al Día 1.
- Añadido recordatorio del **check-in del primer vuelo**: la salida está configurada para el 27 de septiembre de 2026 y el check-in se calcula a **48 horas antes**, mostrando el 25 de septiembre de 2026.
- Como el repositorio no contiene la hora exacta de salida del vuelo, el recordatorio se presenta por fecha y no por hora.
- Durante el viaje, **Hoy** identifica automáticamente el día correspondiente, muestra progreso y permite ir al día anterior o siguiente.
- Después del viaje, **Hoy** mantiene un acceso al último día del itinerario.
- Nueva responsabilidad aislada en `today.js` y `today.css`, evitando añadir otra sección permanente a la cabecera móvil.
- Actualizada la carga de `index.html`, `data.js`, `photos.js` y `script.js` a `v8.4.0`.
- Service Worker actualizado a `filipinas-v8-4-0` e incluye `today.js` y `today.css` en el App Shell.
- Conservada la estrategia offline de V8.3 y la precarga de las 17 fotografías locales.
- Actualizado `README.md` con el funcionamiento de **Hoy**, el cálculo de check-in y la nueva estructura de archivos.
- Revisado el código nuevo con comprobación de sintaxis JavaScript.

## V8.3.0 — 2026-09-16
- Reorganizada la cabecera móvil para evitar saturación: se elimina **Presupuesto** de la barra superior y se lleva al menú lateral.
- Añadido menú lateral compacto con accesos rápidos a **Hoy**, **Presupuesto** e instalación de la PWA cuando está disponible.
- Añadido indicador discreto de estado **Online / Sin conexión**, visible en la cabecera y en el menú.
- Mejorado el comportamiento offline del Service Worker: `index.html` solo se utiliza como fallback para navegaciones, evitando devolver HTML cuando falla una imagen, CSS o JS.
- Actualizada la caché a `filipinas-v8-3-0` y mantenida la precarga de las 17 fotografías locales.
- Añadido mecanismo de detección y aplicación de actualizaciones del Service Worker mediante aviso dentro de la aplicación.
- Añadido soporte para shortcuts PWA de **Hoy** y **Presupuesto** desde el icono de la aplicación en dispositivos compatibles.
- Añadido tratamiento de los parámetros de shortcut para abrir directamente el contexto correspondiente.
- Conservada la navegación horizontal por los días y la funcionalidad existente de itinerario, progreso, presupuesto, gastos, mapas, alojamiento, grabación e imágenes.
- Limpiado `style.css`, eliminando reglas duplicadas de imágenes y reorganizando los estilos de navegación y estado de conexión.
- Actualizado `README.md` con la arquitectura y el comportamiento de V8.3.
- Mantenidos `PHOTO-CREDITS.md` y los 17 archivos de fotografía local.

## V8.2.1 — 2026-09-15
- Corrección de la capa fotográfica local para que `photos.js` acceda correctamente a `tripData` declarado por `data.js`.
- Las portadas, galerías y fotografías de POIs vuelven a cargarse desde `images/` de forma consistente.
- Service Worker actualizado a la caché `filipinas-v8-2-1`.
- Actualización de cache-busting de los recursos principales.

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
