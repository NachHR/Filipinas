# QA — V8.10.0 Rodaje diario y ajustes de viaje

17/09/2026, sobre `9e7a6da`. Integración directa en main autorizada; despliegue pendiente de verificar.

## Verificado

- 25 pruebas de Node/jsdom superadas, incluidas las 20 regresiones anteriores.
- Tres P1 con IDs únicos y dos clips para los 29 días ES/EN. Persistencia entre días, idiomas, recarga y cambio de ID numérico; conservar nota y checklist heredada. Fallos de cuota/formato no sobrescriben datos ni dejan una casilla falsamente guardada.
- Noches sin reserva marcadas como flexibles, con búsqueda solo al inicio de estancia. Casilla histórica de llegada a Manolo conservada; desmarcar persiste y no vuelve a heredar el antiguo true. No hay referencias visibles a alojamiento familiar.
- Ambos Blob descargables empiezan por EF BB BF. Decodificación UTF-8 estricta conserva Día, mañana, flechas, puntos medios y emojis. Las pruebas no suponen que un lector externo siempre detecte la codificación.
- Preparación conserva gestión de reserva/vuelos y elimina Ver Día 1.
- SVG de cabecera idéntico por SHA-256; PNG nuevos con tamaños correctos, manifest maskable y recursos en caché. Inspección visual del PNG adaptable. Iconos anteriores retirados sin referencias de ejecución.
- Versiones alineadas, migración 8.7 intacta, sin dependencias nuevas ni PDFs privados.

## Manual pendiente tras publicar

1. Actualizar la PWA instalada sin borrar datos. Revisar icono del lanzador y arranque; Android puede renovar estos recursos más tarde que la app. Bandera superior idéntica.
2. Abrir ambos Markdown en la aplicación que mostraba caracteres extraños. Si fuerza otra codificación, seleccionar UTF-8. No se conoce aún qué lector utilizó el propietario.
3. Revisar P1 en móvil: casillas, progreso y clips plegables; Todo se oculta con Solo itinerario. Comprobar recarga offline tras primera carga online.
4. Revisar alojamientos flexibles y tareas nuevas, sin perder actividades anteriormente marcadas.

Las pruebas automatizadas cubren DOM, estilos y bytes; no certifican comportamiento visual completo ni instalación/descarga real Android. No había navegador ejecutable disponible en este entorno.
