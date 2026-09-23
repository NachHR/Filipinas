# QA — V8.12.0

> Registro de esta entrega, no validación de cambios posteriores. [Índice de QA](README.md).

Fecha: 23/09/2026. Base: `main` con imágenes subidas por el propietario (`7bfffcf`).

## Alcance y evidencia

- `npm test`: **32 pruebas superadas** (27 regresiones y 5 casos nuevos).
- Seis vuelos con terminales, número, operador, equipaje y fechas locales en ES/EN. Conexiones comprobadas: 15 h, 5 h 10 min, 6 h 20 min y 3 h 15 min; Manila T3 → T2 a la ida y T2 → T3 a la vuelta.
- Los `+1/+2 días` del documento se representan como fechas de llegada explícitas; no se suman otra vez a la fecha ya indicada de cada tramo. Sin localizador publicado.
- Campvill: bungalow para noches 7–9 octubre, salida prevista el 10. Fechas basadas en la estancia existente, sin inventar reserva ni horarios. Manolo, Iligan y Cebú mantienen alojamiento flexible.
- Compatibilidad con casillas de Campville y las dos antiguas actividades del vuelo de vuelta. Un valor nuevo `false` prevalece sobre el legado. Notas, gastos, P1 e identificador de migración `8.7` se conservan.
- Marcar actividades preserva el mismo textarea, checkbox/foco y detalles desplegados. Fallo de almacenamiento revierte y avisa sin modificar datos.
- Anterior/Siguiente avanzan sobre el día consultado; Hoy vuelve al día real con un solo scroll vertical. Movimiento reducido, `aria-current`, `aria-pressed`, menú inerte cerrado, Escape y bucle de Tab comprobados con DOM simulado.
- Todas las imágenes tienen uso en el modelo final, entrada en créditos y precarga. 36 fotografías + firma = **3.361.694 bytes**. Presupuesto de regresión <4 MB tras ampliar de 23 a 37 WebP. Máximo actual 1600 px de ancho; firma 512 × 512, 23.632 bytes.
- Inspección visual del inventario mediante hoja de contacto; fotografías y logo conservados byte a byte. Dimensiones leídas con Pillow y contrastadas con PHOTO_DIMENSIONS. White Island usa su archivo propio; portada de Camiguin muestra la isla desde el mar. Firma solo en pie, nunca en galerías.
- Pruebas existentes de exportaciones UTF-8/BOM, presupuesto, ES/EN y worker simulado siguen pasando. Hash de bandera superior sin cambios.
- Limpieza: actividad de retorno duplicada consolidada, estilos de filas de vuelo sin uso retirados, URLs de alojamientos sin seguimiento. Sin documentos privados ni temporales añadidos al repositorio.

## Límites y validación manual pendiente

No se ha realizado una prueba visual interactiva de navegador ni instalación real en smartphone durante esta intervención. Las pruebas DOM no certifican diseño, gestos, descarga ni comportamiento offline del dispositivo.

1. Actualizar la PWA desde V8.11.0 y comprobar notas, gastos, casillas y bandera.
2. En móvil, pulsar navegación, Hoy, modo y menús: respuesta clara, sin saltos inesperados; revisar teclado y foco.
3. Marcar actividad con detalles abiertos: conservar posición, nota y detalles.
4. Comprobar fotos, firma y encuadres en pantallas estrechas. Solo itinerario oculta POI, rodaje y Galería.
5. Tras completar carga online, probar modo avión, navegar por días, imágenes, notas y gastos; cerrar/reabrir y exportar.
6. Validar los vuelos con la información del propietario y la estancia en Campvill; no se ha consultado una reserva privada ni verificado cambios operativos de aerolíneas.

V8.11.0 sigue siendo la última versión probada y validada expresamente por el propietario. V8.12.0 no se presenta como release final V9.0.

## Publicación

Código integrado en `main`: `a8f0997749c7c695d68ba39bf2fd1cf2bc149b2d`. [GitHub Pages](https://github.com/NachHR/Filipinas/actions/runs/35910632226) completado con éxito. HTML público muestra V8.12.0 y firma. `index.html`, `service-worker.js`, `flights.js` y `photos.js` descargados desde Pages y comparados por SHA-256 con los archivos locales: coinciden. Cierre documental posterior sin cambiar versión ni caché.
