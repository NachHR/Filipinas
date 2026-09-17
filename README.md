# Filipinas Travel PWA

**Versión del código: V8.11.0 — Fotografías y rendimiento** · 17/09/2026

**Estado:** implementada; publicación pendiente de comprobar. V8.10.0 probada y validada por el propietario. Consultar [PROJECT_MASTER.md](PROJECT_MASTER.md) y [QA V8.11.0](tests/QA_V8.11.0.md).

Diario e itinerario bilingüe (ES/EN) para un viaje completo de **29 días**, desde la salida de Madrid el **26/09/2026** hasta la llegada a Madrid el **24/10/2026**. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## V8.11.0 — Fotografías y rendimiento

- Fotos sustituidas por el propietario, ya reducidas a WebP. Se conservan los archivos optimizados sin recomprimirlos con pérdida.
- Galería oculta junto con POI y rodaje en **Solo itinerario**; notas, gastos y actividades siguen disponibles.
- POI y galería con carga diferida y decodificación asíncrona; portada con carga prioritaria. Dimensiones intrínsecas declaradas para reservar espacio.
- Galería con proporciones originales, sin recortar los edificios y paisajes. Corregidas asociaciones de Santo Niño, Barajas, Magellan’s Cross, Pearl Lounge y Kitanglad. Las fotos genéricas se conservan como contexto del destino.
- [Créditos de fotografías](PHOTO-CREDITS.md) con autores, fuentes y enlaces de licencia; acceso desde el pie de la app y copia offline. El documento identifica cualquier fuente pendiente de verificar.
- Se mantiene la precarga de todas las fotografías para poder consultar cualquier día sin conexión. La carga diferida no reduce esa descarga inicial de caché.

## V8.10.0 — Rodaje diario y ajustes de viaje

- Iconos de instalación, arranque y favicon derivados de la bandera circular existente, con variante adaptable a Android. **La bandera de la barra superior no cambia**: mismo SVG, tamaño y posición.
- Alojamiento flexible sin reserva confirmada el 1 de octubre, en Manolo/Kisolon, Iligan y Cebú. Buscar alojamiento aparece como tarea pendiente al inicio de cada estancia, sin repetirla todos los días.
- Tres tomas **P1** con casillas por fecha y dos recomendaciones de clips/sonido por día. Las casillas antiguas se conservan. P1 y clips se ocultan en Solo itinerario.
- Pautas detalladas revisadas: itinerario de 29 días, 16:9, ND8 polarizado contextual, alojamientos flexibles y Cebú condicional.
- Eliminado «Ver Día 1» de Preparación; se conservan vuelos y check-ins.
- Ambas exportaciones usan **UTF-8 con BOM** para ayudar a detectar la codificación de acentos, símbolos y emojis. No se altera el texto guardado. Si un lector fuerza otra codificación, abrir el archivo como UTF-8.

### Conservado de V8.9.0

- **Exportar todas las notas**, desde el menú: un único `filipinas-diario.md` con días, fechas y lugares, en orden cronológico. Omite notas vacías y conserva el texto y sus saltos de línea; incluye borradores en memoria cuando el diario guardado se puede leer.
- **Solo itinerario / Vista completa**: oculta o muestra conjuntamente POI y rodaje; mantiene diario, gastos, alojamiento y actividades.
- **Presupuesto**, desde el menú: resumen global, total editable, gastos plegables por día y categoría, subtotales y totales por categoría.
- Añadir, editar y eliminar conceptos desde el presupuesto global o el día usando los mismos registros. Confirmación antes de eliminar e importes con dos decimales.
- **Exportar presupuesto (.md)**: un único `filipinas-presupuesto.md` con presupuesto, gastado, saldo (negativo si se ha excedido), categorías y detalle diario.
- Descargas locales UTF-8 con BOM, también offline tras cargar la app. Exportar no borra ni modifica los datos. Los textos de los conceptos se escapan para conservar su lectura como texto en Markdown.

### Conservado de V8.8.1

