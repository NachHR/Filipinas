# QA — V8.8.1 Ajustes de navegación y rodaje

Implementación: 17/09/2026, sobre `cb49ce4`. Integración directa en main solicitada por el propietario. Despliegue pendiente de verificación tras el commit.

## Automatizado

`npm test`: 14 pruebas de regresión DOM/worker simulado.

- Navegación de lugares cronológica en ES/EN incluso con colecciones desordenadas; cada botón abre la primera fecha de su etapa.
- Arranque antes/durante/después del viaje y en límites de medianoche local, ignorando selección anterior; navegación manual y notas conservadas al recargar.
- Seis presets y 29 días en ES/EN: 16:9, filtro visible y sin recomendaciones 4:3.
- Conservación de diario, presupuesto y checklist, errores de almacenamiento, versiones y recursos offline; worker elimina cachés anteriores de la app, incluida V8.8.0.
- Migración `8.7` sin cambios. No se añaden PDFs ni datos privados.

## Pendiente en dispositivo real

- Actualizar PWA instalada V8.8.0 → V8.8.1, comprobar badge, notas y casillas.
- Probar arranque y recarga en modo avión tras cargar online; revisar navegación móvil y legibilidad del filtro.
- Confirmar fecha local al cambiar de zona horaria. Volver desde segundo plano no fuerza navegación ni interrumpe una nota.
- Las pruebas DOM y del worker simulado no certifican comportamiento visual ni instalación Android.

## Fuentes y alcance

La preferencia del propietario (todo en 16:9 y ND8 polarizado disponible) prevalece sobre el preset 4:3 del documento original. Compatibilidad de formatos/estabilización: https://www.dji.com/osmo-action-4/specs . Las pautas son orientativas; no se atribuye al filtro una transmisión combinada ni un mecanismo ajustable sin conocer su modelo.

Exportación a un único Markdown por días reservada para V8.9.
