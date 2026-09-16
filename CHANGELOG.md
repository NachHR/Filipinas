# Changelog

## V8.4.1 — 2026-09-16
- Actualizados los datos reales de vuelos de ida y vuelta en el contexto **Hoy**.
- Añadido el localizador aéreo `8V4RGE`.
- Ida integrada: 26 sep MAD 21:50 → AUH 06:45 (+1); 27 sep AUH 21:45 → MNL 11:05 (+1); 28 sep MNL 16:15 → CGY 17:55.
- Vuelta integrada: 23 oct CGY 21:55 → MNL 23:30; 24 oct MNL 05:50 → AUH 10:50; 24 oct AUH 14:05 → MAD 19:40.
- El check-in de cada vuelo de ida se calcula individualmente a 48 horas antes de su salida: 24 sep 21:50, 25 sep 21:45 y 26 sep 16:15.
- `today.js` deja de depender de una única fecha genérica para el primer vuelo y pasa a trabajar con el horario real de cada tramo de ida.
- Actualizada la tarjeta visual de **Hoy** para mostrar localizador, vuelos y momento de apertura de cada check-in.
- Actualizados `index.html` y el cache-busting a `v8.4.1`.
- Service Worker actualizado a `filipinas-v8-4-1`, manteniendo el App Shell y las 17 fotografías locales.
- README reestructurado para describir las funcionalidades actuales del repositorio en lugar de mantener un historial de versiones.
- Revisado nuevamente el repositorio tras la implementación.

## V8.4.0 — 2026-09-16
- Convertido **Hoy** en un contexto dinámico que distingue entre preparación, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás hasta el 28 de septiembre de 2026 y permite acceder directamente al Día 1.
- Añadido recordatorio del **check-in del primer vuelo** mediante la regla de 48 horas.
- Durante el viaje, **Hoy** identifica automáticamente el día correspondiente, muestra progreso y permite ir al día anterior o siguiente.
- Después del viaje, **Hoy** mantiene un acceso al último día del itinerario.
- Nueva responsabilidad aislada en `today.js` y `today.css`.
- Service Worker actualizado a `filipinas-v8-4-0`.

## V8.3.0 — 2026-09-16
- Reorganizada la cabecera móvil para evitar saturación: se elimina **Presupuesto** de la barra superior y se lleva al menú lateral.
- Añadido menú lateral compacto con accesos rápidos a **Hoy**, **Presupuesto** e instalación de la PWA cuando está disponible.
- Añadido indicador discreto de estado **Online / Sin conexión**.
- Mejorado el comportamiento offline del Service Worker: `index.html` solo se utiliza como fallback para navegaciones.
- Actualizada la caché a `filipinas-v8-3-0` y mantenida la precarga de las 17 fotografías locales.
- Añadido mecanismo de detección y aplicación de actualizaciones del Service Worker.
- Añadido soporte para shortcuts PWA de **Hoy** y **Presupuesto**.
- Limpiado `style.css` y actualizado `README.md`.

## V8.2.1 — 2026-09-15
- Corrección de la capa fotográfica local para que `photos.js` acceda correctamente a `tripData`.
- Las portadas, galerías y fotografías de POIs vuelven a cargarse desde `images/`.

## V8.2.0 — 2026-09-15
- Migración definitiva de las fotografías a archivos locales dentro de `images/`.
- Nueva capa `photos.js` para centralizar las rutas locales.
- Eliminada la dependencia de Wikimedia para la carga de imágenes.
- Service Worker actualizado para precargar las 17 fotografías locales.
- Eliminada la antigua capa `photos-v8.1.js` y las referencias al antiguo `assets.js`.
- Añadido crédito visible en el pie.

## V8.1.1 — 2026-09-15
- Corrección de imágenes SVG decorativas heredadas.
- Las fotografías reales sobrescriben también las referencias `day.loc`.

## V8.1 — 2026-09-15
- Sustitución de imágenes decorativas por fotografías auténticas de destinos y POIs.
- Nueva capa fotográfica y actualización del Service Worker.

## V8
- Incorporación de fotografías auténticas de destinos mediante Wikimedia Commons.
- Eliminación de la dependencia de `assets.js` para la carga principal de imágenes.
- Correcciones de carga y compatibilidad con GitHub Pages.

## V7
- Revisión de la carga de imágenes y recursos locales.
- Presupuesto y sección documental visibles incluso después de activar «Solo itinerario».
- Service Worker actualizado para recursos de la aplicación.

## V6
- Iteración de la PWA con mejoras de navegación, itinerario y almacenamiento local.

## V5
- Consolidación del itinerario y navegación por días.

## V4
- Ampliación del itinerario con POIs, mapas y notas.

## V3
- Incorporación de funcionalidades de diario y seguimiento del viaje.

## V2
- Evolución del prototipo hacia una aplicación web móvil.

## V1
- Primera versión del diario/itinerario de viaje por Filipinas.
