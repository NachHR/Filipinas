# Filipinas Travel PWA

**Versión publicada: V8.7** · 16/09/2026

Diario e itinerario bilingüe (ES/EN) para un viaje completo de **29 días**, desde la salida de Madrid el **26/09/2026** hasta la llegada a Madrid el **24/10/2026**. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## V8.7 — Itinerario puerta a puerta

V8.7 amplía el modelo del viaje para que la PWA represente el recorrido real completo, no solo la estancia en Filipinas.

### Nuevos días

- **Día 1 · 26/09 — Madrid → Abu Dhabi**
  - Llegada a Madrid-Barajas con margen.
  - Vuelo MAD → AUH a las 21:50.
- **Día 2 · 27/09 — escala larga en Abu Dhabi**
  - Llegada a AUH a las 06:45.
  - Dos alternativas: visita opcional a Abu Dhabi / Gran Mezquita Sheikh Zayed o descanso en el aeropuerto.
  - Pearl Lounge antes del vuelo: comida, ducha, carga de dispositivos y descanso.
  - Vuelo AUH → MNL a las 21:45.
- **Día 3 · 28/09 — Manila → Cagayan de Oro**
  - Llegada a Manila a las 11:05.
  - Conexión internacional → doméstica.
  - Vuelo MNL → CGY a las 16:15; llegada a las 17:55.
  - Continúa el itinerario original de llegada a CDO.
- Los 26 días anteriores pasan a ocupar **Días 3–28** manteniendo sus fechas reales.
- **Día 29 · 24/10 — Manila → Abu Dhabi → Madrid**
  - MNL → AUH 05:50–10:50.
  - Conexión en Zayed International Airport.
  - AUH → MAD 14:05–19:40.
  - Llegada a Madrid y cierre del viaje.

### Pearl Lounge

La actividad del Día 2 está modelada como una estancia aproximada de **17:30–20:15** en el Pearl Lounge de Terminal A. La aplicación recuerda comprobar y contratar el pase desde Revolut y verificar disponibilidad/condiciones antes de comprar. Se enlaza a la información oficial del lounge.

### Migración de datos locales

La ampliación de 26 a 29 días renumera el itinerario existente. `journey.js` realiza una migración local una sola vez para preservar:

- día seleccionado;
- gastos asociados a días;
- checklist de grabación;
- actividades marcadas como completadas.

Los IDs de los días anteriores se desplazan `+2`, ya que ahora Madrid y Abu Dhabi ocupan los días 1 y 2.

## Funcionalidades

- Itinerario completo de **29 días** y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy / Today** desde el 26/09 hasta el 24/10.
- Horarios completos de ida y vuelta y recordatorios de check-in.
- Puntos de interés, alojamiento, Google Maps y notas de viaje.
- Planes alternativos para la escala larga de Abu Dhabi.
- Presupuesto total editable y registro local de gastos para todo el rango del viaje.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Interfaz completamente bilingüe ES/EN mediante un único sistema de traducción.
- Indicador de conexión online/offline con piloto verde o rojo.
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
- `journey.js` — extensión puerta a puerta, días Madrid/Abu Dhabi/regreso, renumeración a 29 días y migración de datos locales.
- `i18n.js` — catálogo ES/EN, `t()`, `tr()` y traducción de la shell.
- `flights.js` — datos y render específico de vuelos/check-in.
- `today.js` — contexto Hoy/Today para el rango completo 26/09–24/10.
- `budget.js` — presupuesto y gastos para los 29 días.
- `photos.js` — fotografías locales.
- `script.js` — estado, navegación, eventos, render principal, idioma, conexión y Service Worker.

## PWA

- Cache actual: `filipinas-v8-7-0`.
- `journey.js` forma parte del app shell offline.
- Los recursos utilizan cache-busting `?v=8.7.0`.
- El Service Worker mantiene compatibilidad con esos parámetros mediante `ignoreSearch`.

## Privacidad y datos públicos

El repositorio es público. No deben almacenarse identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos en el código público. Las preferencias, presupuesto, gastos, progreso y checklist se guardan localmente en el dispositivo.

## Fotografías

Las fotografías se encuentran en `images/`. V8.7 no añade archivos de imagen nuevos automáticamente: Madrid, Abu Dhabi y el regreso reutilizan temporalmente `airport.webp` hasta incorporar fotografías específicas. Consulta `PHOTO-CREDITS.md` para las fuentes y licencias.

## Uso local

1. Clona o descarga el repositorio.
2. Ejecuta `python -m http.server 8000` en la carpeta del proyecto.
3. Abre `http://localhost:8000`.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. El presupuesto y los gastos se almacenan localmente. Los nuevos días de tránsito parten con presupuesto específico `0` hasta registrar o presupuestar sus costes reales.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. GitHub Pages utiliza la rama `main` y la carpeta raíz.

## Créditos

Aplicación creada con la ayuda de ChatGPT.
