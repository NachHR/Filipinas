# Filipinas Travel PWA

**Versión publicada: V8.6.2** · 16/09/2026

Diario e itinerario bilingüe (ES/EN) para un viaje de 26 días por Filipinas. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Funcionalidades

- Itinerario organizado por los 26 días del viaje y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy**, que distingue entre preparación del viaje, viaje en curso y viaje terminado.
- Antes del viaje, **Hoy** muestra la cuenta atrás, próximos check-ins y acceso directo al Día 1.
- Durante el viaje, **Hoy** lleva al día correspondiente; antes del comienzo lleva al Día 1 y después del viaje mantiene acceso al último día.
- Horarios completos de ida y vuelta, sin almacenar identificadores de reserva en el código público.
- **IDA:** 26/09 Madrid → Abu Dhabi; 27/09 Abu Dhabi → Manila; 28/09 Manila → Cagayan de Oro.
- **VUELTA:** 23/10 Cagayan de Oro → Manila; 24/10 Manila → Abu Dhabi → Madrid.
- **Check-in IDA:** 48 horas antes del primer vuelo de ida.
- **Check-in VUELTA:** actividad integrada en el Día 24, disponible 48 horas antes del primer vuelo de vuelta.
- Acceso a la página oficial de gestión de reserva de Etihad para realizar ambos check-ins.
- Presupuesto total editable y registro local de gastos.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Cambio de idioma ES / EN aplicado al contenido y a la interfaz, con controles de navegación estables.
- Bandera de Filipinas circular en la cabecera.
- Iconos visuales originales para abrir/cerrar el menú.
- Indicador de conexión online/offline con piloto de estado.
- Instalación como PWA y funcionamiento offline mediante Service Worker.
- Fotografías reales almacenadas localmente en el repositorio.

## V8.6.2 — Correcciones de estabilidad y UI

- Eliminado el `MutationObserver` de la capa de traducción para evitar ciclos de observación/renderizado y consumo anómalo de RAM.
- Rehecho el cambio ES/EN como una acción controlada que actualiza navegación y contenido una sola vez.
- Restaurados los iconos **☰** y **×** de apertura y cierre del menú.
- Restaurado el indicador online/offline con piloto visual.
- Separados visualmente los botones de gestión de Etihad y acceso al Día 1 en la preparación del viaje.
- Alineado el texto de checkout del Día 26 con el checkout real del alojamiento: 23 de octubre antes de las 12:00.
- Actualizado el cache-busting y el Service Worker a `v8-6-2`.

## Arquitectura

La aplicación mantiene una segmentación progresiva sin framework. `script.js` conserva el núcleo heredado mientras los módulos específicos se separan progresivamente: `flights.js`, `today.js`, `budget.js`, `i18n.js` y `v86.js`. `v862.js` contiene únicamente correcciones de estabilidad/UI de esta versión y no utiliza observadores permanentes del DOM.

## Privacidad y datos públicos

El repositorio es público. No deben almacenarse identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos en el código público. Las preferencias, presupuesto, gastos, progreso y checklist se guardan localmente en el dispositivo.

## Fotografías

Las fotografías de destinos, portadas, galerías y POIs se encuentran en `images/`. Consulta `PHOTO-CREDITS.md` para las fuentes y licencias.

## Uso en Windows

1. Clona o descarga el repositorio.
2. Ejecuta `python -m http.server 8000` en la carpeta del proyecto.
3. Abre `http://localhost:8000`.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. El presupuesto y los gastos se almacenan localmente.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. Para GitHub Pages se utiliza la rama `main` y la carpeta raíz.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Créditos

Aplicación creada con la ayuda de ChatGPT.
