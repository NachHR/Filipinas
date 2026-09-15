# Filipinas Travel PWA — v8.1

Diario e itinerario bilingüe (ES/EN) para el viaje por Filipinas. La aplicación está pensada para móvil, puede instalarse como PWA y mantiene presupuesto, gastos y preferencias en el dispositivo.

## Qué incluye
- Itinerario por días y destinos.
- Navegación entre días y localizaciones.
- Puntos de interés con enlaces de Google Maps y notas del viaje.
- Enlaces a los alojamientos incluidos en el itinerario.
- Presupuesto total editable y registro de gastos local.
- Cambio de idioma ES / EN.
- PWA instalable y funcionamiento offline.
- Fotografías auténticas y representativas de los destinos y POIs.

## V8.1 — Fotografías y offline
La V8.1 sustituye las imágenes decorativas anteriores por fotografías reales de destinos y lugares del itinerario. Las fotografías proceden de Wikimedia Commons y las atribuciones/licencias están documentadas en `PHOTO-CREDITS.md`.

Las fotos se sirven desde Wikimedia y el Service Worker las guarda en la caché de la aplicación después de su primera carga. Por ello, para tener el contenido fotográfico disponible sin conexión, conviene abrir las localizaciones y galerías una vez mientras haya Internet.

## Archivos principales
- `index.html` — estructura de la aplicación y versión visible.
- `style.css` — diseño responsive.
- `script.js` — navegación, PWA, progreso, presupuesto y gastos.
- `data.js` — itinerario, POIs, mapas y notas.
- `photos-v8.1.js` — fotografías de destinos y POIs.
- `manifest.json` — configuración PWA.
- `service-worker.js` — caché y funcionamiento offline.
- `images/` — recursos gráficos heredados de versiones anteriores.
- `icon-192.png`, `icon-512.png` — iconos de la aplicación.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — historial resumido de versiones.

## PC / Windows
1. Descarga o clona el repositorio.
2. Abre PowerShell en la carpeta que contiene directamente `index.html`.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.
5. Debe aparecer la etiqueta `V8.1` abajo a la derecha.

### Si aparecen datos o archivos de una versión anterior
Abre DevTools (`F12`) → **Application** → **Service Workers** → **Unregister**. Después entra en **Storage** → **Clear site data** y recarga con `Ctrl+Shift+R`.

## Android
Para instalar la PWA usa una URL HTTPS (por ejemplo, GitHub Pages o Netlify):
1. Publica el repositorio.
2. Abre la URL en Chrome Android.
3. Selecciona `Instalar aplicación` / `Añadir a pantalla de inicio`.
4. Abre durante un rato las distintas localizaciones y galerías con conexión para que las fotografías queden en caché.
5. Después, la aplicación y las fotos ya visitadas pueden seguir disponibles sin conexión.
6. Google Maps necesita conexión para abrir mapas y navegación.

## Presupuesto
El presupuesto inicial es de **85.000 PHP**. Para cambiarlo, abre cualquier día y pulsa **Modificar presupuesto / Edit budget** en la tarjeta de presupuesto. El nuevo valor se guarda en el dispositivo.

Los gastos reales también se guardan localmente.

## GitHub Pages
En el repositorio de GitHub, entra en `Settings → Pages` y selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.

## Netlify
Puedes conectar el repositorio de GitHub o desplegar manualmente la carpeta del proyecto.

## Fotografías
Las fotografías de la V8.1 se han seleccionado para representar directamente los destinos y puntos de interés del viaje (Cagayan de Oro, Camiguin, Bukidnon, Iligan, Cebu y Laguindingan Airport, además de POIs concretos). Consulta `PHOTO-CREDITS.md` para ver las fuentes y licencias.

## Alojamiento
La aplicación incluye los enlaces de:
- Vinyce Studio — Cagayan de Oro.
- Turtle Nest Guest House (Tinian Villa) — Camiguin.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro.

Las fechas del itinerario y el checkout de CK Haven Suites (23 de octubre antes de las 12:00) están reflejados en la aplicación.
