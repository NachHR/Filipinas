# QA V8.11.0 — Fotografías y rendimiento

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

## Validación manual pendiente

- Smartphone instalado: aceptar actualización y confirmar que conserva notas, gastos y progreso.
- Alternar Solo itinerario/Vista completa y comprobar la galería.
- Tras completar la carga online, abrir distintos destinos y créditos en modo avión.
- Comprobar carga y encuadres en pantalla estrecha y escritorio. La prueba DOM verifica atributos y CSS, no tiempos de red ni render visual de un navegador real.
