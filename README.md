# Filipinas Travel PWA

**Versión publicada: V8.7.1** · 16/09/2026

Diario e itinerario bilingüe (ES/EN) para un viaje completo de **29 días**, desde la salida de Madrid el **26/09/2026** hasta la llegada a Madrid el **24/10/2026**. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## V8.7.1 — Fotografías específicas del viaje internacional

V8.7.1 sustituye el placeholder genérico del aeropuerto en los días internacionales por fotografías locales específicas:

- Madrid salida y regreso → `images/madrid-barajas.webp`.
- Abu Dhabi / Zayed International Airport → `images/zayed-airport.webp`.
- Sheikh Zayed Grand Mosque → `images/sheikh-zayed-mosque.webp`.
- La galería de Abu Dhabi combina aeropuerto y mezquita.
- El POI de la mezquita utiliza su fotografía propia y Pearl Lounge utiliza la imagen de Zayed International Airport como contexto visual.
- Las tres imágenes forman parte de la caché offline de la PWA.

La migración de datos locales de V8.7 se mantiene deliberadamente con su identificador original para evitar desplazar por segunda vez los días, gastos, checklist o actividades ya migrados.

## Itinerario puerta a puerta

- **Día 1 · 26/09 — Madrid → Abu Dhabi**: llegada a Madrid-Barajas y vuelo MAD → AUH a las 21:50.
- **Día 2 · 27/09 — Abu Dhabi**: llegada 06:45, visita opcional a Sheikh Zayed Grand Mosque o descanso en aeropuerto, Pearl Lounge y vuelo AUH → MNL a las 21:45.
- **Día 3 · 28/09 — Manila → Cagayan de Oro**: llegada a Manila 11:05, conexión y vuelo MNL → CGY 16:15–17:55.
- Los 26 días originales de Filipinas ocupan **Días 3–28** manteniendo sus fechas reales.
- **Día 29 · 24/10 — Manila → Abu Dhabi → Madrid**: MNL → AUH 05:50–10:50, conexión y AUH → MAD 14:05–19:40.

## Vuelos y check-in

La aplicación mantiene dos ventanas de check-in independientes:

- **IDA:** disponible desde el **24/09/2026 a las 21:50**, 48 h antes del primer vuelo MAD → AUH.
- **VUELTA:** disponible desde el **21/10/2026 a las 21:55**, 48 h antes del primer vuelo CGY → MNL.

Los horarios completos de ida y vuelta se muestran en la aplicación y la gestión de la reserva enlaza a la página oficial de Etihad.

## Funcionalidades

- Itinerario completo de **29 días** y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy / Today** desde el 26/09 hasta el 24/10.
- Horarios completos de ida y vuelta y recordatorios de check-in independientes.
- Puntos de interés, alojamiento, Google Maps y notas de viaje.
- Planes alternativos para la escala larga de Abu Dhabi y Pearl Lounge.
- Presupuesto total editable y registro local de gastos para todo el rango del viaje.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Interfaz bilingüe ES/EN mediante un sistema central de traducción.
- Indicador de conexión online/offline.
- Instalación como PWA y funcionamiento offline mediante Service Worker.
- Fotografías reales almacenadas localmente en el repositorio.

## Arquitectura actual

```text
Filipinas/
├── index.html
├── style.css
├── today.css
├── budget.css
├── data.js
├── journey.js
├── i18n.js
├── flights.js
├── photos.js
├── today.js
├── budget.js
├── script.js
├── service-worker.js
├── manifest.json
├── flag-ph.svg
├── icon-192.png
├── icon-512.png
├── images/
├── PHOTO-CREDITS.md
├── CHANGELOG.md
└── README.md
```

### Responsabilidades

- `data.js` — núcleo original del itinerario en Filipinas, destinos, alojamiento, POIs y contenido bilingüe.
- `journey.js` — extensión puerta a puerta, días Madrid/Abu Dhabi/regreso, fotografías internacionales y migración de datos locales.
- `i18n.js` — catálogo ES/EN y traducción de la shell.
- `flights.js` — datos y render específico de vuelos/check-in.
- `today.js` — contexto Hoy/Today para el rango completo 26/09–24/10.
- `budget.js` — presupuesto y gastos para los 29 días.
- `photos.js` — fotografías locales del itinerario base.
- `script.js` — estado, navegación, eventos, render principal, idioma, conexión y Service Worker.

## PWA

- Caché actual: `filipinas-v8-7-1`.
- Los recursos utilizan cache-busting `?v=8.7.1`.
- `journey.js` y las fotografías internacionales forman parte del app shell/caché offline.
- El Service Worker elimina cachés de versiones anteriores al activarse.

## Privacidad y datos públicos

El repositorio es público. No deben almacenarse identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos en el código público. Las preferencias, presupuesto, gastos, progreso y checklist se guardan localmente en el dispositivo.

## Fotografías

Las fotografías se encuentran en `images/`. Madrid, Abu Dhabi y Sheikh Zayed Grand Mosque cuentan ya con recursos locales específicos. Consulta `PHOTO-CREDITS.md` para las fuentes y atribuciones.

## Uso local

1. Clona o descarga el repositorio.
2. Ejecuta `python -m http.server 8000` en la carpeta del proyecto.
3. Abre `http://localhost:8000`.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. El presupuesto y los gastos se almacenan localmente. Los días de tránsito parten con presupuesto específico `0` hasta registrar o presupuestar sus costes reales.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. GitHub Pages utiliza la rama `main` y la carpeta raíz.

## Créditos

Aplicación creada con la ayuda de ChatGPT.