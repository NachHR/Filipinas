# PROJECT MASTER — Filipinas Travel PWA

> Documento vivo de referencia interna del proyecto. Resume el estado real, las decisiones de arquitectura y producto, los pendientes y la hoja de ruta. El repositorio y el código siguen siendo la fuente de verdad técnica.

**Última actualización:** 16/09/2026  
**Versión publicada:** **V8.7.1**  
**Aplicación:** https://nachhr.github.io/Filipinas/  
**Repositorio:** `NachHR/Filipinas`

---

## 1. Estado actual

La PWA representa actualmente el viaje completo **puerta a puerta durante 29 días**, desde la salida de Madrid el **26/09/2026** hasta la llegada de vuelta a Madrid el **24/10/2026**.

### Funcionalidad disponible

- Itinerario completo por días con navegación horizontal optimizada para móvil.
- Interfaz bilingüe **ES / EN**.
- Contexto dinámico **Hoy / Today** antes, durante y después del viaje.
- Vuelos de ida y vuelta integrados en el itinerario.
- Dos ventanas de check-in independientes:
  - **IDA:** 24/09/2026 · 21:50, 48 h antes de MAD → AUH.
  - **VUELTA:** 21/10/2026 · 21:55, 48 h antes de CGY → MNL.
- Itinerario internacional añadido antes y después de los 26 días originales de Filipinas.
- Escala larga de Abu Dhabi con alternativas de visita y descanso.
- Pearl Lounge integrado como actividad del viaje.
- Presupuesto total editable y registro de gastos por día/categoría.
- Progreso de actividades y checklist de grabación.
- Modo documental integrado en el contenido del itinerario.
- Fotografías locales de destinos y POIs, incluidas Madrid-Barajas, Zayed International Airport y Sheikh Zayed Grand Mosque.
- Indicador online/offline.
- Instalación como PWA.
- App Shell y fotografías principales disponibles offline mediante Service Worker.
- Preferencias, gastos, progreso y checklist guardados localmente en el dispositivo mediante `localStorage`.

### Estado técnico de V8.7.1

- Badge visible de versión: `V8.7.1`.
- Cache-busting de recursos: `?v=8.7.1`.
- Service Worker: `filipinas-v8-7-1`.
- README sincronizado con la versión publicada.
- Las nuevas fotografías internacionales están incluidas en la caché offline.
- La migración de datos del cambio de 26 a 29 días conserva deliberadamente el identificador interno `8.7` para evitar una segunda migración de gastos, checklists y actividades.

---

## 2. Decisiones tomadas

### Producto y experiencia

- La aplicación debe seguir siendo **mobile-first**, ligera y útil durante el viaje.
- La cabecera debe mantenerse mínima. Las funciones secundarias deben vivir en el menú lateral o dentro del contenido correspondiente.
- **Hoy / Today** es el principal punto de contexto durante el viaje.
- El itinerario debe representar el viaje real completo, no únicamente la estancia en Filipinas.
- Las funciones importantes durante el viaje deben funcionar offline siempre que sea razonable.
- Si una función necesita demasiada explicación para encontrarla, probablemente no debe ocupar navegación primaria.

### Arquitectura

- `data.js` conserva el núcleo original del itinerario de Filipinas.
- `journey.js` compone el viaje puerta a puerta sobre ese núcleo y gestiona la migración de IDs de días.
- `i18n.js` es la fuente central de traducción de la interfaz ES/EN.
- `script.js` actúa como coordinador principal de estado, navegación y render.
- Funciones especializadas se mantienen separadas en módulos (`today.js`, `flights.js`, `budget.js`, etc.) para evitar volver a concentrar toda la lógica en un único archivo.
- Fotografías importantes se sirven desde `images/` y no desde proveedores externos.
- Los datos de uso personal permanecen en `localStorage` mientras no exista una necesidad clara de backend/sincronización.

### Vuelos y check-in

- **IDA y VUELTA son dos procesos de check-in independientes.**
- Cada check-in abre 48 horas antes del primer vuelo de su correspondiente dirección.
- La gestión de vuelos debe enlazar a la fuente oficial de la aerolínea cuando proceda.

### Privacidad

