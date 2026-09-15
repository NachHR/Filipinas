# Filipinas Travel PWA — v8.1.2

Diario e itinerario bilingüe (ES/EN) para el viaje por Filipinas. La aplicación está pensada para móvil, puede instalarse como PWA y mantiene presupuesto, gastos y preferencias en el dispositivo.

## 🌴 Web de la aplicación
**[Abrir Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)**

## Qué incluye
- Itinerario por días y destinos.
- Navegación entre días y localizaciones.
- Puntos de interés con enlaces de Google Maps y notas del viaje.
- Enlaces a los alojamientos incluidos en el itinerario.
- Presupuesto total editable y registro de gastos local.
- Cambio de idioma ES / EN.
- PWA instalable y funcionamiento offline.
- Fotografías auténticas y representativas de los destinos y POIs.

## V8.1.2 — Revisión final y limpieza
- Eliminado el bundle `assets.js`, que ya no se cargaba.
- Eliminado el sistema fotográfico `photos-v8.js`, sustituido por `photos-v8.1.js`.
- Eliminados los PNG/SVG decorativos heredados de `images/`; las fotos visibles proceden de las fuentes actuales definidas en `photos-v8.1.js`.
- Actualizado el Service Worker a una caché nueva para forzar la actualización tras la limpieza.
- Mantenida la caché de fotografías de Wikimedia después de su primera carga para facilitar el uso offline.

Las fotografías proceden de Wikimedia Commons y las atribuciones/licencias están documentadas en `PHOTO-CREDITS.md`.

## Archivos principales
- `index.html` — estructura de la aplicación y versión visible.
- `style.css` — diseño responsive.
- `script.js` — navegación, PWA, progreso, presupuesto y gastos.
- `data.js` — itinerario, POIs, mapas y notas.
- `photos-v8.1.js` — fotografías de destinos y POIs y corrección de referencias heredadas.
- `manifest.json` — configuración PWA.
- `service-worker.js` — caché y funcionamiento offline.
- `icon-192.png`, `icon-512.png` — iconos de la aplicación.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — historial resumido de versiones.

## PC / Windows
1. Descarga o clona el repositorio.
2. Abre PowerShell en la carpeta que contiene directamente `index.html`.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.
5. Debe aparecer la etiqueta `V8.1.2` abajo a la derecha.

### Si aparecen datos o archivos de una versión anterior
Abre DevTools (`F12`) → **Application** → **Service Workers** → **Unregister**. Después entra en **Storage** → **Clear site data** y recarga con `Ctrl+Shift+R`.

## Android
Para instalar la PWA usa la [web de la aplicación](https://nachhr.github.io/Filipinas/) por HTTPS:
1. Abre la web en Chrome Android.
2. Selecciona `Instalar aplicación` / `Añadir a pantalla de inicio`.
3. Abre durante un rato las distintas localizaciones y galerías con conexión para que las fotografías queden en caché.
4. Después, la aplicación y las fotos ya visitadas pueden seguir disponibles sin conexión.
5. Google Maps necesita conexión para abrir mapas y navegación.

## Presupuesto
El presupuesto inicial es de **85.000 PHP**. Para cambiarlo, abre cualquier día y pulsa **Modificar presupuesto / Edit budget** en la tarjeta de presupuesto. El nuevo valor se guarda en el dispositivo.

Los gastos reales también se guardan localmente.

## GitHub Pages
La versión publicada está disponible en:

**https://nachhr.github.io/Filipinas/**

Para configurar el despliegue, entra en `Settings → Pages` y selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.

## Netlify
Puedes conectar el repositorio de GitHub o desplegar manualmente la carpeta del proyecto.

## Fotografías
Las fotografías de la V8.1.2 se han seleccionado para representar directamente los destinos y puntos de interés del viaje. Consulta `PHOTO-CREDITS.md` para ver las fuentes y licencias.

## Alojamiento
La aplicación incluye los enlaces de:
- Vinyce Studio — Cagayan de Oro.
- Turtle Nest Guest House (Tinian Villa) — Camiguin.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro.

Las fechas del itinerario y el checkout de CK Haven Suites (23 de octubre antes de las 12:00) están reflejados en la aplicación.
