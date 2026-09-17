# PROJECT MASTER — Filipinas Travel PWA

> Referencia viva del estado real, decisiones y hoja de ruta. El repositorio y el código son la fuente de verdad técnica.

**Última actualización:** 17/09/2026

**Versión del código:** **V8.8.1 — Ajustes de navegación y rodaje**

**Versión publicada verificada:** **V8.8.0**

**Estado V8.8.0:** probada por el propietario, integrada en `main` y publicada. [PR #1](https://github.com/NachHR/Filipinas/pull/1), commit de merge `3bb4ccd` (16/09/2026), [despliegue Pages correcto](https://github.com/NachHR/Filipinas/actions/runs/35145442952). Versión servida comprobada el 17/09/2026.

**Aplicación:** https://nachhr.github.io/Filipinas/

**Repositorio:** `NachHR/Filipinas`

## 1. Estado actual

Viaje puerta a puerta de **29 días**, Madrid **26/09/2026** → Madrid **24/10/2026**.

### Conservado de V8.7.1

- Itinerario por días, navegación móvil horizontal y ES/EN centralizado.
- Hoy antes/durante/después; fechas según la zona local del dispositivo.
- Vuelos completos, escala flexible en Abu Dhabi y Pearl Lounge.
- Check-ins independientes: **IDA 24/09/2026 21:50** y **VUELTA 21/10/2026 21:55**, 48 horas antes del primer vuelo de cada dirección.
- Presupuesto editable, gastos por día/categoría, actividades completadas y checklist.
- Alojamiento, POIs, Maps, fotos locales, instalación PWA e indicador online/offline.
- Fotografías de Madrid, Zayed y Sheikh Zayed Grand Mosque dentro de la caché.

### Implementado en V8.8.1

- Lugares ordenados por primera fecha del itinerario, preservando claves y etapas de regreso.
- Arranque en el día actual local, sin restaurar el último día consultado. Antes/después del viaje: primer/último día. La navegación manual se mantiene durante la sesión; no se fuerza un cambio al volver del segundo plano.
- Seis presets y excepciones diarias en 16:9; indicación visible ES/EN sobre el ND8 polarizado según el preset. La instrucción del propietario prevalece sobre el 4:3 de la guía fuente.
- ND8 polarizado opcional, no universal: comprobar exposición/reflejos; retirar con poca luz y bajo el agua, priorizar nitidez/estabilización en movimiento.
- 14 pruebas automatizadas superadas; ver [QA V8.8.1](tests/QA_V8.8.1.md). Integración directa en `main` solicitada; despliegue pendiente de verificar tras el commit.

### Implementado en V8.8.0

- Diario personal por fecha para los 29 días: texto libre, guardado inmediato y última edición.
- Campo visible bajo el contexto Hoy, sin diálogo ni botones nuevos en la cabecera.
- Notas accesibles también en días pasados/futuros; encabezado con fecha seleccionada.
- Consulta documental diaria: preset, excepción técnica y 1–3 precauciones visibles; técnica ampliada y checklist plegables.
- Guía ES/EN basada en el documento de grabación actualizado de 29 días. Las notas personales no se traducen.
- Cebú, días 18–24, permanece como `editorial-proposal`; el itinerario sigue pendiente.
- Mostrar/Ocultar rodaje solo controla contenido de grabación; no oculta diario, presupuesto, POIs ni galería.
- Nuevos módulos y estilos incluidos en la shell offline.
- Eliminado render/formulario de presupuesto obsoleto y adaptador `L()` sin uso.
- Actualizaciones del worker con confirmación; no activación inmediata al instalar una versión nueva.

### Estado técnico

- Badge y CSS/JS: `8.8.1`; Service Worker: `filipinas-v8-8-1`.
- README, CHANGELOG y este documento distinguen V8.8.1 implementada de V8.8.0 publicada y verificada.
- Migración de 26 a 29 días: **mantener identificador interno `8.7`**. No volver a desplazar gastos/checklists/actividades en equipos ya migrados.
- Las notas nuevas no necesitan migrar IDs: usan fechas ISO.
- Sin backend, framework, subida multimedia ni dependencias de ejecución. Node/jsdom solo se usan para pruebas.

## 2. Decisiones de producto y datos

### Prioridad de V8.8.0 acordada

Desde Hoy, escribir una nota y consultar preset/seguridad rápidamente. No se pretende crear un editor audiovisual.

- Editable: notas y casillas; se mantiene la edición ya existente del presupuesto.
- Solo lectura: itinerario, guía, presets, guion y tomas.
- Mantener cabecera mínima, interfaz mobile-first y funciones secundarias en el menú/contenido.
- El modo documental mantiene el lugar como protagonista, sonido ambiente y planos pacientes.
- La guía nueva prevalece sobre indicaciones técnicas antiguas: no macro real en Action 4, detalle desde 0,4 m y no sumergir en aguas termales.
- Presets orientativos; no son ajustes aplicados remotamente a la cámara ni confirmación de acceso/reserva.

### Almacenamiento y privacidad

- Repositorio público: nunca publicar documentos privados, localizadores, credenciales, datos bancarios o direcciones de acceso.
- `localStorage` permanece como almacén de preferencias, presupuesto, gastos y progreso.
- Diario en `filipinasJournal`: `{version: 1, entries: {"YYYY-MM-DD": {text, updatedAt}}}`.
- `updatedAt` en UTC; visualización en la zona local del dispositivo.
- Escritura síncrona al evento `input`, sin temporizador pendiente al navegar/cambiar idioma.
- Si falla el guardado, mostrar error y conservar borrador en memoria; advertir antes de cerrar/actualizar. No prometer persistencia del borrador.
- No sobrescribir formatos corruptos o de versiones futuras. Recuperación manual necesaria en esos casos.
- Leer almacenamiento reciente antes de guardar: preservar fechas distintas de otras pestañas. Misma fecha: última escritura prevalece; no existe resolución de conflictos.
- Texto personal insertado mediante `textarea.value`, no como HTML.
- Las notas nunca se envían a GitHub ni a un servidor. Borrar almacenamiento del navegador elimina datos; no hay copia/sincronización automática.

### Arquitectura estable

- `data.js`: núcleo de Filipinas; solo correcciones técnicas editoriales en esta versión, no cambios del viaje.
- `journey.js`: composición de 29 días y migración heredada; no modificado en V8.8.0.
- `i18n.js`: única fuente de textos de interfaz ES/EN.
- `script.js`: coordinador de estado, navegación y render, no un módulo monolítico.
- `images/`: fotos locales; no se añadieron imágenes ni cambiaron licencias.
- `photos.js` resuelve las rutas históricas de imágenes presentes en `data.js` antes de renderizar. La revisión comprueba el modelo compuesto, no solo cadenas de archivos aislados: 176 referencias resueltas, ninguna a un archivo inexistente. `PHOTO_VERSION='8.2.1'` identifica esa capa heredada; no es la versión publicada de la app.
- El nombre heredado `itineraryOnly` y la clave de checklist `macro` permanecen para compatibilidad; sus etiquetas/UI se aclaran.

## 3. Archivos y responsabilidades

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Shell, badge y orden de scripts/estilos |
| `data.js` | Itinerario base y pautas existentes |
| `journey.js` | Composición puerta a puerta y migración 8.7 |
| `documentary-data.js` | Seis presets y 29 pautas bilingües por fecha |
| `documentary.js` | Consulta documental, detalle y checklist compatible |
| `journal.js` | Diario, validación, autoguardado y borrador ante errores |
| `field-notes.css` | Cuaderno y tarjetas de consulta rápida |
| `i18n.js` | Catálogo ES/EN y traducción de la shell |
| `today.js` / `flights.js` | Contexto temporal y vuelos/check-ins |
| `budget.js` / `budget.css` | Presupuesto y gastos |
| `photos.js` / `images/` | Fotografías locales |
| `script.js` | Coordinación, eventos, render y actualizaciones |
| `style.css` / `today.css` | Estilos generales y contexto Hoy |
| `service-worker.js` | Shell, caché y actualización con confirmación |
| `manifest.json` | Instalación PWA |
| `tests/app.test.cjs` | Regresión DOM y worker simulado |
| `tests/QA_V8.8.0.md` / `tests/QA_V8.8.1.md` | Evidencia histórica y QA del parche actual |
| `package.json` / `package-lock.json` | Herramientas de pruebas; no hay build requerido |
| `README.md` / `CHANGELOG.md` | Uso, estado e historial |
| `PHOTO-CREDITS.md` | Créditos/licencias, sin cambios |
| `PROJECT_MASTER.md` | Este documento |

Carga: datos → composición del viaje → módulos existentes → datos documentales/diario/render documental → coordinador. No modificar IDs para acoplar la guía.

## 4. QA y publicación

### Evidencia histórica V8.8.0: implementación y revisión posterior al merge

- Revisión de V8.7.1: modelo de 29 días, fechas de ambos check-ins, imágenes de caché presentes y conservación de estado ya migrado.
- **11 pruebas de regresión superadas**, incluyendo render de 29 días en ambos idiomas, persistencia, errores de cuota/formato, conservación de datos V8.7.1 y comportamiento simulado del worker.
- Sintaxis JavaScript y comprobación de diferencias.
- Verificación de recursos offline y consistencia de versión en código.
- No se publicaron ni copiaron PDFs privados al repositorio.
- Repetidas las 11 pruebas sobre `main` tras el merge, el 17/09/2026.
- Verificados el PR fusionado y el workflow de Pages completado con éxito para `3bb4ccd`.
- HTML servido con badge y recursos `8.8.0`; `service-worker.js`, `journal.js`, `documentary-data.js` y `manifest.json` publicados coinciden byte a byte con el repositorio.
- Revisados los 50 archivos versionados, recursos locales y referencias de versiones: sin temporales versionados ni imágenes inexistentes en el modelo final tras aplicar `photos.js`. La limpieza de código de V8.8.0 ya está integrada; esta revisión modifica solo documentación.

### Validación del propietario y alcance de la evidencia

El propietario comunica que ha probado la rama y ha realizado el merge a `main`. Esa validación y la publicación cierran el estado de borrador de V8.8.0.

No se especificaron dispositivos ni resultados caso por caso; no marcar automáticamente como superados Chrome Android instalado, modo avión, actualización entre versiones o pruebas de zonas horarias. El fallo del navegador del entorno durante la implementación queda como antecedente, no como impedimento de una publicación ya realizada. Véase [QA_V8.8.0.md](tests/QA_V8.8.0.md).

Conservar como comprobaciones de regresión para futuras versiones:

1. UX móvil, teclado/foco y nota + preset accesibles en menos de 20 s.
2. Carga offline real tras primera carga online; fotos de Madrid/AUH/mezquita.
3. Actualización de caché V8.7.1 → V8.8.0 sin perder datos.
4. Navegación de 29 días, presupuesto y ES → EN → ES.
5. Hoy alrededor de medianoche y durante cambios de zona horaria.
6. Dos check-ins en sus fases temporales; V8.8.0 no cambia la lógica temporal heredada.

### Regla de versiones

En cada publicación alinear badge, CSS/JS, caché, README, CHANGELOG y PROJECT_MASTER; también `package.json` si existe. Registrar el estado real de despliegue. No cambiar marcadores de migración por una subida de versión visual.

Si un commit cambia exclusivamente documentación o metadatos de mantenimiento ajenos a la ejecución, conservar versión, cache-busting y nombre de caché. Registrar su fecha en CHANGELOG; no crear una versión patch solo por cerrar el estado documental de un release.

El worker precarga con `cache: reload`, espera confirmación en clientes existentes y limpia solo cachés `filipinas-v*`. La disponibilidad de Maps/aerolíneas u otros enlaces externos no se garantiza offline.

## 5. Pendientes y hoja de ruta

### Siguiente paso inmediato

Validar V8.8.1 en el dispositivo instalado después de su integración directa en `main` y confirmar su despliegue. Mantener notas, presupuesto y casillas existentes; no cambiar el marcador de migración `8.7`.

### V8.9 — Exportación del diario

Un único botón «Exportar todas las notas» genera un solo archivo `.md` UTF-8 sin conexión. Agrupar notas no vacías cronológicamente con encabezado de día, fecha y lugar; conservar texto, acentos y saltos de línea. No borrar ni modificar el diario al exportar. Contemplar borradores en memoria para no omitir texto reciente ante fallos de guardado. No implementado en V8.8.1.

Importación, copias automáticas y sincronización siguen fuera de alcance.

### Ubicación opcional — Sin versión asignada

«Estoy aquí», solo bajo acción explícita; contextualizar lugar y accesos a Maps sin rastreo ni almacenamiento persistente de ubicación por defecto. Pospuesto tras la exportación del diario.

### Modo documental posterior

La consulta rápida está implementada. Quedan fuera de V8.8.0: checklist de tomas P1 específicas, registro de clips, editor de guion/presets, montaje, multimedia y sincronización. Decidir su prioridad tras usar el cuaderno, sin asumir que sean necesarios antes del viaje.

Confirmar reparto/alojamiento de Cebú, ferris, accesos, operadores y actividades antes de promover cualquier propuesta a itinerario real.

### V9.0 — Consolidación

Auditoría UX móvil/offline/accesibilidad, limpieza de duplicados restantes, revisión de fechas/vuelos/alojamientos/enlaces, optimización y congelación de funciones no esenciales antes del viaje.

Mantenimiento: licencias de imágenes, tamaño offline, duplicidad de datos de vuelos y comportamiento de fechas locales. Cualquier cambio de lógica temporal o migración requiere pruebas propias, no ocultarlo en una limpieza.

## 6. Criterio para futuras versiones

¿Es útil durante el viaje? ¿Funciona offline o explica sus límites? ¿Tiene lugar lógico sin saturar navegación? ¿Preserva datos? ¿Necesita realmente backend/dependencias? ¿Se puede probar antes de publicar?

**Fiabilidad durante el viaje > simplicidad > funcionalidad adicional > complejidad técnica.**
