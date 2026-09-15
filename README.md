# Filipinas Travel PWA — v6

Esta versión corrige la carga de imágenes y hace visible el presupuesto y la sección documental incluso si una versión anterior había activado “Solo itinerario”.

## Archivos
- `index.html` — estructura
- `style.css` — diseño
- `script.js` — navegación, PWA, progreso, presupuesto y gastos
- `data.js` — itinerario, POIs, mapas y notas de grabación
- `manifest.json` — instalación PWA
- `service-worker.js` — funcionamiento offline
- `images/` — imágenes locales
- `icon-192.png`, `icon-512.png` — iconos

## PC / Windows
1. Descomprime el ZIP. **Abre la carpeta que contiene directamente `index.html`**; no abras una copia antigua ni una carpeta interior con otro proyecto.
2. Abre PowerShell en esa carpeta.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.
5. Debe aparecer una etiqueta `V6` abajo a la derecha.
6. Si ves otra versión, pulsa `Ctrl+C` en cualquier servidor anterior, cierra la pestaña, y abre de nuevo `http://localhost:8000`.

### Si quedan datos de una versión anterior
Abre DevTools (`F12`) → **Application** → **Service Workers** → `Unregister`. Después **Storage** → `Clear site data`. Recarga con `Ctrl+Shift+R`.

## Android
Para instalar como PWA usa una URL HTTPS (GitHub Pages o Netlify).
1. Publica la carpeta en GitHub Pages o Netlify.
2. Abre la URL HTTPS en Chrome Android.
3. Usa `Instalar aplicación` / `Añadir a pantalla de inicio`.
4. La app y las imágenes locales quedan disponibles offline después de la primera carga.
5. Google Maps necesita conexión para abrir el mapa.

## Presupuesto
El presupuesto inicial es 85.000 PHP. Para cambiarlo, abre cualquier día y pulsa **Modificar presupuesto / Edit budget** en la tarjeta de presupuesto. El nuevo valor se guarda en el dispositivo.

Los gastos reales también se guardan localmente.

## GitHub Pages
Sube todos los archivos y la carpeta `images/` al repositorio. En `Settings → Pages`, selecciona `Deploy from a branch`, rama `main`, carpeta `/ (root)`.

## Netlify
Sube la carpeta directamente a Netlify (Deploy manually) o conecta el repositorio de GitHub.


### Imágenes
La v6 incluye las imágenes también embebidas en `assets.js`, por lo que la app no depende de que Edge encuentre la carpeta `images/`. La carpeta `images/` se conserva para reemplazar fácilmente las imágenes en el futuro.