- Lugares ordenados por primera fecha del itinerario, conservando las etapas de ida y regreso.
- Apertura en el día actual según la fecha local del dispositivo, aunque se hubiera consultado otro día. Antes del viaje abre el primero; después, el último.
- Navegación manual conservada durante la sesión y al cambiar idioma.
- Todos los presets en **16:9**, con indicación visible sobre el **ND8 polarizado** según el tipo de rodaje; no se presupone su uso en todas las escenas.

## Cuaderno de campo

- **Mi diario:** texto libre para cada uno de los 29 días, autoguardado inmediato y fecha/hora de última edición.
- **Rodaje de hoy / Rodaje documental:** preset, excepción técnica y precauciones visibles; técnica ampliada y checklist plegables.
- Contenido de rodaje de solo lectura. Solo se editan notas y casillas; el presupuesto conserva su edición habitual.
- **Solo itinerario / Vista completa** en el menú existente, sin añadir botones a la cabecera.
- Los días 18–24 en Cebú siguen como **propuesta editorial, no confirmada**.
- Diario y guía disponibles offline después de una primera carga completa online.
- Notas asociadas a fechas ISO, independientes de la numeración del itinerario. No se vuelve a ejecutar la migración 8.7 en dispositivos ya migrados.
- Actualización PWA con confirmación: el nuevo worker espera; las notas se guardan al escribir y un borrador con error de guardado bloquea la recarga automática.
- Limpieza de renderizado duplicado del presupuesto y separación de la UI documental.

### Uso del cuaderno

La app abre en el día actual. Pulsa **Hoy** para volver a él; el diario está justo bajo su contexto. También puedes navegar a cualquier otro día para escribir. El encabezado del diario identifica siempre la fecha seleccionada: no confundirla con la fecha real si consultas días pasados o futuros.

El texto se guarda al escribir y no se traduce al cambiar ES/EN. Si el navegador rechaza el guardado, aparece un error y se conserva un borrador en memoria durante esa sesión. **Exporta o copia el texto antes de cerrar o actualizar**: el borrador no es persistente. Si el formato guardado es ilegible, la exportación se bloquea para evitar un archivo incompleto.

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
├── exports.js
├── documentary-data.js
├── shooting-data.js
├── documentary.js
├── journal.js
├── field-notes.css
├── script.js
├── service-worker.js
├── manifest.json
├── flag-ph.svg
├── icon-flag-192.png
├── icon-flag-512.png
├── icon-flag-maskable-512.png
├── scripts/build-icons.cjs
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
- `budget.js` — editor compartido, agrupación diaria, totales y Markdown del presupuesto.
- `exports.js` — descarga local de archivos Markdown UTF-8.
- `photos.js` — fotografías locales del itinerario base.
- `documentary-data.js` — presets y 29 pautas bilingües por fecha; no modifica el itinerario.
- `shooting-data.js` — tres P1 y dos clips complementarios por fecha, con IDs estables.
- `documentary.js` — render de rodaje, P1 persistentes, pautas y checklist heredada.
- `journal.js` — notas privadas, validación del almacenamiento y autoguardado.
- `field-notes.css` — estilos del cuaderno y tarjetas de rodaje.
- `script.js` — estado, navegación, eventos, render principal, idioma, conexión y Service Worker.

## PWA

- Caché actual: `filipinas-v8-10-0`.
- Los recursos utilizan cache-busting `?v=8.10.0`.
- Diario, guía, estilos nuevos, `journey.js` y las fotografías forman parte del app shell/caché offline.
- El Service Worker elimina únicamente cachés anteriores con prefijo `filipinas-v` al activarse.
- La primera instalación requiere una carga online completa. Maps, aerolíneas y otros enlaces externos no se garantizan offline.

## Privacidad y datos públicos

El repositorio es público. No deben almacenarse identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos en el código público. Las preferencias, presupuesto, gastos, progreso, checklist y diario se guardan localmente en el navegador/dispositivo. Las notas no se envían a GitHub ni se sincronizan.

