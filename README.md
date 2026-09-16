# Filipinas Travel PWA

Diario e itinerario bilingüe (ES/EN) para un viaje de 26 días por Filipinas. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Funcionalidades

- Itinerario organizado por los 26 días del viaje y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy**, que distingue entre preparación del viaje, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás, el próximo hito y acceso directo al Día 1.
- Gestión de vuelos con el localizador `8V4RGE` y horarios completos de ida y vuelta.
- **IDA**:
  - 26/09/2026 — Madrid (MAD) 21:50 → Abu Dhabi (AUH) 06:45 (+1).
  - 27/09/2026 — Abu Dhabi (AUH) 21:45 → Manila (MNL) 11:05 (+1).
  - 28/09/2026 — Manila (MNL) 16:15 → Cagayan de Oro (CGY) 17:55.
- **VUELTA**:
  - 23/10/2026 — Cagayan de Oro (CGY) 21:55 → Manila (MNL) 23:30.
  - 24/10/2026 — Manila (MNL) 05:50 → Abu Dhabi (AUH) 10:50.
  - 24/10/2026 — Abu Dhabi (AUH) 14:05 → Madrid (MAD) 19:40.
- Check-in conjunto de la reserva: se muestra **una única fecha de apertura, 48 horas antes del primer vuelo**, es decir, 24/09/2026 a las 21:50.
- Durante el viaje, **Hoy** identifica automáticamente el día correspondiente, muestra el progreso y permite desplazarse al día anterior o siguiente.
- Después del viaje, **Hoy** conserva acceso al último día.
- Puntos de interés con enlaces de Google Maps y notas.
- Alojamiento integrado en el itinerario con sus enlaces correspondientes.
- Presupuesto total editable y registro de gastos almacenado localmente.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Cambio de idioma ES / EN.
- Menú lateral compacto para funciones secundarias, evitando sobrecargar la cabecera móvil.
- Indicador de conexión online/offline.
- Instalación como PWA y funcionamiento offline reforzado mediante Service Worker.
- Actualización automática de caché cuando se publica una nueva versión.
- Shortcuts PWA para **Hoy** y **Presupuesto** en dispositivos compatibles.
- Fotografías reales almacenadas localmente en el repositorio para evitar dependencias externas y mejorar el funcionamiento offline.

## Arquitectura

- `index.html` — estructura y entrada de la aplicación.
- `style.css` — estilos generales y diseño responsive.
- `today.css` — estilos del contexto **Hoy**.
- `script.js` — navegación, estado, presupuesto, gastos, instalación y funcionalidades generales.
- `today.js` — fechas del viaje, vuelos, check-in conjunto y contexto dinámico de **Hoy**.
- `data.js` — itinerario, destinos, POIs, mapas, alojamiento y notas.
- `photos.js` — asignación de fotografías locales.
- `images/` — fotografías locales de destinos y POIs.
- `manifest.json` — configuración de la PWA, iconos y shortcuts.
- `service-worker.js` — caché del App Shell, fotografías y funcionamiento offline.
- `icon-192.png` / `icon-512.png` — iconos de la PWA.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — registro de cambios del desarrollo.

## Datos locales

La aplicación guarda en el dispositivo las preferencias, presupuesto, gastos, progreso y checklist. Los datos no necesitan un servidor para mantenerse durante el uso normal de la PWA.

Los enlaces externos, incluidos Google Maps y las páginas de alojamiento, requieren conexión para abrirse.

## Fotografías

Las fotografías utilizadas por destinos, portadas, galerías y POIs se encuentran físicamente dentro de `images/`. El Service Worker las incluye en la caché para que sigan disponibles sin conexión.

Consulta `PHOTO-CREDITS.md` para las fuentes y licencias.

## Uso en Windows

1. Clona o descarga el repositorio.
2. Abre PowerShell en la carpeta del proyecto.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000` en el navegador.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**. Una vez instalada, el App Shell y las fotografías locales pueden utilizarse sin conexión.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. Puede modificarse desde **Presupuesto** y el valor se guarda localmente.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. Para GitHub Pages se utiliza la rama `main` y la carpeta raíz del repositorio.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Créditos

Aplicación creada por **NachHR con la ayuda de ChatGPT**.
