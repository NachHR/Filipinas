# PROJECT MASTER — Filipinas Travel PWA

Referencia para mantener y continuar el proyecto. El código define el comportamiento; los documentos se distribuyen según su propósito.

## Estado vigente

- **Versión:** V8.12.2, con distribución desde `main` en [GitHub Pages](https://nachhr.github.io/Filipinas/).
- **Última versión validada por el propietario:** V8.12.0. V8.12.2 pendiente de validación del propietario.
- **Comprobación de V8.12.2:** sintaxis y composición del día revisadas de forma puntual; sin QA completo ni validación en smartphone. Detalle en [registros](tests/README.md).
- **Última ejecución completa de regresión:** 32 pruebas sobre la entrega inicial de V8.12.0; detalle en [QA V8.12.0](tests/QA_V8.12.0.md). La incorporación posterior de High Ridge no ejecutó pruebas. En V8.12.1 no se completó QA por indicación del propietario; los resultados anteriores no validan esta corrección.
- **Objetivo inmediato:** consolidación para el viaje y cierre V9.0, sin ampliar funciones innecesariamente.
- **Repositorio:** [NachHR/Filipinas](https://github.com/NachHR/Filipinas). Trabajar directamente en `main`, según autorización del propietario.

## Propósito de la documentación

| Archivo | Mantener aquí | Evitar |
|---|---|---|
| `README.md` | Presentación, uso, instalación, datos personales y acceso a documentación | Historial de versiones, esquemas internos y evidencias de despliegue |
| `CHANGELOG.md` | Cambios por versión o intervención de mantenimiento | Manual de uso y planes futuros |
| `PROJECT_MASTER.md` | Estado actual, decisiones, arquitectura, reglas y pendientes | Repetir el changelog o los informes QA |
| `PHOTO-CREDITS.md` | Archivo, fuente, autor/publicación, licencia y adaptaciones relevantes | Versiones, tamaños, caché, pruebas y log de sustituciones |
| `tests/README.md` | Acceso a registros QA y alcance de las pruebas | Copiar los resultados de cada informe |
| `tests/QA_*.md` | Evidencia fechada, límites y comprobaciones pendientes de cada entrega | Presentar resultados históricos como validación del código actual |
| `package.json` / `package-lock.json` | Versión, herramientas y dependencias de desarrollo | Documentación narrativa |
| `manifest.json` | Identidad, iconos y configuración de instalación PWA | Historial del proyecto |

Enlazar la fuente correspondiente en lugar de copiar listas de cambios, horarios o resultados. Conservar las atribuciones y las decisiones técnicas necesarias al simplificar documentos.

## Decisiones de producto y contenido

- SPA/PWA estática, mobile-first, ES/EN, sin backend, framework ni dependencias de ejecución. Debe seguir siendo útil offline.
- Desde Hoy, escribir una nota y consultar preset/seguridad rápidamente. Cabecera mínima; funciones secundarias en el menú.
- Editable: notas, casillas y presupuesto. Itinerario y guías de solo lectura.
- Solo itinerario oculta POI, rodaje y Galería; conserva alojamiento, actividades, notas y gastos.
- Arranque en la fecha local real; antes/después del viaje se elige primer/último día. La navegación manual se mantiene durante la sesión y al volver de segundo plano.
- Rodaje siempre **16:9**, seis presets orientativos y ND8 polarizado opcional según exposición, luz y movimiento. Detalles desde 0,4 m; no sumergir la Action 4 en aguas termales. Priorizar sonido ambiente y planos pacientes.
- Mantener `flag-ph.svg` y el tamaño/posición de la bandera superior. Iconos PWA derivados de esa bandera; firma NachHR en el pie.

### Estado de los datos del viaje

- 29 días: 26/09/2026–24/10/2026. `data.js` y `journey.js` definen el itinerario; `flights.js` recoge la actualización de vuelos facilitada el 23/09/2026. Horas locales de cada aeropuerto.
- 29/09: excursión en coche a Iligan para Diyandi, con regreso al alojamiento de CDO. Horarios religiosos, fuegos y accesos pendientes; fuentes enlazadas en las actividades.
- Cebú, días 18–24, sigue como `editorial-proposal`. No convertir propuestas, opciones o accesos en reservas confirmadas.
- Campvill: bungalow previsto para las noches del 7–9 de octubre, salida el 10 según el itinerario. Sin confirmación documental de reserva ni horarios de entrada inventados.
- Alojamiento flexible el 01/10, 06/10, 10–11/10 y 13–19/10; búsqueda al comienzo de cada estancia. No asignar hoteles a noches de vuelo o ferry.
- Recordatorios de check-in configurados a 48 horas del primer vuelo de cada sentido. Cualquier cambio de esta lógica o de zona horaria requiere revisión específica.
- Los planes sin ubicación concreta no muestran enlaces de mapa. CK Haven usa una referencia de calle, con aviso para confirmar el acceso exacto.
- Mantener las fuentes y límites conocidos de las fotografías. Investigación adicional de licencias pospuesta por decisión del propietario; no inventar autoría ni permisos.

## Arquitectura y mantenimiento

El orden de scripts de `index.html` es significativo: datos, composición del viaje, módulos y coordinador. Comprobar asociaciones en el modelo final de 29 días, no solo cadenas del archivo base.

| Archivos | Responsabilidad |
|---|---|
| `data.js`, `journey.js` | Itinerario base, composición puerta a puerta y migración heredada |
| `flights.js`, `today.js` | Vuelos, conexiones y contexto temporal |
| `i18n.js` | Textos de interfaz ES/EN |
| `photos.js`, `images/` | Asociaciones, archivos y dimensiones intrínsecas de imágenes |
| `documentary-data.js`, `shooting-data.js` | Presets, pautas, tres P1 y dos clips por fecha |
| `documentary.js`, `journal.js` | Consulta de rodaje, casillas y diario |
| `budget.js`, `exports.js` | Gastos compartidos entre vistas y exportaciones Markdown |
| `script.js` | Estado, render, navegación, eventos y actualizaciones |
| `index.html`, archivos CSS | Shell y presentación |
| `service-worker.js`, `manifest.json` | Caché, actualización e instalación |
| `scripts/build-icons.cjs` | Generación de iconos con Sharp disponible en desarrollo |
| `tests/app.test.cjs` | Regresión DOM y worker simulado |

Galería reúne, sin duplicados, portada, fotos del destino y del día, alojamiento asignado, actividades y POI.

Las fotos secundarias usan carga diferida; la portada tiene prioridad. La caché precarga todas las imágenes: su peso determina la descarga offline, aunque sean lazy. Al incorporar una foto, actualizar asociación, dimensiones, créditos y precarga.

### Almacenamiento y compatibilidad

- **Mantener el marcador de migración `8.7`.** No volver a desplazar los datos heredados de 26 a 29 días.
- `localStorage`: preferencias, presupuesto, gastos y progreso. Conservar las claves heredadas `itineraryOnly` y `macro` por compatibilidad.
- Diario: `filipinasJournal`, esquema `{version: 1, entries: {"YYYY-MM-DD": {text, updatedAt}}}`. Fecha de edición en UTC, mostrada en la zona local.
- P1: `filipinasP1_YYYY-MM-DD`, objeto `{id: boolean}`. IDs estables; no incluir sus casillas en la exportación del diario.
- Actividades renombradas: ID estable y `legacyTitle` / `legacyTitles` como lectura alternativa. Un valor nuevo, incluso `false`, prevalece.
- Guardar notas al evento `input`, sin escrituras diferidas pendientes al navegar. Leer el estado reciente antes de guardar; misma fecha desde dos pestañas: última escritura prevalece.
- Ante fallo de guardado, conservar el borrador de nota/formulario y advertir; revertir casillas fallidas. No sobrescribir datos corruptos ni esquemas desconocidos. Un borrador de nota sin guardar bloquea la recarga automática.
- Insertar texto personal como texto, no como HTML. Exportar Markdown con UTF-8+BOM y conservar el contenido; bloquear exportaciones parciales silenciosas ante datos ilegibles.
- Repositorio público: no publicar PDFs privados, localizadores, credenciales, información bancaria ni instrucciones privadas de acceso.

## Publicación y comprobaciones

GitHub Pages sirve `main` desde la raíz, sin build. Node >=22.19 y `npm ci` / `npm test` se usan solo en desarrollo; ver [registros QA](tests/README.md).

- En cambios funcionales, alinear versión del paquete, badge, recursos y caché. Mantener los marcadores de migración independientes de la versión visible.
- Cambios exclusivamente documentales: conservar versión y caché; una entrada breve de mantenimiento en CHANGELOG es suficiente. La copia offline de créditos se renovará con la próxima actualización de caché.
- Una corrección puntual de contenido puede conservar versión si lo pide el propietario; renovar la caché interna cuando sea necesario para distribuirla, como en High Ridge. Consultar el valor real en `service-worker.js`, sin duplicarlo en documentos.
- El worker espera confirmación en clientes existentes, precarga con `cache: reload` y elimina solo cachés `filipinas-v*`. No forzar recarga mientras haya notas sin guardar.
- Registrar pruebas y evidencia de publicación en el informe QA de la entrega. Distinguir automatización, revisión visual y validación comunicada por el propietario; no atribuir pruebas manuales no detalladas.
- Las instrucciones del propietario prevalecen sobre este flujo, incluidas excepciones expresas sobre versionado y ejecución de pruebas.

## Próximos pasos

1. Confirmar en uso los enlaces de mapas y la Galería de V8.12.1; conservar la validación de V8.12.0 como referencia anterior.
2. Para V9.0, revisar coherencia del itinerario con las fuentes vigentes, resolver pendientes de viaje y comprobar offline real, persistencia y exportaciones.
3. Cerrar el release cuando no queden incidencias bloqueantes; congelar nuevas funciones y priorizar correcciones necesarias durante el viaje.

Importación, copias automáticas, sincronización, geolocalización, registro de clips y edición de guion/presets siguen fuera de alcance, sin versión asignada.

**Fiabilidad durante el viaje > simplicidad > funcionalidad adicional > complejidad técnica.**