- El repositorio es público.
- No deben almacenarse en GitHub localizadores privados, contraseñas, tokens, datos bancarios ni otros secretos.
- La aplicación puede mostrar información útil del viaje sin publicar identificadores sensibles.

### Versionado

Cada versión publicada debe mantenerse sincronizada en, como mínimo:

1. badge visible de `index.html`;
2. cache-busting de CSS/JS;
3. nombre de caché del Service Worker;
4. `README.md`;
5. `CHANGELOG.md`.

Una corrección pequeña puede usar una versión patch, por ejemplo `V8.7.1`, sin cambiar identificadores internos de migración salvo que realmente exista una nueva migración de datos.

---

## 3. Estructura de la PWA

No se pretende duplicar en este documento el árbol completo del repositorio. GitHub y `README.md` son la referencia detallada. Esta es la estructura conceptual relevante:

```text
index.html
│
├── data.js           → itinerario base de Filipinas
├── journey.js        → composición puerta a puerta + migración
├── i18n.js           → traducciones ES/EN
├── flights.js        → vuelos y tareas de check-in
├── photos.js         → fotografías del itinerario base
├── today.js          → contexto Hoy / Today
├── budget.js         → presupuesto y gastos
└── script.js         → estado, navegación, render y coordinación

style.css             → estilos generales
today.css             → estilos de Hoy
budget.css            → estilos de presupuesto

service-worker.js     → caché / offline / actualización PWA
manifest.json         → instalación PWA
images/               → recursos fotográficos locales
```

### Flujo general

1. `data.js` carga el modelo base.
2. `journey.js` amplía el modelo hasta convertirlo en el viaje de 29 días.
3. `i18n.js`, `flights.js`, `photos.js`, `today.js` y `budget.js` añaden comportamiento especializado.
4. `script.js` coordina la interfaz final y los eventos.
5. `service-worker.js` mantiene el App Shell y las imágenes relevantes disponibles offline.

---

## 4. Archivos relevantes

| Archivo | Responsabilidad principal | Observaciones |
|---|---|---|
| `index.html` | Shell principal de la PWA | Contiene badge de versión y carga de recursos |
| `data.js` | Itinerario base | Mantener como núcleo estable siempre que sea posible |
| `journey.js` | Extensión Madrid → Filipinas → Madrid | Contiene migración de IDs; modificar con especial cuidado |
| `i18n.js` | Traducción central | Evitar textos de interfaz duplicados fuera de este sistema |
| `flights.js` | Datos de vuelos / check-in de vuelta | Mantener coherente con `today.js` |
| `today.js` | Estado temporal y contexto Hoy | Sensible a fechas y zona horaria |
| `budget.js` | Gastos y presupuesto | Datos locales; comprobar compatibilidad con migraciones |
| `photos.js` | Asignación de imágenes del itinerario base | Las imágenes internacionales se asignan desde `journey.js` |
| `script.js` | Coordinador principal | Evitar que vuelva a convertirse en un archivo monolítico |
| `service-worker.js` | Offline y actualización | Cambiar nombre de caché en cada publicación |
| `manifest.json` | Instalación PWA | Mantener bilingüe/neutro y compatible con Android |
| `README.md` | Documentación pública actual | Debe indicar siempre la versión publicada |
| `CHANGELOG.md` | Historial de versiones | Registrar cambios funcionales y técnicos relevantes |
| `PHOTO-CREDITS.md` | Créditos/licencias de imágenes | Actualizar cada vez que se añadan fotografías |
| `PROJECT_MASTER.md` | Estado, decisiones y hoja de ruta | Este documento |

---

## 5. Cambios pendientes

### A. Validación técnica inmediata

Antes de añadir una funcionalidad grande conviene hacer una pasada de QA de V8.7.1:

- Probar la PWA publicada en Chrome Android y como aplicación instalada.
- Confirmar actualización correcta desde una caché anterior a `filipinas-v8-7-1`.
- Probar modo offline real después de una primera carga online.
- Confirmar que Madrid, Abu Dhabi y la mezquita cargan sus nuevas fotografías también offline.
- Revisar navegación de los 29 días y desplazamiento correcto de los IDs migrados.
- Comprobar que los gastos anteriores siguen vinculados al día correcto.
- Probar ES → EN → ES sin renders dobles ni pérdida de estado.
- Verificar ambos check-ins en sus diferentes fases temporales.
- Revisar el comportamiento de `Hoy` alrededor de medianoche y zonas horarias.

