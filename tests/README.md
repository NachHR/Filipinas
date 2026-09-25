# Pruebas y registros QA

`app.test.cjs` contiene las pruebas de regresión con jsdom y un Service Worker simulado. Se ejecutan desde la raíz del repositorio, con Node >=22.19:

```sh
npm ci
npm test
```

Las pruebas automatizadas cubren lógica, DOM, datos locales y caché simulada. La instalación PWA, los gestos, el aspecto visual y el modo avión deben comprobarse en un dispositivo real.

## Comprobación puntual de V8.12.2 — 2026-09-25

Sintaxis de los tres archivos de contenido modificados y composición del modelo comprobadas: 29 días, 29/09 como día 4, seis actividades con títulos ES/EN, tres POI y alojamiento CDO conservado. Sin QA completo, pruebas en smartphone ni verificación de horarios o accesos del festival. Esta revisión no sustituye la validación del propietario.

## Estado de V8.12.1

No se completó la ejecución de QA: se interrumpió al recibir la indicación del propietario de omitirla para esta corrección. No se atribuyen resultados nuevos a esta entrega. V8.12.0 fue validada por el propietario el 24/09/2026.

## Registros por entrega

Cada informe recoge las comprobaciones realizadas, sus límites y los pasos manuales pendientes en esa fecha. Conservarlos como evidencia; no actualizar sus resultados históricos al cambiar el código.

| Entrega | Registro |
|---|---|
| V8.12.0 | [Vuelos, Campvill, fotografías y UX](QA_V8.12.0.md) |
| V8.11.0 | [Fotografías y rendimiento](QA_V8.11.0.md) |
| V8.10.0 | [Iconos, alojamientos, rodaje y exportaciones](QA_V8.10.0.md) |
| V8.9.0 | [Diario y presupuesto exportables](QA_V8.9.0.md) |
| V8.8.1 | [Navegación y presets](QA_V8.8.1.md) |
| V8.8.0 | [Cuaderno de campo](QA_V8.8.0.md) |

El registro de V8.12.0 corresponde a la entrega inicial. La foto y los enlaces de High Ridge se incorporaron después sin ejecutar pruebas, a petición del propietario. La limpieza documental posterior tampoco ejecuta pruebas funcionales.

El estado vigente y los siguientes pasos se mantienen en [PROJECT_MASTER](../PROJECT_MASTER.md); los cambios posteriores, en [CHANGELOG](../CHANGELOG.md).
