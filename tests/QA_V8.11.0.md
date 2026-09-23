# QA V8.11.0 — Fotografías y rendimiento

> Registro de esta entrega, no validación de cambios posteriores. [Índice de QA](README.md).

Fecha: 17/09/2026. Base: V8.10.0 validada por el propietario, con sustituciones fotográficas posteriores.

## Comprobaciones automatizadas

`npm test`: 27 casos, incluyendo las 25 regresiones anteriores y dos casos de fotografías/galería.

- Render de 29 días en ES/EN; todas las imágenes locales existen y tienen dimensiones declaradas.
- Portada eager/prioridad alta; POI y galería lazy; decodificación asíncrona.
- Santo Niño y Barajas usan sus fotografías. Magellan’s Cross, Pearl Lounge y Kitanglad utilizan sus nuevas fotos específicas.
- Galería oculta tras alternar Solo itinerario, navegar y recargar con preferencia persistida; vuelve a mostrarse al desactivarlo.
- Caché incluye imágenes y créditos; mantiene instalación atómica y actualización con consentimiento.
- Se conserva la cobertura de notas, gastos, exportaciones, casillas, migración 8.7 y bandera superior.

## Inspección de recursos

Las 20 fotos reemplazadas por el propietario pesaban 2.134.926 bytes antes de esta intervención (76,65 % menos que los 9.143.271 bytes anteriores). Dimensiones entre 720 y 1.424 píxeles de ancho; ya no hay imágenes de 6.000 × 4.000. No se recomprimieron innecesariamente. Se inspeccionaron visualmente los archivos suministrados; galería ajustada para mostrar encuadres completos.

PHOTO-CREDITS enlaza cada ficha y licencia. La verificación pendiente, si existe, se identifica expresamente en ese documento. Los enlaces externos de las fuentes requieren conexión; la copia local de créditos queda en caché.

Total final: **23 fotografías, 2,363,756 bytes** (2,36 MB decimales). Las tres incorporaciones fueron inspeccionadas y miden 783×576, 1280×853 y 1200×884; sin recompresión adicional.

## Comprobaciones específicas para el cierre V9.0

- Smartphone instalado: aceptar actualización y confirmar que conserva notas, gastos y progreso.
- Alternar Solo itinerario/Vista completa y comprobar la galería.
- Tras completar la carga online, abrir distintos destinos y créditos en modo avión.
- Comprobar carga y encuadres en pantalla estrecha y escritorio. La prueba DOM verifica atributos y CSS, no tiempos de red ni render visual de un navegador real.

## Publicación

Integrada en main como `202643f`. HTML público comprobado con badge V8.11.0 y enlace local de créditos. [Workflow Pages](https://github.com/NachHR/Filipinas/actions/runs/35247903562). Repositorio revisado sin temporales versionados.

## Validación del propietario

El 17/09/2026 el propietario comunica: «Versión 8.11.0 probada y validada». Se registra como validación general de la versión publicada. No se han detallado dispositivos ni resultados por caso; la lista anterior se mantiene para el cierre final V9.0, sin afirmar que cada prueba manual se haya realizado.