### B. Funcionalidad todavía no desarrollada

- **Diario personal editable:** actualmente existen notas de itinerario, pero no una entrada libre del usuario por día.
- **Ubicación / “Estoy aquí”:** no existe todavía una capa de geolocalización contextual.
- **Integración documental más profunda:** el modo de grabación existe, pero todavía puede incorporar mejor las guías/guiones documentales y convertirlos en pautas diarias más operativas.
- **Exportación / copia de seguridad de datos locales:** presupuesto, progreso, diario futuro y checklists dependen actualmente del navegador/dispositivo.

### C. Mantenimiento

- Revisar periódicamente licencias y atribuciones de nuevas imágenes.
- Evitar duplicación de datos de vuelos entre módulos.
- Mantener bajo control el tamaño total de imágenes para no penalizar instalación/offline.
- Evitar añadir botones permanentes en la cabecera salvo que sean de uso frecuente durante el viaje.

---

## 6. Próximo paso recomendado y hoja de ruta

### Paso inmediato — V8.7.2 si aparecen incidencias

No crear una versión funcional nueva hasta completar una revisión corta de V8.7.1 en móvil/PWA instalada. Si aparecen problemas, publicar **V8.7.2** únicamente como versión de estabilización.

Objetivo: salir de la rama V8.7 con vuelos, fotos internacionales, caché, idioma, presupuesto y migración completamente estables.

### V8.8 — Diario personal

**Objetivo recomendado para la siguiente versión funcional.**

Añadir una entrada personal editable por día sin sobrecargar la interfaz:

- texto libre por día;
- guardado automático local;
- fecha/hora de última edición;
- acceso desde la propia vista del día;
- funcionamiento offline;
- diseño discreto integrado con el itinerario;
- preparar el modelo para futura exportación.

Esto completa una carencia importante: la aplicación se presenta como diario de viaje, pero actualmente no permite escribir un diario personal real.

### V8.9 — Contexto de ubicación

Añadir una función opcional **“Estoy aquí”**:

- solicitar ubicación solo bajo acción explícita del usuario;
- identificar el día/localización del itinerario más relevante;
- facilitar accesos a Maps y puntos cercanos del plan;
- no almacenar ubicación de forma persistente salvo decisión explícita.

Debe ser una ayuda contextual, no un sistema de seguimiento.

### V8.x — Modo documental avanzado

Evolucionar las pautas de grabación actuales usando la guía y el guion documental del proyecto:

- planos prioritarios por día;
- narrativa / voz en off;
- sonido ambiente;
- checklist contextual;
- momentos de transición;
- notas de grabación personales;
- posible vista específica de “rodaje de hoy”.

La numeración concreta de esta versión debe decidirse después de V8.8/V8.9 según prioridad real antes del viaje.

### V9.0 — Consolidación

V9.0 debería ser una versión de cierre y madurez antes del viaje:

- auditoría completa de UX móvil;
- auditoría offline/PWA;
- limpieza de arquitectura y código duplicado;
- revisión completa de fechas, vuelos, alojamientos y enlaces;
- optimización de imágenes y tiempos de carga;
- revisión de accesibilidad;
- revisión del comportamiento de datos locales;
- documentación final sincronizada;
- congelación de funcionalidades no esenciales poco antes del viaje.

---

## 7. Criterio para futuras versiones

Antes de implementar una función nueva, comprobar:

- ¿Será útil durante el viaje real?
- ¿Funciona offline o falla de forma elegante sin conexión?
- ¿Tiene un lugar lógico en la interfaz?
- ¿Puede implementarse sin comprometer datos locales existentes?
- ¿Mantiene la experiencia móvil simple?
- ¿Necesita realmente una nueva dependencia o backend?
- ¿Se puede probar de forma clara antes de publicar?

Prioridad general del proyecto: **fiabilidad durante el viaje > simplicidad > funcionalidad adicional > complejidad técnica**.
