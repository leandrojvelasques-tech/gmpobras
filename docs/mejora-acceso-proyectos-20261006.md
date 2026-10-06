# Acceso a proyectos desde la home

Fecha: 6 de octubre de 2026.

## Cambio implementado

La sección de obras conserva la presentación, la ficha breve y los testimonios en video. El enlace «Ver proyecto y fotos» abre `/proyectos/{slug}`. Cada obra de la lista tiene además un enlace «Ver proyecto», disponible sin seleccionar primero su presentación.

Las fotos se recorren en la página individual. Volar Sin Escalas conserva sus dos etapas. «Volver a proyectos» regresa a `/#obras`.

## Fuentes

- Pedido y captura del usuario.
- Home publicada en https://www.gmpobras.com.ar/#obras, revisada en navegador.
- Páginas, contenidos y activos existentes del repositorio, base `56f0f91`.

No se incorporaron activos ni datos nuevos.

## Verificación

- `npm test`: 14 pruebas aprobadas.
- `npm run build`: compilación completa.
- `git diff --check`: aprobado.
- Navegador de escritorio: enlaces a Gabriel y Volar Sin Escalas, avance de fotos, cambio a etapa 2 y regreso a la sección de obras.
- Navegador móvil de 390 × 844: selección de Javier, apertura de su página y lista de enlaces; sin desborde horizontal.
- Capturas locales: `outputs/proyectos-desktop.png` y `outputs/proyectos-mobile.png`.

## Estado

Relevado, diseñado e implementado. Verificado en vista previa local. Publicación y verificación productiva pendientes de autorización explícita, según AGENTS.md.

## Ajuste durante la verificacion productiva

La primera publicacion expuso un error de navegacion del componente Link de Vinext que no se reproducia en desarrollo. Los accesos a las paginas de proyectos y el regreso a la home utilizan enlaces HTML para asegurar la navegacion completa.
