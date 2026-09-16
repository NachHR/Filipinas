# Filipinas Travel PWA — v8.4.1

Diario e itinerario bilingüe (ES/EN) para el viaje por Filipinas. Aplicación web móvil e instalable como PWA, diseñada para consultar el viaje, gestionar información práctica y mantener datos personales en el dispositivo.

## 🌴 Aplicación

[Filipinas Travel PWA](https://nachhr.github.io/Filipinas/)

## Funcionalidades

- **Itinerario de 26 días** organizado por fechas, destinos y actividades.
- Navegación horizontal por días, adaptada a pantallas móviles.
- Vista **Hoy** dinámica que identifica automáticamente si el viaje está antes, durante o después de las fechas del itinerario.
- Antes del viaje, **Hoy** muestra la cuenta atrás y la información completa de los vuelos de ida, incluido el localizador y el momento en que se abre el check-in según la regla de 48 horas antes de cada salida.
- Durante el viaje, **Hoy** muestra el día correspondiente, destino, progreso de actividades y navegación contextual al día anterior/siguiente.
- Después del viaje, **Hoy** mantiene el acceso al último día.
- Información de vuelos de ida y vuelta integrada en el contexto de preparación del viaje.
- Localizador de la reserva aérea: **8V4RGE**.
- Menú lateral compacto para funciones secundarias como **Presupuesto**, **Hoy**, instalación y modo de itinerario.
- Indicador de conexión **online/offline**.
- **Presupuesto total editable**, con presupuesto inicial de 85.000 PHP.
- Registro de gastos almacenado localmente.
- Progreso de actividades y checklist de grabación guardados en el dispositivo.
- Puntos de interés con información, notas y enlaces a Google Maps.
- Información de alojamientos y enlaces de reserva incluidos en el itinerario.
- Fotografías reales de destinos y POIs almacenadas localmente en `images/`.
- Cambio de idioma **ES / EN**.
- PWA instalable con iconos, shortcuts y soporte de funcionamiento offline.
- Service Worker con App Shell, caché versionada, precarga de fotografías y eliminación de cachés anteriores.
- Sistema de detección de nuevas versiones y aviso de actualización dentro de la aplicación.
- Shortcuts PWA para acceder directamente a **Hoy** y **Presupuesto** en dispositivos compatibles.

## ✈️ Vuelos

**Localizador:** `8V4RGE`

### Ida

| Fecha | Ruta | Salida | Llegada |
|---|---|---:|---:|
| 26 sep 2026 | Madrid (MAD) → Abu Dhabi (AUH) | 21:50 | 06:45 (+1) |
| 27 sep 2026 | Abu Dhabi (AUH) → Manila (MNL) | 21:45 | 11:05 (+1) |
| 28 sep 2026 | Manila (MNL) → Cagayan de Oro (CGY) | 16:15 | 17:55 |

### Vuelta

| Fecha | Ruta | Salida | Llegada |
|---|---|---:|---:|
| 23 oct 2026 | Cagayan de Oro (CGY) → Manila (MNL) | 21:55 | 23:30 |
| 24 oct 2026 | Manila (MNL) → Abu Dhabi (AUH) | 05:50 | 10:50 |
| 24 oct 2026 | Abu Dhabi (AUH) → Madrid (MAD) | 14:05 | 19:40 |

En **Hoy**, el check-in se calcula individualmente para cada vuelo de ida como 48 horas antes de su hora de salida. Por tanto, el primer check-in se abre el **24 de septiembre a las 21:50**, el segundo el **25 de septiembre a las 21:45** y el tercero el **26 de septiembre a las 16:15**.

## 🏠 Alojamiento

La aplicación incluye los alojamientos incorporados al itinerario, con fechas y enlaces correspondientes:

- Vinyce Studio — Cagayan de Oro.
- Turtle Nest Guest House (Tinian Villa) — Camiguin.
- CK Haven Suites • Clean & Cozy Stay - Tuscania CDO — Cagayan de Oro.

## 📷 Fotografías

Las fotografías utilizadas por la aplicación están almacenadas físicamente en el repositorio dentro de `images/`. Esto evita depender de servidores externos para la fotografía y permite que las imágenes principales estén disponibles sin conexión.

Las fuentes y licencias están documentadas en `PHOTO-CREDITS.md`.

## 📁 Estructura principal

- `index.html` — estructura de la PWA y carga de recursos.
- `style.css` — interfaz responsive general.
- `today.css` — estilos específicos del contexto **Hoy**.
- `script.js` — lógica principal de navegación, presupuesto, gastos, progreso, PWA y almacenamiento local.
- `today.js` — contexto dinámico de **Hoy** y datos/recordatorios de vuelos.
- `data.js` — itinerario, destinos, actividades, POIs, mapas y notas.
- `photos.js` — asignación de fotografías locales.
- `images/` — fotografías locales.
- `manifest.json` — configuración de instalación, iconos y shortcuts.
- `service-worker.js` — caché y funcionamiento offline.
- `PHOTO-CREDITS.md` — fuentes y licencias de las fotografías.
- `CHANGELOG.md` — historial técnico de cambios.

## 📱 Instalación y uso offline

La aplicación puede instalarse desde Chrome Android mediante **Instalar aplicación** o **Añadir a pantalla de inicio**. El Service Worker almacena los recursos principales y las fotografías locales para permitir el uso de la aplicación sin conexión.

Los datos personales de presupuesto, gastos, progreso, checklist y preferencias se mantienen en el almacenamiento local del dispositivo. Los servicios externos, como Google Maps y páginas de reserva, requieren conexión cuando se abren.

## 💻 Desarrollo local

Desde la carpeta que contiene `index.html`:

```bash
python -m http.server 8000
```

Después, abre `http://localhost:8000` en el navegador.

## 🌐 Despliegue

El repositorio está preparado para GitHub Pages y también puede desplegarse en Netlify. La aplicación utiliza rutas relativas para que funcione correctamente bajo una subruta como `/Filipinas/`.

## Créditos

Aplicación creada por **NachHR con la ayuda de ChatGPT**.