Las P1 utilizan `filipinasP1_YYYY-MM-DD`, un objeto de IDs de toma y booleanos. Exportar el diario no incluye estas casillas; su progreso permanece local.

El diario utiliza `filipinasJournal`: `{version: 1, entries: {"YYYY-MM-DD": {text, updatedAt}}}`. `updatedAt` se almacena en UTC y se muestra en la hora local del dispositivo. Los formatos desconocidos o corruptos no se sobrescriben. Si se edita una misma fecha desde dos pestañas, prevalece la última escritura.

**Hay exportación manual del diario y presupuesto; no hay importación ni copias automáticas.** Los ZIP del repositorio contienen el código público, no las notas ni gastos almacenados en tu navegador. Borrar los datos del sitio elimina las notas y el resto de datos personales; otro navegador o dispositivo no los comparte. No borrar almacenamiento para actualizar la app: usar el aviso **Actualizar**.

## Fotografías

Las fotografías se encuentran en `images/`. Madrid, Abu Dhabi y Sheikh Zayed Grand Mosque cuentan ya con recursos locales específicos. Consulta `PHOTO-CREDITS.md` para las fuentes y atribuciones.

## Uso local

1. Clona o descarga el repositorio.
2. Ejecuta `python -m http.server 8000` en la carpeta del proyecto.
3. Abre `http://localhost:8000`.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. El presupuesto y los gastos se almacenan localmente. En **Menú → Presupuesto**, modifica el total, registra un concepto o abre un día para consultar sus categorías y editar/eliminar gastos. La fecha del formulario asigna el gasto al día correspondiente. Los cambios aparecen también en la vista diaria.

Usa **Exportar presupuesto (.md)** para descargar el registro completo. Los importes permanecen en PHP; no hay conversión de moneda. Un error de guardado conserva el formulario para reintentar. Los datos ilegibles se señalan y no se sobrescriben.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Pruebas

Con Node >=22.19, ejecutar `npm ci` y `npm test`. Las **27 pruebas** pasan en la revisión del 17/09/2026: cubren los 29 días/idiomas, persistencia, compatibilidad, errores, operaciones de gastos, exportaciones UTF-8, visibilidad de POI, versiones y caché simulada. El registro distingue estas pruebas de la validación del propietario y de las comprobaciones específicas de dispositivos: véase [QA_V8.11.0.md](tests/QA_V8.11.0.md).

No hace falta Node, instalar paquetes ni compilar para usar o servir la app.

## Despliegue

La publicación activa es **GitHub Pages**, desde la rama `main` y la carpeta raíz, sin compilación. El propietario autoriza integrar V8.11.0 directamente en `main`, sin rama nueva.

Antes de publicar cambios funcionales, ejecutar las pruebas y revisar la PWA en móvil. Después del merge, comprobar el workflow de Pages y la versión servida, y actualizar el estado de README, CHANGELOG y PROJECT_MASTER.

Los cambios exclusivamente documentales no requieren incrementar la versión de la app ni invalidar su caché. Si cambian recursos de ejecución, sincronizar badge, cache-busting, Service Worker y versión del paquete según PROJECT_MASTER.

## Iconos

`flag-ph.svg` es la fuente existente y permanece intacta. Los PNG nuevos usan nombres distintos para evitar reutilizar la estrella antigua. `scripts/build-icons.cjs` los regenera con Sharp disponible en el entorno de desarrollo; Sharp no es necesario para ejecutar la app ni sus pruebas. Ejemplo: `NODE_PATH=/ruta/a/node_modules node scripts/build-icons.cjs`.

El sistema operativo puede tardar en actualizar el icono de una PWA ya instalada. Usar el aviso de actualización de la app; no borrar datos del sitio para forzar el cambio, porque contienen notas, gastos y progreso.

## Créditos

23 fotografías locales: **2,36 MB** en total, incluidas las tres incorporaciones.

Aplicación creada con la ayuda de ChatGPT.

Fotografías: [autores, fuentes y licencias](PHOTO-CREDITS.md).
