# Filipinas Travel PWA

**Versión publicada: V8.6.0** · 16/09/2026

Diario e itinerario bilingüe (ES/EN) para un viaje de 26 días por Filipinas. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Funcionalidades

- Itinerario organizado por los 26 días del viaje y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy**, que distingue entre preparación del viaje, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás, próximos check-ins y acceso directo al Día 1.
- Durante el viaje, **Hoy** lleva al día correspondiente; antes del comienzo lleva al Día 1 y después del viaje mantiene acceso al último día.
- Horarios completos de ida y vuelta, sin almacenar identificadores de reserva en el código público.
- **IDA**:
  - 26/09/2026 — Madrid (MAD) 21:50 → Abu Dhabi (AUH) 06:45 (+1).
  - 27/09/2026 — Abu Dhabi (AUH) 21:45 → Manila (MNL) 11:05 (+1).
  - 28/09/2026 — Manila (MNL) 16:15 → Cagayan de Oro (CGY) 17:55.
- **VUELTA**:
  - 23/10/2026 — Cagayan de Oro (CGY) 21:55 → Manila (MNL) 23:30.
  - 24/10/2026 — Manila (MNL) 05:50 → Abu Dhabi (AUH) 10:50.
  - 24/10/2026 — Abu Dhabi (AUH) 14:05 → Madrid (MAD) 19:40.
- **Check-in IDA:** 48 horas antes del primer vuelo de ida: 24/09/2026 a las 21:50.
- **Check-in VUELTA:** actividad integrada en el Día 24, disponible desde 21/10/2026 a las 21:55.
- Acceso a la página oficial de gestión de reserva de Etihad para realizar ambos check-ins.
- El Día 26 incluye la secuencia completa de vuelos de regreso hasta Madrid.
- Puntos de interés con enlaces de Google Maps y notas.
- Alojamiento integrado en el itinerario con sus enlaces correspondientes.
- **Presupuesto V8.5**: presupuesto total editable, gasto acumulado, disponible, porcentaje consumido y disponible por día restante.
- Registro de gastos con concepto, importe, categoría y fecha; los gastos pueden editarse y eliminarse.
- Categorías de gasto: transporte, alojamiento, comida, actividades, transporte local, compras y otros.
- Resumen de gastos por categoría y gastos del día seleccionado.
- Migración automática de gastos del formato anterior cuando es necesario.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Cambio de idioma ES / EN con capa común de traducción para la interfaz.
- Bandera de Filipinas en formato circular en la cabecera.
- Menú lateral compacto para funciones secundarias, evitando sobrecargar la cabecera móvil.
- Indicador de conexión online/offline.
- Instalación como PWA y funcionamiento offline reforzado mediante Service Worker.
- Actualización automática de caché cuando se publica una nueva versión.
- Shortcuts PWA para **Hoy** y **Presupuesto** en dispositivos compatibles.
- Fotografías reales almacenadas localmente en el repositorio para evitar dependencias externas y mejorar el funcionamiento offline.

## Arquitectura

V8.6 inicia una segmentación progresiva sin introducir un framework ni realizar una migración destructiva del núcleo existente:

- `index.html` — estructura y entrada de la aplicación.
- `style.css` — estilos generales y diseño responsive.
- `today.css` — estilos del contexto **Hoy**.
- `budget.css` — estilos del panel de presupuesto.
- `script.js` — núcleo heredado de navegación, estado y funcionalidades generales; se irá segmentando progresivamente.
- `flights.js` — datos de vuelos, check-in de vuelta y presentación de la vuelta.
- `today.js` — contexto dinámico **Hoy** y recordatorios de vuelos.
- `budget.js` — panel de presupuesto, categorías y gestión de gastos.
- `i18n.js` — capa común de traducción de interfaz.
- `v86.js` — puente de compatibilidad de V8.6 para nuevas funciones mientras continúa la segmentación del núcleo.
- `data.js` — itinerario, destinos, POIs, mapas, alojamiento y notas.
- `photos.js` — asignación de fotografías locales.
- `images/` — fotografías locales de destinos y POIs.
- `manifest.json` — configuración de la PWA, iconos y shortcuts.
- `service-worker.js` — caché del App Shell, fotografías y funcionamiento offline.
- `flag-ph.svg` — bandera circular de Filipinas utilizada en la cabecera.
- `icon-192.png` / `icon-512.png` — iconos de la PWA.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — registro de cambios del desarrollo.

## Privacidad y datos públicos

El repositorio es público y la aplicación se ejecuta en el navegador. Por ello, no deben almacenarse en el código público identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos.

La aplicación no incluye el identificador de reserva de los vuelos. Los datos de uso de la PWA —preferencias, presupuesto, gastos, progreso y checklist— se guardan localmente en el dispositivo.

## Datos locales

La aplicación guarda en el dispositivo las preferencias, presupuesto, gastos, progreso y checklist. Los datos no necesitan un servidor para mantenerse durante el uso normal de la PWA.

Los enlaces externos, incluidos Google Maps, Etihad y las páginas de alojamiento, requieren conexión para abrirse.

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

El presupuesto inicial del viaje es de **85.000 PHP**. V8.5 permite modificarlo y registrar los gastos del viaje. El presupuesto, los gastos y el resto de datos de uso se almacenan localmente en el dispositivo.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. Para GitHub Pages se utiliza la rama `main` y la carpeta raíz del repositorio.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Créditos

Aplicación creada con la ayuda de ChatGPT.
