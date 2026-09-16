# Filipinas Travel PWA

**Versión publicada: V8.6.4** · 16/09/2026

Diario e itinerario bilingüe (ES/EN) para un viaje de 26 días por Filipinas. Aplicación web móvil, instalable como PWA y preparada para funcionar offline.

## Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Funcionalidades

- Itinerario organizado por los 26 días del viaje y navegación horizontal optimizada para móvil.
- Contexto dinámico **Hoy / Today** para preparación, viaje en curso y viaje terminado.
- Horarios completos de ida y vuelta y recordatorios de check-in.
- Puntos de interés, alojamiento, Google Maps y notas de viaje.
- Presupuesto total editable y registro local de gastos.
- Progreso de actividades y checklist de grabación almacenados localmente.
- Interfaz completamente bilingüe ES/EN mediante un único sistema de traducción.
- Cabecera, menú, botones, presupuesto, vuelos, contexto Hoy, accesibilidad, títulos y metadatos se actualizan al cambiar de idioma.
- Los controles de abrir/cerrar menú conservan siempre los iconos **☰** y **×**; solo cambia su etiqueta accesible.
- Indicador de conexión online/offline con piloto verde o rojo y texto traducido.
- Bandera circular de Filipinas en la cabecera.
- Instalación como PWA y funcionamiento offline mediante Service Worker.
- Fotografías reales almacenadas localmente en el repositorio.

## V8.6.4 — Refactorización de la arquitectura base

Esta versión elimina la arquitectura de parches acumulados de V8.6.x y consolida el comportamiento de idioma y renderizado.

### Internacionalización

- `i18n.js` es ahora la única fuente de verdad para los textos de interfaz.
- `state.lang` es el único estado de idioma.
- `setLanguage()` y `toggleLanguage()` son las únicas rutas para modificar el idioma.
- El botón ES/EN tiene un único listener.
- Se eliminan los cambios dobles ES → EN → ES que ocurrían cuando varios módulos escuchaban el mismo clic.
- `tr()` sigue resolviendo los objetos `{es,en}` de `data.js` y además traduce etiquetas residuales de tiempo como `Mañana`, `Tarde`, `Pendiente`, `Antes de las 11:00`, etc.
- El título del documento, meta descripción, cabecera, navegación, diálogo de presupuesto y atributos de accesibilidad también se sincronizan con el idioma activo.

### Renderizado

- `script.js` vuelve a ser el único coordinador del ciclo de render.
- `today.js`, `budget.js` y `flights.js` son módulos de render y datos; ya no envuelven ni sustituyen `window.renderDay`.
- Se eliminan los archivos temporales `v86.js` y `v862.js`.
- El orden de renderizado es determinista: contenido base → Hoy → vuelos → presupuesto → eventos.
- Ya no hay `MutationObserver` ni wrappers encadenados de funciones globales.

### Menú y conexión

- **☰** y **×** son contenido fijo y nunca son reemplazados por traducciones.
- Las traducciones solo modifican `aria-label` en estos controles.
- El estado de red se actualiza con `navigator.onLine` y eventos nativos `online` / `offline`.
- Verde = online; rojo = offline.

### PWA

- Service Worker actualizado a `filipinas-v8-6-4`.
- App shell limpiado de referencias a archivos de compatibilidad eliminados.
- Manifest convertido a una forma bilingüe/neutra para no quedar bloqueado únicamente en español.

## Arquitectura actual

```text
Filipinas/
├── index.html
├── style.css
├── today.css
├── budget.css
├── data.js
├── i18n.js
├── flights.js
├── photos.js
├── today.js
├── budget.js
├── script.js
├── service-worker.js
├── manifest.json
├── flag-ph.svg
├── icon-192.png
├── icon-512.png
├── images/
├── PHOTO-CREDITS.md
├── CHANGELOG.md
└── README.md
```

### Responsabilidades

- `data.js` — itinerario, destinos, alojamiento, POIs y contenido bilingüe.
- `i18n.js` — catálogo ES/EN, `t()`, `tr()` y traducción de la shell.
- `flights.js` — datos y render específico de vuelos/check-in.
- `today.js` — render del contexto Hoy/Today.
- `budget.js` — presupuesto y gastos.
- `photos.js` — fotografías locales.
- `script.js` — estado, navegación, eventos, render principal, idioma, conexión y Service Worker.

## Privacidad y datos públicos

El repositorio es público. No deben almacenarse identificadores de reserva, contraseñas, tokens, datos bancarios ni otros secretos en el código público. Las preferencias, presupuesto, gastos, progreso y checklist se guardan localmente en el dispositivo.

## Fotografías

Las fotografías de destinos, portadas, galerías y POIs se encuentran en `images/`. Consulta `PHOTO-CREDITS.md` para las fuentes y licencias.

## Uso local

1. Clona o descarga el repositorio.
2. Ejecuta `python -m http.server 8000` en la carpeta del proyecto.
3. Abre `http://localhost:8000`.

## Android

Abre la aplicación publicada en Chrome Android y selecciona **Instalar aplicación** / **Añadir a pantalla de inicio**.

## Presupuesto

El presupuesto inicial del viaje es de **85.000 PHP**. El presupuesto y los gastos se almacenan localmente.

## Despliegue

La aplicación está preparada para GitHub Pages y Netlify. GitHub Pages utiliza la rama `main` y la carpeta raíz.

## Alojamiento incluido

- Vinyce Studio — Cagayan de Oro, 28/09–01/10.
- Turtle Nest Guest House (Tinian Villa) — Camiguin, 02/10–06/10.
- CK Haven Suites • Tuscania CDO — Cagayan de Oro, 20/10–23/10; checkout antes de las 12:00.

## Créditos

Aplicación creada con la ayuda de ChatGPT.
