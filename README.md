# Filipinas Travel PWA — v8.2.0

Diario e itinerario bilingüe (ES/EN) para el viaje por Filipinas. La aplicación está pensada para móvil, puede instalarse como PWA y mantiene presupuesto, gastos y preferencias en el dispositivo.

## 🌴 Web de la aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Qué incluye
- Itinerario por días y destinos.
- Navegación entre días y localizaciones.
- Puntos de interés con enlaces de Google Maps y notas del viaje.
- Enlaces a los alojamientos incluidos en el itinerario.
- Presupuesto total editable y registro de gastos local.
- Cambio de idioma ES / EN.
- PWA instalable y funcionamiento offline.
- Fotografías reales almacenadas localmente en el propio repositorio.

## V8.2.0 — Fotografías locales

La aplicación ya no depende de Wikimedia ni de otros servidores externos para mostrar fotografías. Las imágenes utilizadas por las portadas, galerías y POIs están almacenadas en `images/` dentro del repositorio y se cargan mediante `photos.js`.

El Service Worker precarga las fotografías locales junto con el resto del App Shell. Esto evita errores producidos por redirecciones, disponibilidad de servicios externos o cachés incompletas y permite que las fotografías estén disponibles sin conexión desde la instalación de la PWA.

También se ha eliminado la antigua capa `photos-v8.1.js` y cualquier dependencia del antiguo `assets.js`.

## Archivos principales
- `index.html` — estructura de la aplicación, versión visible y crédito.
- `style.css` — diseño responsive y presentación de imágenes.
- `script.js` — navegación, PWA, progreso, presupuesto y gastos.
- `data.js` — itinerario, POIs, mapas y notas.
- `photos.js` — asignación centralizada de fotografías locales.
- `images/` — fotografías locales de destinos y POIs.
- `manifest.json` — configuración PWA.
- `service-worker.js` — App Shell y caché de fotografías locales.
- `icon-192.png`, `icon-512.png` — iconos de la aplicación.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — historial de versiones.

## Fotografías

Las fotografías están incluidas físicamente en el repositorio para evitar dependencias externas durante el uso de la aplicación. Se han optimizado para reducir el peso de la PWA sin necesidad de descargar las versiones originales de gran tamaño.

Consulta `PHOTO-CREDITS.md` para las fuentes y licencias correspondientes.

## PC / Windows
1. Descarga o clona el repositorio.
2. Abre PowerShell en la carpeta que contiene directamente `index.html`.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.
5. Debe aparecer la etiqueta `V8.2.0` abajo a la derecha.

### Si aparecen datos o archivos de una versión anterior
Abre DevTools (`F12`) → **Application** → **Service Workers** → **Unregister**. Después entra en **Storage** → **Clear site data** y recarga con `Ctrl+Shift+R`.

## Android
Para instalar la PWA usa la web de la aplicación por HTTPS:
1. Abre la aplicación en Chrome Android.
2. Selecciona `Instalar aplicación` / `Añadir a pantalla de inicio`.
3. La instalación precarga las fotografías locales mediante el Service Worker.
4. La aplicación y sus fotografías pueden utilizarse posteriormente sin conexión.
5. Google Maps necesita conexión para abrir mapas y navegación.

## Presupuesto
El presupuesto inicial es de **85.000 PHP**. Para cambiarlo, abre cualquier día y pulsa **Modificar presupuesto / Edit budget** en la tarjeta de presupuesto. El nuevo valor se guarda en el dispositivo.

Los gastos reales también se guardan localmente.

## GitHub Pages
La versión publicada está disponible en:

https://nachhr.github.io/Filipinas/

Para configurar el despliegue, entra en `Settings → Pages` y selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.

## Netlify
Puedes conectar el repositorio de GitHub o desplegar manualmente la carpeta del proyecto.

## Alojamiento
La aplicación incluye los enlaces de:
- Vinyce Studio — Cagayan de Oro.
- Turtle Nest Guest House (Tinian Villa) — Camiguin.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro.

Las fechas del itinerario y el checkout de CK Haven Suites (23 de octubre antes de las 12:00) están reflejados en la aplicación.

## Créditos

Aplicación creada por **NachHR con la ayuda de ChatGPT**.
