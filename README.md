# Filipinas Travel PWA — v8.4.0

Diario e itinerario bilingüe (ES/EN) para el viaje por Filipinas. La aplicación está pensada para móvil, puede instalarse como PWA y mantiene presupuesto, gastos, progreso y preferencias en el dispositivo.

## 🌴 Web de la aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Qué incluye
- Itinerario por días y destinos.
- Navegación horizontal por los 26 días, optimizada para móvil.
- Menú lateral compacto para funciones secundarias, evitando saturar la barra superior.
- Acceso rápido a **Hoy** y **Presupuesto** desde el menú.
- Contexto dinámico de **Hoy** antes, durante y después del viaje.
- Antes del viaje, **Hoy** muestra la cuenta atrás y la fecha en la que estará disponible el check-in del primer vuelo.
- El recordatorio de check-in usa la regla configurada de **48 horas antes de la salida**: para la salida del 27 de septiembre de 2026, la fecha mostrada es el **25 de septiembre de 2026**.
- Durante el viaje, **Hoy** identifica el día actual, muestra el progreso y permite ir al día anterior/siguiente sin añadir navegación permanente a la cabecera.
- Después del viaje, **Hoy** ofrece acceso al último día del itinerario.
- Indicador discreto de conexión online/offline.
- Puntos de interés con enlaces de Google Maps y notas del viaje.
- Enlaces a los alojamientos incluidos en el itinerario.
- Presupuesto total editable y registro de gastos local.
- Progreso de actividades y checklist de grabación guardados localmente.
- Cambio de idioma ES / EN.
- PWA instalable y funcionamiento offline reforzado.
- Aviso de nueva versión cuando el Service Worker detecta una actualización.
- Shortcuts de PWA para **Hoy** y **Presupuesto** en dispositivos compatibles.
- Fotografías reales almacenadas localmente en el propio repositorio.

## V8.4.0 — Hoy + preparación del viaje

V8.4 convierte **Hoy** en el punto de entrada contextual de la aplicación sin añadir una nueva barra de navegación. La app determina automáticamente si el usuario está antes, durante o después del viaje.

Antes del viaje, el bloque **Hoy** muestra cuánto falta para comenzar y recuerda cuándo se puede hacer el check-in del primer vuelo. La fecha de salida configurada es el **27 de septiembre de 2026** y el check-in se calcula a 48 horas, por lo que la fecha mostrada es el **25 de septiembre de 2026**. Como el repositorio no contiene la hora de salida del vuelo, el recordatorio se expresa por fecha y no por hora exacta.

Durante el viaje, la aplicación selecciona automáticamente el día correspondiente a la fecha actual y ofrece un resumen compacto con progreso y navegación anterior/siguiente. Después del viaje, conserva el acceso rápido al último día.

La funcionalidad se mantiene separada en `today.js` y `today.css` para no cargar `script.js` con otra responsabilidad y para que el bloque contextual pueda evolucionar de forma independiente.

## V8.3.0 — UX móvil + offline robusto

Esta versión reorganiza la navegación para que la barra superior no se sature en móvil. **Presupuesto** deja de ocupar espacio permanente en la cabecera y pasa al menú lateral, mientras que las funciones principales quedan agrupadas de forma más coherente.

Se incorpora un indicador de conectividad visible y una estrategia offline más segura. El Service Worker precarga el App Shell y las 17 fotografías locales, elimina cachés de versiones anteriores y solo utiliza `index.html` como fallback cuando la petición es una navegación.

También se incorpora un mecanismo de actualización: cuando hay una nueva versión instalada del Service Worker, la aplicación muestra un aviso para actualizar sin tener que desinstalar la PWA. El sistema de instalación se mantiene dentro del menú para no añadir otro botón a la cabecera.

El manifest añade shortcuts para abrir rápidamente **Hoy** y **Presupuesto** desde el icono de la PWA en dispositivos compatibles.

## V8.2.1 — Corrección de fotografías

Se corrigió la capa fotográfica local para que `photos.js` utilice correctamente la variable `tripData` declarada por `data.js`. Las portadas, galerías y fotografías de POIs vuelven a cargarse desde `images/` de forma consistente.

## V8.2.0 — Fotografías locales

