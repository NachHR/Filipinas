# PROJECT MASTER — Filipinas Travel PWA

> Referencia viva del estado real, decisiones y hoja de ruta. El repositorio y el código son la fuente de verdad técnica.

**Última actualización:** 23/09/2026

**Versión del código:** **V8.12.0 — Vuelos, Campvill y respuesta de la interfaz**

**Última versión probada por el propietario:** **V8.11.0**, declarada probada y validada.

**Estado V8.12.0:** implementada directamente en `main`; 32 pruebas automatizadas superadas. Pendiente de validación del propietario. No se declara todavía el release final V9.0.

**Estado V8.11.0:** integrada directamente en `main` (`202643f`), versión servida comprobada. [Despliegue Pages](https://github.com/NachHR/Filipinas/actions/runs/35247903562). 27 pruebas superadas; probada y validada por el propietario. V9.0 sigue reservada para la validación final.

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

### Implementado en V8.12.0 — Vuelos, Campvill y respuesta de la interfaz

- Los seis tramos incorporan número, aerolínea, operador, fecha de llegada, terminales y equipaje según la actualización del propietario del 23/09/2026: ida sin maletas facturadas incluidas; vuelta con una de hasta 25 kg. Horas locales de cada aeropuerto, sin publicar localizadores.
- Conexiones: AUH 15 h; Manila 5 h 10 min (T3 → T2) de ida, Manila 6 h 20 min (T2 → T3) y AUH 3 h 15 min de vuelta. Detalle disponible en Preparación y en los días de vuelo.
- Bungalow previsto en **Campvill Riverside Car Camping**, Kisolon / Sumilao, noches del 7 al 9 de octubre, salida el 10 según el itinerario vigente. Sin inventar una confirmación de reserva ni horarios de entrada. Retirada la búsqueda genérica de alojamiento de esa estancia.
- 36 fotografías y firma (`firma_logo.webp`): **3.361.694 bytes** en conjunto. Se conservan los WebP subidos sin recomprimir. White Island usa `white-island.webp`; Camiguin tiene su propia portada. Nuevas asociaciones a POI, dimensiones y caché actualizadas.
- Firma NachHR discreta en el pie. Bandera superior e iconos PWA conservados.
- Respuesta visual al pulsar, foco visible, controles táctiles de al menos 44 px de altura y respeto a movimiento reducido. Menú con foco, cierre con Escape, bucle de tabulación y controles inactivos cuando está cerrado.
- Marcar actividades actualiza progreso sin reconstruir la vista ni cerrar los detalles; ante fallo de guardado se revierte la casilla y se avisa. Anterior/Siguiente avanzan desde el día consultado. Hoy evita desplazamientos verticales simultáneos.
- Se consolidó la actividad duplicada de vuelo de vuelta, conservando casillas antiguas por sus claves previas. Notas, gastos, P1, fechas e identificador de migración `8.7` intactos.

**English:** All six flights now include flight numbers, terminals, carriers, operators, local arrival dates and checked baggage. Manila transfers are explicit (T3 → T2 outbound; T2 → T3 return). The Kisolon stay uses a planned Campvill bungalow for 7–10 October, with arrival time still to be arranged. Updated POI photos, White Island mapping, offline image inventory and NachHR footer signature. Button feedback, keyboard focus, selected-day navigation and in-place activity progress improve interaction while preserving saved data.

### Implementado en V8.11.0

- Fotografías reemplazadas por el propietario y conservadas en WebP reducido. Antes de esta intervención ya pesaban 2.134.926 bytes (20 archivos), frente a 9.143.271 bytes en V8.10.0: reducción del 76,65 %, atribuida a su actualización.
- Galería oculta con POI/rodaje en Solo itinerario; visible con proporción completa al volver a Vista completa.
- Carga diferida en imágenes secundarias, decodificación asíncrona, dimensiones reales en `PHOTO_DIMENSIONS`; portada eager/prioridad alta.
- Corregidas asociaciones de fotos al modelo compuesto; Santo Niño y Barajas reutilizan su archivo correcto. Nuevos POI solo se enlazan cuando existe su fotografía, sin suplirlos con otro lugar.
- PHOTO-CREDITS documenta fuentes, autores, licencias, modificaciones y cualquier verificación pendiente; disponible desde el pie ES/EN y en caché.
- No alterar marcador de migración 8.7, estado personal ni bandera superior.

### Implementado en V8.10.0

- Iconos PNG de instalación/arranque/favicon derivados del SVG existente, con tamaños 192/512 y versión maskable. No modificar `flag-ph.svg` ni tamaño/posición de la bandera superior. Nuevos nombres de archivo; PNG antiguos retirados.
- Alojamiento flexible sin reserva en las noches del 01/10, 06/10, 10–11/10 y 13–19/10. V8.12.0 sustituye la situación anterior de Kisolon por bungalow previsto en Campvill para las noches 07–09/10, sin afirmar reserva confirmada. No añadir hoteles ficticios ni enlaces de reserva inexistentes. No convertir noches de vuelo/ferry en noches de hotel.
- Buscar alojamiento pendiente al inicio de cada estancia (días 6, 11, 15, 18 desde V8.12.0). No duplicar diariamente.
- P1: tres casillas por fecha con IDs estables y dos clips complementarios de solo lectura. Almacenamiento `filipinasP1_YYYY-MM-DD`: objeto `{id: boolean}`; leer fresco, guardar al marcar, revertir checkbox y avisar si falla. Datos inválidos no se sobrescriben. No exportar automáticamente casillas con el diario.
- `shooting-data.js` adapta la guía suministrada a las preferencias vigentes: 16:9, ND8 polarizado, tres P1 realizables, Cebú condicional y alojamientos flexibles.
- Revisión bilingüe de pautas detalladas: eliminar duración antigua de 26 días, alojamiento familiar supuesto y afirmaciones geográficas superlativas no necesarias; mantener seguridad y permisos.
- Actividades renombradas usan ID estable y `legacyTitle` / `legacyTitles` solo para leer progreso existente. Si el nuevo valor está guardado, prevalece incluso cuando es falso. No ejecutar otra migración 8.7. La nueva búsqueda de alojamiento no hereda una casilla antigua.
- Exportaciones UTF-8 con BOM (`EF BB BF`) para mejorar autodetección. No transformar el texto guardado ni prometer compatibilidad con lectores que fuerzan otra codificación.
- Retirados Ver Día 1, traducciones, controlador y regla CSS adyacente sin uso.

### Conservado de V8.9.0

- Exportar todas las notas desde el menú a un único Markdown UTF-8 por día/fecha/lugar; omitir vacías y conservar el texto. Incluir borradores en memoria cuando se puede leer el diario; bloquear con aviso si no se puede leer, sin exportación parcial silenciosa.
- Desde V8.11.0 Solo itinerario oculta POI, rodaje y galería. Diario, presupuesto y actividades siguen visibles. Etiquetas ES/EN Solo itinerario / Vista completa.
- Presupuesto global en el diálogo del menú, con total editable, resumen, saldo incluso negativo, lista plegable por día/categoría y totales por categoría.
- Editor y almacenamiento compartidos entre vistas global/diaria. Fecha y categoría editables, importes PHP con dos decimales, eliminación confirmada y refresco de ambas vistas.
- Exportación de resumen, categorías y todos los gastos a un único Markdown. Sin red ni mutaciones al exportar. Los conceptos se escapan como texto Markdown.
- Errores de escritura conservan el formulario. Los gastos se normalizan en memoria, sin reescribir por consultar. Datos ilegibles bloquean edición/exportación con aviso.
- Exportación/importación no son equivalentes: no se implementan restauración, sincronización ni copias automáticas. Un ZIP del repositorio no incluye datos del navegador.

### Conservado de V8.8.1

- Lugares ordenados por primera fecha del itinerario, preservando claves y etapas de regreso.
- Arranque en el día actual local, sin restaurar el último día consultado. Antes/después del viaje: primer/último día. La navegación manual se mantiene durante la sesión; no se fuerza un cambio al volver del segundo plano.
- Seis presets y excepciones diarias en 16:9; indicación visible ES/EN sobre el ND8 polarizado según el preset. La instrucción del propietario prevalece sobre el 4:3 de la guía fuente.
- ND8 polarizado opcional, no universal: comprobar exposición/reflejos; retirar con poca luz y bajo el agua, priorizar nitidez/estabilización en movimiento.
- 14 pruebas automatizadas superadas; ver [QA V8.8.1](tests/QA_V8.8.1.md). Integrada en `main` (`5ecffe5`), [Pages correcto](https://github.com/NachHR/Filipinas/actions/runs/35182425077) y funcionamiento validado por el propietario.

### Implementado en V8.8.0

- Diario personal por fecha para los 29 días: texto libre, guardado inmediato y última edición.
- Campo visible bajo el contexto Hoy, sin diálogo ni botones nuevos en la cabecera.
- Notas accesibles también en días pasados/futuros; encabezado con fecha seleccionada.
- Consulta documental diaria: preset, excepción técnica y 1–3 precauciones visibles; técnica ampliada y checklist plegables.
- Guía ES/EN basada en el documento de grabación actualizado de 29 días. Las notas personales no se traducen.
- Cebú, días 18–24, permanece como `editorial-proposal`; el itinerario sigue pendiente.
- En V8.8.0 el control solo ocultaba grabación; V8.9.0 amplía el modo solo itinerario a POI.
- Nuevos módulos y estilos incluidos en la shell offline.
- Eliminado render/formulario de presupuesto obsoleto y adaptador `L()` sin uso.
- Actualizaciones del worker con confirmación; no activación inmediata al instalar una versión nueva.

### Estado técnico

- Badge y CSS/JS: `8.12.0`; Service Worker: `filipinas-v8-12-0`.
- README, CHANGELOG y este documento reflejan V8.12.0 implementada y V8.11.0 validada por el propietario.
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

- `data.js`: alojamiento Campvill, actividades y enlaces de alojamiento revisados en V8.12.0. `flights.js` centraliza los seis tramos y enriquece las actividades tras componer los 29 días; no publica localizadores. `documentary-data.js` mantiene presets y aclara contexto de estancia.
- `journey.js`: composición de 29 días y migración heredada; no modificado en V8.8.0.
- `i18n.js`: única fuente de textos de interfaz ES/EN.
- `script.js`: coordinador de estado, navegación y render, no un módulo monolítico.
- `images/`: fotos locales actualizadas; fuentes y licencias revisadas en PHOTO-CREDITS.
- `photos.js` resuelve las rutas históricas de imágenes presentes en `data.js` antes de renderizar. La revisión comprueba el modelo compuesto, no solo cadenas de archivos aislados: Referencias y dimensiones comprobadas en los 29 días. `PHOTO_VERSION='8.12.0'` identifica la capa fotográfica vigente.
- El nombre heredado `itineraryOnly` y la clave de checklist `macro` permanecen para compatibilidad; sus etiquetas/UI se aclaran.

## 3. Archivos y responsabilidades

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Shell, badge y orden de scripts/estilos |
| `data.js` | Itinerario base y pautas existentes |
| `journey.js` | Composición puerta a puerta y migración 8.7 |
| `documentary-data.js` | Seis presets y 29 pautas bilingües por fecha |
| `shooting-data.js` | Tres P1 con IDs estables y dos clips complementarios por día |
| `scripts/build-icons.cjs` | Generación de PNG desde el SVG de cabecera intacto |
| `documentary.js` | Consulta documental, detalle y checklist compatible |
| `journal.js` | Diario, validación, autoguardado y borrador ante errores |
| `field-notes.css` | Cuaderno y tarjetas de consulta rápida |
| `i18n.js` | Catálogo ES/EN y traducción de la shell |
| `today.js` / `flights.js` | Contexto temporal y vuelos/check-ins |
| `budget.js` / `budget.css` | Presupuesto global/diario, editor compartido y exportación |
| `exports.js` | Descargas Markdown UTF-8 y escape de conceptos |
| `photos.js` / `images/` | Fotografías locales |
| `script.js` | Coordinación, eventos, render y actualizaciones |
| `style.css` / `today.css` | Estilos generales y contexto Hoy |
| `service-worker.js` | Shell, caché y actualización con confirmación |
| `manifest.json` | Instalación PWA |
| `tests/app.test.cjs` | Regresión DOM y worker simulado |
| `tests/QA_V8.12.0.md` | QA de vuelos, Campvill, imágenes, firma y controles |
| `tests/QA_V8.11.0.md` | Evidencia histórica de fotografías y rendimiento |
| `tests/QA_V8.10.0.md` | QA de iconos, alojamientos, P1 y bytes UTF-8 con BOM |
| `tests/QA_V8.9.0.md` | Evidencia histórica de exportación y presupuesto |
| `tests/QA_V8.8.0.md` / `tests/QA_V8.8.1.md` | Evidencia histórica |
| `package.json` / `package-lock.json` | Herramientas de pruebas; no hay build requerido |
| `README.md` / `CHANGELOG.md` | Uso, estado e historial |
| `PHOTO-CREDITS.md` | Créditos/licencias revisados y disponibles offline |
| `PROJECT_MASTER.md` | Este documento |

Carga: datos → composición del viaje → módulos existentes → datos documentales/diario/render documental → coordinador. No modificar IDs para acoplar la guía.

## 4. QA y publicación

### V8.12.0

32 pruebas superadas, incluidas cinco nuevas regresiones de vuelos, Campvill/fotos/firma, conservación de foco y estado al marcar actividades, navegación sucesiva y teclado del menú. Archivos de imagen inspeccionados visualmente; medidas, créditos y caché comprobados. Sin prueba real de smartphone en esta intervención. Ver [QA V8.12.0](tests/QA_V8.12.0.md).

### V8.11.0

27 pruebas de regresión, incluyendo imágenes de los 29 días ES/EN, asociaciones, archivos locales, presupuesto de peso y galería tras alternar, navegar y recargar. Véase [QA V8.11.0](tests/QA_V8.11.0.md). No equivale a una prueba real de red/offline en smartphone.

### V8.10.0

25 pruebas superadas. Las cinco nuevas cubren P1 en los 29 días ES/EN y persistencia/errores, alojamientos flexibles, conservación de actividades marcadas, firma binaria UTF-8, iconos/manifest y eliminación del botón. SVG de cabecera verificado por hash. PNG generados inspeccionados visualmente. Ver [QA V8.10.0](tests/QA_V8.10.0.md).

### Evidencia V8.9.0

20 pruebas automatizadas superadas: las 14 regresiones previas más 6 casos de exportaciones, errores, CRUD compartido, decimales, subtotales, datos heredados y visibilidad. Ver [QA V8.9.0](tests/QA_V8.9.0.md). No se certifica instalación Android ni descarga real móvil mediante pruebas DOM. Validar en dispositivo tras publicar.

El propietario solicita trabajar directamente sobre `main`; no abrir una rama adicional para esta entrega.

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

Validar V8.12.0 en el smartphone y preparar la auditoría final V9.0. Conservar los créditos y sus límites documentados; el propietario ha pospuesto la investigación adicional de licencias. La validación comunicada no detalla resultados por dispositivo, modo avión o actualización; conservar esas comprobaciones en el cierre final. Mantener marcador de migración `8.7`.

### Protección de datos pendiente

La exportación manual está implementada. Importación, copias automáticas y sincronización siguen fuera de alcance. Conservar las descargas fuera del navegador si se van a borrar sus datos.

### Ubicación opcional — Sin versión asignada

«Estoy aquí», solo bajo acción explícita; contextualizar lugar y accesos a Maps sin rastreo ni almacenamiento persistente de ubicación por defecto. Pospuesto tras la exportación del diario.

### Modo documental posterior

La consulta rápida, checklist P1 y recomendaciones de clips están implementadas. Siguen fuera de alcance el registro de archivos de clips, editor de guion/presets, montaje, multimedia y sincronización. Decidir su prioridad tras usar el cuaderno, sin asumir que sean necesarios antes del viaje.

Confirmar reparto/alojamiento de Cebú, ferris, accesos, operadores y actividades antes de promover cualquier propuesta a itinerario real.

### V9.0 — Consolidación

Auditoría UX móvil/offline/accesibilidad, limpieza de duplicados restantes, revisión de fechas/vuelos/alojamientos/enlaces, optimización y congelación de funciones no esenciales antes del viaje.

Mantenimiento: atribuciones disponibles de imágenes, tamaño offline, duplicidad de datos de vuelos y comportamiento de fechas locales. Cualquier cambio de lógica temporal o migración requiere pruebas propias, no ocultarlo en una limpieza.

## 6. Criterio para futuras versiones

¿Es útil durante el viaje? ¿Funciona offline o explica sus límites? ¿Tiene lugar lógico sin saturar navegación? ¿Preserva datos? ¿Necesita realmente backend/dependencias? ¿Se puede probar antes de publicar?

**Fiabilidad durante el viaje > simplicidad > funcionalidad adicional > complejidad técnica.**
