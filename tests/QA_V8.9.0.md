# QA — V8.9.0 Diario exportable y presupuesto global

Implementación: 17/09/2026 sobre `5ecffe5` (V8.8.1 validada por el propietario). Integración directa en main autorizada. Publicación pendiente de verificar.

## Automatizado

`npm test`: 20 pruebas superadas con Node/jsdom, sin dependencias nuevas.

- Las 14 regresiones previas: 29 días ES/EN, fecha local, orden de destinos, presets 16:9/ND8, diario, datos heredados, errores y caché simulada.
- Exportación del diario: un Blob UTF-8 y un enlace de descarga, orden de fechas, texto/acentos/saltos de línea intactos, borradores incluidos y almacenamiento intacto.
- Exportaciones vacías ES/EN y rechazo de datos de diario ilegibles sin exportación parcial.
- Editor global y diario sobre los mismos datos: añadir, cambiar fecha/categoría, editar, cancelar eliminación, confirmar eliminación, refrescar totales y recargar conservando datos.
- Totales con decimales, saldo negativo, categorías, días ordenados, registros heredados y exportación de todos los gastos sin reescrituras.
- Errores de cuota conservan el formulario; presupuesto total guardado sin cerrar el diálogo; datos de gastos ilegibles no se sobrescriben.
- CSS aplicado en DOM: POI y rodaje ocultos conjuntamente; notas y presupuesto visibles.
- La caché V8.9.0 incluye `exports.js` y elimina cachés anteriores de esta app. Marcador de migración `8.7` sin cambios.

## Alcance y comprobación manual

Las pruebas inspeccionan el contenido real del Blob y simulan el clic de descarga; no certifican el gestor de descargas Android ni el comportamiento visual de un navegador real. No hay navegador ejecutable disponible en este entorno.

1. Actualizar la PWA instalada conservando notas/gastos/casillas. Confirmar badge V8.9.0.
2. Abrir Menú → Presupuesto; registrar/editar/mover/eliminar conceptos, desplegar días y comprobar categorías/totales.
3. Descargar ambos Markdown, abrirlos y verificar texto, fechas y cantidades. Repetir en modo avión tras primera carga online.
4. Revisar a 360–390 px de ancho: diálogo desplazable, campos accesibles con teclado, cierre y botones de edición/eliminación.
5. Alternar Solo itinerario / Vista completa y ES/EN; comprobar POI y rodaje, diario y presupuesto.

Exportar no borra datos. No hay importación, sincronización ni copia automática. Los ZIP del repositorio no contienen las notas/gastos privados del navegador.