La aplicación ya no depende de Wikimedia ni de otros servidores externos para mostrar fotografías. Las imágenes utilizadas por las portadas, galerías y POIs están almacenadas en `images/` dentro del repositorio y se cargan mediante `photos.js`.

## Archivos principales
- `index.html` — estructura de la aplicación, navegación principal, versión visible y crédito.
- `style.css` — diseño responsive, navegación lateral y presentación de imágenes.
- `script.js` — navegación, estado online/offline, actualización PWA, instalación, progreso, presupuesto y gastos.
- `today.js` — contexto dinámico de **Hoy**, cuenta atrás del viaje y recordatorio de check-in.
- `today.css` — estilos aislados del bloque **Hoy**.
- `data.js` — itinerario, POIs, mapas y notas.
- `photos.js` — asignación centralizada de fotografías locales.
- `images/` — fotografías locales de destinos y POIs.
- `manifest.json` — configuración PWA e iconos/shortcuts.
- `service-worker.js` — App Shell, caché de fotografías y estrategia offline.
- `icon-192.png`, `icon-512.png` — iconos de la aplicación.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — historial de versiones.

## Fotografías

Las fotografías están incluidas físicamente en el repositorio para evitar dependencias externas durante el uso de la aplicación. Se han optimizado para reducir el peso de la PWA sin necesidad de descargar las versiones originales de gran tamaño.

Consulta `PHOTO-CREDITS.md` para las fuentes y licencias correspondientes.

## PC / Windows
1. Descarga o clona el repositorio.
2. Abre PowerShell en la carpeta que contiene directamente `index.html`.
3. Ejecuta `python -m http.server 8000`.
4. Abre `http://localhost:8000`.
5. Debe aparecer la etiqueta `V8.4.0` abajo a la derecha.

### Si aparecen datos o archivos de una versión anterior
Abre DevTools (`F12`) → **Application** → **Service Workers** → **Unregister**. Después entra en **Storage** → **Clear site data** y recarga con `Ctrl+Shift+R`.

## Android
Para instalar la PWA usa la web de la aplicación por HTTPS:
1. Abre la aplicación en Chrome Android.
2. Selecciona `Instalar aplicación` / `Añadir a pantalla de inicio`.
3. La instalación precarga las fotografías locales mediante el Service Worker.
4. La aplicación y sus fotografías pueden utilizarse posteriormente sin conexión.
5. Google Maps necesita conexión para abrir mapas y navegación.
6. En dispositivos compatibles, mantén pulsado el icono de la PWA para acceder a los shortcuts **Hoy** y **Presupuesto**.

## Presupuesto
El presupuesto inicial es de **85.000 PHP**. Para cambiarlo, abre el menú lateral y pulsa **Presupuesto**, o abre cualquier día y pulsa **Modificar presupuesto / Edit budget** en la tarjeta de presupuesto. El nuevo valor se guarda en el dispositivo.

Los gastos reales también se guardan localmente.

## Actualizaciones y offline

La aplicación utiliza un Service Worker versionado (`filipinas-v8-4-0`) que precarga los recursos principales, el módulo de **Hoy** y las fotografías locales. Al publicar una nueva versión, el Service Worker puede detectar el cambio y mostrar un aviso de actualización dentro de la aplicación.

La información local —presupuesto, gastos, progreso, checklist y preferencias— se mantiene en el almacenamiento del dispositivo. Los enlaces externos, como Google Maps y reservas, necesitan conexión para abrir sus servicios.

## GitHub Pages
La versión publicada está disponible en:

[https://nachhr.github.io/Filipinas/](https://nachhr.github.io/Filipinas/)

Para configurar el despliegue, entra en `Settings → Pages` y selecciona `Deploy from a branch`, rama `main` y carpeta `/ (root)`.

## Netlify
Puedes conectar el repositorio de GitHub o desplegar manualmente la carpeta del proyecto.

## Alojamiento
La aplicación incluye los enlaces de:
- Vinyce Studio — Cagayan de Oro.
- Turtle Nest Guest House (Tinian Villa) — Camiguin.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro.

Las fechas del itinerario y el checkout de CK Haven Suites (23 de octubre antes de las 12:00) están reflejados en la aplicación.

## Créditos

Aplicación creada por **NachHR con la ayuda de ChatGPT**.
