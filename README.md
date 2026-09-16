# Filipinas Travel PWA

**Versión del código: V8.8.0 — Cuaderno de campo** · 16/09/2026

**Estado:** implementada para revisión; publicación pendiente de QA móvil/PWA. La última versión publicada verificada es V8.7.1. Consultar [PROJECT_MASTER.md](PROJECT_MASTER.md) y [QA de V8.8.0](tests/QA_V8.8.0.md).

Diario e itinerario bilingüe (ES/EN) para un viaje completo de **29 días**, desde la salida de Madrid el **26/09/2026** hasta la llegada a Madrid el **24/10/2026**. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## V8.8.0 — Cuaderno de campo

- **Mi diario:** texto libre para cada uno de los 29 días, autoguardado inmediato y fecha/hora de última edición.
- **Rodaje de hoy / Rodaje documental:** preset, excepción técnica y precauciones visibles; técnica ampliada y checklist plegables.
- Contenido de rodaje de solo lectura. Solo se editan notas y casillas; el presupuesto conserva su edición habitual.
- **Mostrar/Ocultar rodaje** en el menú existente, sin añadir botones a la cabecera ni ocultar diario, presupuesto o POIs.
- Los días 18–24 en Cebú siguen como **propuesta editorial, no confirmada**.
- Diario y guía disponibles offline después de una primera carga completa online.
- Notas asociadas a fechas ISO, independientes de la numeración del itinerario. No se vuelve a ejecutar la migración 8.7 en dispositivos ya migrados.
- Actualización PWA con confirmación: el nuevo worker espera; las notas no se exponen a una recarga forzada durante la escritura.
- Limpieza de renderizado duplicado del presupuesto y separación de la UI documental.

### Uso del cuaderno

Pulsa **Hoy** para ir al día actual; el diario está justo bajo su contexto. También puedes navegar a cualquier otro día para escribir. El encabezado del diario identifica siempre la fecha seleccionada: no confundirla con la fecha real si consultas días pasados o futuros.

El texto se guarda al escribir y no se traduce al cambiar ES/EN. Si el navegador rechaza el guardado, aparece un error y se conserva un borrador en memoria durante esa sesión. **Copia el texto antes de cerrar o actualizar**: no es una copia de seguridad.

En la guía, preset y precauciones son visibles; “Técnica y continuidad” amplía el detalle y enlaza a las pautas del destino. La checklist conserva las claves antiguas, incluida `macro`, cuya etiqueta ahora es “Detalle (a 0,4 m o más)”.

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
- Diario personal y guía documental rápida por fecha.
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
├── documentary-data.js
├── documentary.js
├── journal.js
├── field-notes.css
├── script.js
├── service-worker.js
├── manifest.json
├── flag-ph.svg
├── icon-192.png
├── icon-512.png
├── images/
├── PHOTO-CREDITS.md
├── CHANGELOG.md
├── README.md
├── PROJECT_MASTER.md
├── package.json / package-lock.json (solo pruebas)
└── tests/
```

### Responsabilidades

- `data.js` — núcleo original del itinerario en Filipinas, destinos, alojamiento, POIs y contenido bilingüe.
- `journey.js` — extensión puerta a puerta, días Madrid/Abu Dhabi/regreso, fotografías internacionales y migración de datos locales.
- `i18n.js` — catálogo ES/EN y traducción de la shell.
- `flights.js` — datos y render específico de vuelos/check-in.
- `today.js` — contexto Hoy/Today para el rango completo 26/09–24/10.
- `budget.js` — presupuesto y gastos para los 29 días.
- `photos.js` — fotografías locales del itinerario base.
- `documentary-data.js` — presets y 29 pautas bilingües por fecha; no modifica el itinerario.
- `documentary.js` — render de rodaje, pautas detalladas y checklist heredada.
- `journal.js` — notas privadas, validación del almacenamiento y autoguardado.
- `field-notes.css` — estilos del cuaderno y tarjetas de rodaje.
- `script.js` — estado, navegación, eventos, render principal, idioma, conexión y Service Worker.

## PWA

- Caché actual: `filipinas-v8-8-0`.
- Los recursos utilizan cache-busting `?v=8.8.0`.
- Diario, guía, estilos nuevos, `journey.js` y las fotografías forman parte del app shell/caché offline.
- El Service Worker elimina únicamente cachés anteriores con prefijo `filipinas-v` al activarse.
- La primera instalación requiere una carga online completa. Maps, aerolíneas y otros enlaces externos no se garantizan offline.

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

## Pruebas

Con Node >=22.19, ejecutar `npm ci` y `npm test`. La suite DOM comprueba los 29 días/idiomas, persistencia, compatibilidad, errores, versiones y caché simulada. No sustituye las pruebas en Chrome Android ni como PWA instalada: véase [QA_V8.8.0.md](tests/QA_V8.8.0.md).

No hace falta Node, instalar paquetes ni compilar para usar o servir la app.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. GitHub Pages utiliza la rama `main` y la carpeta raíz.

## Créditos

Aplicación creada con la ayuda de ChatGPT.
