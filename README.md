# Filipinas Travel PWA

Diario e itinerario personal bilingüe (ES/EN) para el viaje a Filipinas del **26 de septiembre al 24 de octubre de 2026**. Aplicación móvil instalable, con consulta offline y datos personales guardados en el dispositivo.

**[Abrir la app](https://nachhr.github.io/Filipinas/)** · Versión **8.12.2**

## Qué puedes hacer

- Consultar los 29 días del viaje, vuelos, alojamientos, puntos de interés y mapas.
- Escribir notas personales y marcar actividades y tomas de grabación.
- Consultar presets, pautas de rodaje y recomendaciones de seguridad.
- Registrar gastos en PHP, editarlos y consultar totales por día y categoría.
- Exportar el diario y el presupuesto a sendos archivos Markdown.
- Alternar **Vista completa / Solo itinerario**; este último oculta rodaje, POI y Galería.

## Uso durante el viaje

La app abre en el día actual según la fecha local del dispositivo. Antes del viaje muestra el primero y después, el último. Pulsa **Hoy** para volver al día actual o selecciona otro día desde la navegación.

Las notas se guardan al escribir y pertenecen al día seleccionado. Desde el menú puedes exportarlas todas; desde **Presupuesto** puedes modificar el total disponible, gestionar los gastos y exportarlos. Los archivos Markdown usan UTF-8 y agrupan la información por día.

## Instalar y usar sin conexión

1. Abre la app con conexión y deja que termine la primera carga.
2. En Chrome Android, selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**.
3. Antes de salir, comprueba que puedes consultar distintos días y fotos en modo avión.
4. Cuando aparezca el aviso **Actualizar**, úsalo para recibir cambios.

Las fotos y el contenido de la app están disponibles offline tras completar la descarga inicial. Google Maps, aerolíneas y otros sitios externos necesitan conexión.

## Tus datos

Notas, gastos, preferencias y casillas se guardan únicamente en ese navegador/dispositivo. No hay sincronización, importación ni copias automáticas. **Borrar los datos del sitio elimina esa información.**

Exporta periódicamente el diario y el presupuesto y conserva los archivos fuera del navegador. Son copias de lectura, no archivos para restaurar la app; tampoco incluyen el progreso de las casillas. Un ZIP del repositorio contiene el código, no tus datos personales.

Si aparece un error de guardado de una nota, copia el texto antes de cerrar o actualizar: el borrador permanece solo en memoria.

## Ejecutar en local

Descarga o clona el repositorio y, desde su carpeta, ejecuta:

```sh
python -m http.server 8000
```

Abre `http://localhost:8000`. No hace falta instalar dependencias ni compilar para usar la app. Para desarrollo y pruebas, consulta [PROJECT_MASTER.md](PROJECT_MASTER.md).

## Documentación

| Documento | Contenido |
|---|---|
| [CHANGELOG.md](CHANGELOG.md) | Historial de cambios |
| [PROJECT_MASTER.md](PROJECT_MASTER.md) | Estado, arquitectura, decisiones y próximos pasos |
| [PHOTO-CREDITS.md](PHOTO-CREDITS.md) | Fuentes, autores y licencias de imágenes |
| [Pruebas y QA](tests/README.md) | Registros de comprobación y validación |

Creada por **NachHR** con ayuda de ChatGPT.
