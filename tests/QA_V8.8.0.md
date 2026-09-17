# QA — V8.8.0 Cuaderno de campo

Implementación: 16/09/2026, sobre `96829cd` (V8.7.1). Revisión posterior al merge: 17/09/2026, sobre `3bb4ccd` (V8.8.0 en `main`).

## Estado de la versión

- El propietario comunica que ha probado la rama y ha hecho el merge a `main`.
- [PR #1](https://github.com/NachHR/Filipinas/pull/1) fusionado el 16/09/2026 a las 20:15 UTC, commit `3bb4ccd`.
- [Workflow Pages 35145442952](https://github.com/NachHR/Filipinas/actions/runs/35145442952) completado con éxito a las 20:15 UTC del 16/09/2026.
- Comprobación HTTP el 17/09/2026: HTML con badge V8.8.0 y recursos `?v=8.8.0`; worker, diario, datos documentales y manifest coinciden byte a byte con el repositorio.
- `npm test`: **11/11 pruebas superadas** de nuevo tras el merge.
- Auditoría local: 50 archivos versionados sin temporales; 176 referencias a imágenes en el modelo final `data.js` → `journey.js` → `photos.js`, sin archivos inexistentes. Las rutas SVG/PNG antiguas del dato base son sustituidas por la capa fotográfica antes de renderizar.

La versión está publicada. La validación del propietario es general: no se han facilitado resultados por dispositivo ni por caso de prueba. Esto no equivale a certificar individualmente toda la lista siguiente.

## Comprobado automáticamente

Ejecutar con Node >=22.19: `npm ci && npm test`.
Las dependencias son solo de desarrollo; GitHub Pages sigue sirviendo HTML/CSS/JS sin build.

- Los 29 días se renderizan en ES y EN, sin IDs HTML duplicados.
- Una nota y una guía por fecha; presets y 1–3 precauciones por día.
- Días 18–24: `editorial-proposal`; el itinerario permanece `pending`.
- Guardado inmediato, cambio de idioma/día, rerender de actividad, recarga simulada y borrado voluntario del texto.
- Texto personal tratado como texto, nunca como HTML.
- Fechas independientes de los IDs numéricos del itinerario.
- V8.7.1: presupuesto, gastos, casillas y marcador `filipinasJourneyModel=8.7` conservados.
- Error de cuota: borrador en memoria y aviso; recuperación al volver a escribir tras resolver el error.
- Datos del diario corruptos o de una versión futura: no se sobrescriben.
- Escrituras desde otra pestaña en fechas distintas se conservan al fusionar. En la misma fecha, prevalece la última escritura.
- Preferencia Mostrar/Ocultar rodaje; diario y presupuesto no ocultos por ese control.
- Hoy antes/durante/después; fechas de apertura de ambos check-ins sin cambios.
- Todos los recursos de la shell y las imágenes referenciadas por la caché existen.
- Worker simulado: instalación sin activación forzada, caché HTTP evitada al precargar y limpieza limitada a `filipinas-v*`.
- Sintaxis JavaScript y `git diff --check`.

## Checklist manual de regresión

Conservar para futuras revisiones; no es un bloqueo de un merge ya realizado. No marcar cada punto como superado a partir de los tests DOM: no son un navegador ni una PWA instalada.

Antecedente de la implementación: la descarga de Chromium mediante Playwright falló por timeout y el binario alternativo no arrancó por errores del entorno gráfico. No se obtuvieron capturas válidas en esa sesión. La posterior prueba del propietario se registra por separado.

1. Chrome Android a 360/390 px y escritorio: sin desbordamientos; teclado no tapa el editor; foco visible.
2. Desde Hoy, escribir una nota y consultar preset/seguridad en menos de 20 segundos. Cronometrar en dispositivo real.
3. Instalar V8.8.0 desde una preview HTTPS o servidor de pruebas, cargar una vez online, activar modo avión y recargar. Verificar notas, ES/EN, 29 días, fotos y checklist.
4. Actualizar una instalación V8.7.1 con datos reales respaldados: aviso de actualización, botón Actualizar, nueva caché y datos inalterados.
5. Escribir mientras otra pestaña activa la actualización; no perder texto. Si el almacenamiento falla, copiar el borrador antes de cerrar.
6. Probar medianoche y cambio de zona horaria. Hoy sigue usando la fecha local del dispositivo; V8.8.0 no rediseña vuelos/zonas horarias.
7. Confirmar en cada versión desplegada badge, recursos, caché y documentación. Para V8.8.0 se ha comprobado la versión servida y el código del worker; ello no certifica el estado de caché de todos los dispositivos instalados.

No se han modificado reservas, itinerario, vuelos, fechas ni documentos privados. No se ha reejecutado ni cambiado el identificador de migración 8.7. La recuperación de migraciones antiguas ya dañadas no forma parte de esta versión.
