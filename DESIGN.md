---
name: ReciVolt
description: Lenguaje de diseño compartido basado en la vista del ciudadano.
colors:
  primary: '#246440'
  primaryDark: '#174F32'
  primarySoft: '#E7F3EB'
  surfaceSoft: '#F1F7F3'
  accent: '#50B43C'
  brandDark: '#10282C'
  impactValue: '#0B5C27'
  impactWeight: '#0E5C28'
  danger: '#A30303'
  dangerBackground: 'rgba(179, 38, 30, 0.16)'
  background: '#F8FBF9'
  surface: '#FFFFFF'
  tabBarBackground: '#FFFFFF'
  impactBackground: '#E8F3EC'
  avatarBackground: '#D9D9D9'
  text: '#102530'
  textSecondary: '#53676D'
  textOnPrimary: '#FFFFFF'
  border: '#E2EBE6'
  borderPrimary: '#246440'
  navInactive: '#748591'
typography:
  greeting:
    fontFamily: Roboto
    fontSize: 27px
    fontWeight: 700
    letterSpacing: -0.6px
  page-title:
    fontFamily: Roboto
    fontSize: 26px
    fontWeight: 700
    lineHeight: 34px
  screen-title:
    fontFamily: Roboto
    fontSize: 20px
    fontWeight: 700
    lineHeight: 26px
  section-title:
    fontFamily: Roboto
    fontSize: 19px
    fontWeight: 500
    lineHeight: 27px
  reward-title:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 700
    lineHeight: 20px
  body:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
  operational-body:
    fontFamily: Roboto
    fontSize: 15px
    fontWeight: 400
    lineHeight: 23px
  hint:
    fontFamily: Roboto
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
  button-label:
    fontFamily: Roboto
    fontSize: 16px
    fontWeight: 500
  label:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 500
  chip-label:
    fontFamily: Roboto
    fontSize: 12px
    fontWeight: 400
  nav-label:
    fontFamily: Roboto
    fontSize: 11px
    fontWeight: 400
  balance:
    fontFamily: Roboto
    fontSize: 40px
    fontWeight: 700
    lineHeight: 44px
rounded:
  field: 8px
  auth-field: 10px
  inset: 12px
  note: 14px
  reward: 15px
  button: 16px
  card: 18px
  quick-access: 19px
  points: 22px
  chip: 24px
spacing:
  micro: 4px
  small: 8px
  inline: 12px
  block: 16px
  page: 20px
  section: 24px
  bottom: 32px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.textOnPrimary}'
    typography: '{typography.button-label}'
    rounded: '{rounded.button}'
    padding: 12px 20px
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.primary}'
    typography: '{typography.button-label}'
    rounded: '{rounded.button}'
    padding: 12px 20px
  field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    typography: '{typography.operational-body}'
    rounded: '{rounded.field}'
    padding: 12px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.text}'
    rounded: '{rounded.card}'
    padding: '{spacing.block}'
  chip:
    backgroundColor: '{colors.surfaceSoft}'
    textColor: '{colors.text}'
    typography: '{typography.chip-label}'
    rounded: '{rounded.chip}'
  chip-selected:
    backgroundColor: '{colors.primaryDark}'
    textColor: '{colors.textOnPrimary}'
    typography: '{typography.chip-label}'
    rounded: '{rounded.chip}'
  screen-header:
    backgroundColor: '{colors.background}'
    textColor: '{colors.text}'
    typography: '{typography.screen-title}'
    padding: 8px 12px
  bottom-navigation:
    backgroundColor: '{colors.tabBarBackground}'
    textColor: '{colors.navInactive}'
    typography: '{typography.nav-label}'
  points-card:
    backgroundColor: '{colors.primarySoft}'
    textColor: '{colors.text}'
    rounded: '{rounded.points}'
    padding: 18px 16px
---

# Lenguaje de diseño de ReciVolt

## Overview

**Creative North Star: "Naturaleza cercana"**

ReciVolt debe sentirse clara, amable y confiable. La referencia principal es la vista del ciudadano: verde natural, fondo casi blanco, tarjetas suaves, Roboto y acciones fáciles de reconocer. Las ilustraciones de hojas y planeta acompañan el impacto ambiental; los datos, mapas y acciones tienen prioridad visual.

Este documento es obligatorio para agentes, desarrolladores, diseñadores y cualquier persona que cambie la interfaz. Se aplica a la vista del ciudadano, autenticación, empresa y administración. Empresa y admin admiten mayor densidad de información; conservan la identidad de la app.

**Key Characteristics:**

- Verde profundo para acciones y selección; verde suave para información y acompañamiento.
- Texto oscuro, títulos claros y espacios que permiten leer sin esfuerzo.
- Bordes curvos, capas blancas y sombras ambientales discretas.
- Fotos de premios, mapa real e ilustraciones ecológicas propias según su función.
- Español cercano con voseo y nombres consistentes.

**The Una sola identidad Rule.** Cambiar de rol cambia las tareas disponibles, no la marca, la familia tipográfica ni el header.

### Autoridad y mantenimiento

Las decisiones explícitas más recientes del usuario tienen prioridad. Para el resto, esta guía rige el diseño; el mockup original sirve como referencia visual y no revierte cambios posteriores de navegación o contenido. Las recomendaciones genéricas de herramientas o skills se adaptan a esta identidad.

Los valores del frontmatter son la referencia documentada. Su implementación está en [colors.ts](src/theme/colors.ts), [typography.ts](src/theme/typography.ts) y los componentes compartidos indicados más abajo. `navInactive` documenta un valor observado en la navegación; todavía no es una propiedad del objeto `colors`. Las escalas de tamaño, radio y espaciado documentan estilos existentes, no un módulo de tokens ya implementado. Las medidas se expresan en unidades de layout de React Native; `px` permite exportarlas a herramientas web.

Si código y guía difieren, identificar la desviación y corregirla dentro del alcance del trabajo. No convertir un estilo aislado en una nueva regla ni cambiar la identidad global de manera incidental. Cuando se apruebe un cambio del sistema, actualizar componente, tema, esta guía y su representación en `.impeccable/design.json` juntos. Los ejemplos de ese archivo son muestras estáticas para documentación, no componentes de producción.

### Acuerdo para agentes y colaboradores

**The Revisión obligatoria Rule.** Toda contribución de interfaz, humana o asistida por IA, debe leerse y revisarse contra `DESIGN.md` antes de considerarse terminada. Corregir las desviaciones introducidas y registrar la evidencia de revisión y los pendientes. Una revisión no realizada no se declara aprobada.

Antes de trabajar, leer [AGENTS.md](AGENTS.md) y [CONTRIBUTING.md](CONTRIBUTING.md), e identificar los componentes compartidos que se reutilizarán. Esto incluye prototipos, imágenes de referencia y trabajos iniciados desde Trello. Las skills y los generadores se adaptan a esta guía. Las reglas locales de una herramienta deben remitir a estos documentos para evitar versiones contradictorias.

La entrega de una tarea o PR con cambios visuales incluye capturas de las pantallas afectadas en móvil y escritorio, los estados comprobados y cualquier limitación de la revisión. Si falta una comprobación, registrarla como pendiente; una captura no acredita pruebas físicas ni cumplimiento completo de accesibilidad. Los cambios sin efecto visual pueden indicar que este criterio no aplica y explicar por qué.

El autor y quien revisa usan la checklist final de esta guía. Una desviación de identidad requiere una decisión explícita del usuario; documentar esa decisión y actualizar las fuentes compartidas al implementarla. Crear una imagen o registrar una tarea no cambia por sí solo la interfaz en producción.

## Colors

Usar los nombres semánticos del tema mediante `@/theme`. Las ilustraciones y el mapa pueden tener sus propios colores; esos colores no crean variantes de botones ni una segunda paleta para formularios.

| Familia            | Tokens                                                | Uso                                                                                         |
| ------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Verde bosque       | `primary`, `primaryDark`, `borderPrimary`             | Acción principal, selección, enlaces y contornos de acciones secundarias.                   |
| Verde suave        | `primarySoft`, `surfaceSoft`, `impactBackground`      | Resumen de puntos, avisos informativos, categorías y bloques de impacto.                    |
| Verde de impacto   | `accent`, `impactValue`, `impactWeight`               | Detalles de ilustración y métricas ambientales existentes; no sustituye el verde de acción. |
| Superficies claras | `background`, `surface`, `tabBarBackground`, `border` | Fondo de pantalla, tarjetas, navegación y separación de contenido.                          |
| Tinta y gris       | `text`, `textSecondary`, `brandDark`                  | Títulos, contenido principal, ayudas y metadatos.                                           |
| Estado crítico     | `danger`, `dangerBackground`                          | Errores y acciones destructivas con texto que explique su efecto.                           |
| Apoyos existentes  | `avatarBackground`, `navInactive`, `overlay`         | Avatar sin foto, navegación inactiva y capa modal translúcida.                             |

**The Color con significado Rule.** El verde identifica acciones y selección; el rojo identifica problemas o consecuencias destructivas. Un estado siempre lleva texto o icono comprensible además del color.

Para nuevos usos, verificar contraste sobre la superficie real. No asumir que un color válido en una ilustración, un icono o una navegación pequeña sirve para párrafos. No crear fondos oscuros o colores de marca alternativos para empresa o admin sin una decisión explícita de identidad.

## Typography

Roboto es la única familia de interfaz. Importar `fonts` del tema: `regular` carga Roboto 400, `semiBold` carga Roboto **500** y `bold` carga Roboto 700. El nombre `semiBold` es una clave histórica; no significa peso 600. Una dependencia instalada de otra fuente no autoriza a usarla.

| Rol del frontmatter                       | Aplicación                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------- |
| `greeting`                                | Saludo de Inicio. No usarlo como header de otras pantallas.                 |
| `screen-title`                            | Título centrado de `ScreenHeader`.                                          |
| `page-title`                              | Título dentro de una ficha o detalle; evitar duplicar el título del header. |
| `section-title`, `reward-title`           | Secciones y nombres de premios.                                             |
| `body`, `operational-body`                | Explicaciones y contenido de formularios o gestión.                         |
| `hint`, `label`                           | Ayudas, metadatos y etiquetas de campo.                                     |
| `button-label`, `chip-label`, `nav-label` | Controles específicos; no convertir sus tamaños en texto de lectura.        |
| `balance`                                 | Saldo principal, con cifras tabulares para evitar saltos al actualizar.     |

**The Jerarquía antes que tamaño Rule.** Usar peso, espacio y agrupación para ordenar la información. Reservar las cifras grandes para el saldo y los títulos grandes para el contenido que realmente encabezan.

Mantener mayúsculas y minúsculas naturales: “Puntos verdes”, “Ver detalle”, “Crear cuenta”. No usar mayúsculas completas para todos los botones. Permitir ajuste de texto y crecimiento de las filas; los nombres largos no deben tapar iconos o acciones. En tarjetas de premio se admiten dos líneas de título y una de entidad; en detalles se muestra la información completa.

## Layout

La composición parte del móvil y se amplía con contenedores centrados. No estirar formularios o tarjetas a todo el ancho de un monitor.

| Superficie               | Implementación de referencia                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Inicio                   | Contenido centrado, ancho máximo (720), margen interior `spacing.page` y separación `spacing.block`.                               |
| Vista ciudadana interior | `CitizenPage`: ancho máximo (960), margen interior `spacing.page`, separación `spacing.block` y espacio inferior `spacing.bottom`. |
| Formulario de portal     | `PortalPage`: ancho máximo (960), margen y separación `spacing.section`.                                                           |
| Empresa                  | `CompanyPage` sobre `PortalPage`: panel "Mi empresa" con menú de filas y una pantalla por sección, ancho máximo (960).           |
| Admin                    | `AdminPage`: ancho máximo (960), margen exterior `spacing.block`, panel blanco con margen y separación `spacing.page`.             |
| Catálogo de premios      | Dos columnas en móvil, tres desde (650) y cuatro desde (900); mantener el límite del contenedor.                                   |

La escala documentada es una selección de espacios repetidos, no una orden de redondear todos los valores existentes a múltiplos de ocho. Reutilizar las medidas del componente correspondiente.

**The Header compartido Rule.** Todas las pantallas salvo Inicio usan `ScreenHeader`: volver a la izquierda, título centrado y un espacio de acción a la derecha del mismo ancho. El header queda fuera del scroll del contenido. No agregar un segundo header de marca en admin, empresa o autenticación.

Respetar áreas seguras y reservar espacio para la navegación inferior. En formularios largos, mantener etiquetas junto a sus campos y acciones cerca del contenido que modifican. En gestión, las pestañas pueden desplazarse horizontalmente; el contenido principal no debe exigir scroll horizontal para leer o editar.

Al volver a una sección, su scroll vertical comienza arriba mediante `useScrollReset`. Esto no implica borrar filtros, datos ingresados o la posición del mapa.

## Elevation & Depth

La profundidad se obtiene con superficies blancas sobre el fondo claro, verdes suaves y sombras de baja opacidad. Evitar sombras negras duras, brillo y capas translúcidas que dificulten leer.

| Tratamiento existente | Sombra                           | Referencia                |
| --------------------- | -------------------------------- | ------------------------- |
| Tarjeta ciudadana     | `0 4px 16px rgba(22,65,39,0.05)` | `rewardStyles.card`       |
| Premio                | `0 3px 12px rgba(22,65,39,0.06)` | `RewardCard`              |
| Resumen de puntos     | `0 7px 20px rgba(22,65,39,0.10)` | `PointsCard`              |
| Acceso rápido         | `0 5px 16px rgba(22,65,39,0.08)` | `QuickAccess`             |
| Mapa de Inicio        | `0 5px 18px rgba(31,75,48,0.07)` | Tarjeta de mapa en Inicio |

**The Profundidad discreta Rule.** Las tarjetas ciudadanas pueden usar su sombra compartida. Las filas y paneles de gestión se separan con borde y espacio; no acumular una sombra en cada nivel anidado.

El degradado existente de `PointsCoin` pertenece a la ilustración de la moneda. No extenderlo a fondos de pantalla ni a los botones sólidos. Los cambios de estado usan respuesta visual breve, como la opacidad del botón; evitar animaciones decorativas continuas. Respetar movimiento reducido si se incorpora una animación nueva.

## Shapes

Las curvas transmiten cercanía y ayudan a distinguir controles, tarjetas y figuras orgánicas. Elegir el radio por el componente, no al azar.

| Forma                                 | Token o tratamiento                                  |
| ------------------------------------- | ---------------------------------------------------- |
| Campo de gestión y buscador de puntos | `rounded.field`                                      |
| Campo de autenticación                | `rounded.auth-field`                                 |
| Panel de gestión y foto interior      | `rounded.inset`                                      |
| Aviso                                 | `rounded.note`                                       |
| Tarjeta de premio                     | `rounded.reward`                                     |
| Botón principal y secundario          | `rounded.button`                                     |
| Tarjeta ciudadana                     | `rounded.card`                                       |
| Acceso rápido de Inicio               | `rounded.quick-access`                               |
| Resumen de puntos                     | `rounded.points`                                     |
| Categoría                             | `rounded.chip`                                       |
| Avatar y moneda                       | Círculo; no usar esta forma para todas las acciones. |

Conservar el recorte de las fotos dentro de sus tarjetas y separar la imagen del texto. Hojas y planeta usan las formas de `EcoArtwork`; no sustituirlas por emojis o ilustraciones de otro estilo.

## Components

### Componentes que se deben reutilizar

| Necesidad                                           | Fuente compartida                                                                                 |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Header de pantalla                                  | [ScreenHeader](src/components/ui/ScreenHeader.tsx)                                                |
| Acción principal o secundaria                       | [ActionButton](src/components/ui/ActionButton.tsx)                                                |
| Tarjeta informativa, fila de datos y código         | [InfoCard](src/components/ui/InfoCard.tsx)                                                        |
| Selector numérico accesible (+ / -)                 | [NumericStepper](src/components/ui/NumericStepper.tsx)                                             |
| Página, tarjetas, saldo, premio y aviso ciudadano   | [RewardsUI](src/components/rewards/RewardsUI.tsx)                                                 |
| Página, campos, selector, menú, pestañas y estados de gestión | [PortalUI](src/components/portal/PortalUI.tsx), [CompanyPage](src/components/portal/CompanyPage.tsx) y [AdminPage](src/components/portal/AdminPage.tsx) |
| Campo de autenticación                              | [AuthTextField](src/components/auth/AuthTextField.tsx)                                            |
| Buscar puntos verdes                                | [SearchBar](src/components/discovery/SearchBar.tsx)                                               |
| Hoja, moneda, planta y planeta                      | [EcoArtwork](src/components/ui/EcoArtwork.tsx)                                                    |
| Scroll al regresar                                  | [useScrollReset](src/hooks/useScrollReset.ts)                                                     |

**The Reutilizar antes de crear Rule.** Revisar estos componentes antes de escribir una nueva versión local. Si falta una variante repetible, ampliar el componente compartido en lugar de copiarlo en cada pantalla.

### Header y navegación

`ScreenHeader` tiene altura mínima (72), controles de volver y acción con ancho (44), y título de hasta dos líneas. El espacio derecho se conserva aunque no tenga acción, para mantener el título centrado. Inicio usa su hoja, nombre de marca y acceso al perfil.

La barra ciudadana contiene **Inicio · Puntos verdes · Premios · Perfil**, en ese orden. Sección activa en verde con icono lleno; inactiva con icono de contorno. “Mis entregas” se encuentra en Perfil; el acceso rápido de Inicio puede llevar allí. La sección del mapa se llama “Puntos verdes”. El mapa ocupa el bloque de Inicio que antes mostraba premios destacados. Las capturas antiguas con otra navegación no son referencia de estructura.

**Decisión aprobada el 26/10/2026, pendiente de implementación:** agregar Marketplace junto a Premios: **Inicio · Puntos verdes · Premios · Marketplace · Perfil**. La sección se llama Marketplace y sus productos, “Dispositivos reacondicionados”. Empresa administra su catálogo; el detalle del punto verde muestra hasta cuatro productos y “Ver catálogo completo”; Marketplace reúne los productos de todas las empresas. Las tareas MK-01 a MK-08 están en Trello. Esta decisión no significa que las pantallas ya estén implementadas; al implementarlas, actualizar también la muestra de navegación de `.impeccable/design.json`.

Empresa navega desde el panel "Mi empresa": acción principal del escáner arriba y un menú de filas con chevron que abre cada sección en su propia pantalla con `ScreenHeader`. Las pestañas operativas de admin permanecen debajo del mismo header. No reemplazarlo por un sidebar, una barra oscura o un título distinto por cada pestaña.

### Botones y campos

`ActionButton` usa altura mínima (50), variante sólida o secundaria con borde. Elegir una acción principal por bloque de tarea. Durante el envío, mostrar carga y deshabilitar el control; la opacidad actual de pulsación, carga o deshabilitado es (0.7). No comunicar una acción destructiva sólo cambiando el color.

Los campos tienen etiqueta persistente, borde suave y fondo blanco. El placeholder muestra un ejemplo o una pista y no reemplaza la etiqueta. Reutilizar la variante de autenticación o gestión según el contexto. Los campos compactos numéricos de gestión usan el ancho existente (96); no aplicar ese ancho a direcciones o nombres. Mostrar validación junto al campo y conservar el contenido cuando falla el envío.

### Tarjetas, puntos y premios

`InfoCard` provee la estructura unificada de tarjeta con icono circular, título, subtítulo, accesorio lateral (`CodePill` o badge de estado) y contenido expandible opcional (stepper, subtotales o divisores). Soporta variante estándar y destacada (`highlight`).

`PointsCard` muestra “Tus puntos”, moneda ecológica y saldo global con protagonismo. El resumen general no se presenta como una cuenta distinta por empresa. Los puntos canjeables son el único saldo del ciudadano. No hay XP, niveles ni barras de progreso. El impacto se explica con orientación para entregar RAEE, sin métricas inventadas.

Un premio muestra foto, título, entidad, costo en puntos y “Ver detalle”. El costo debe ser fácil de encontrar. Usar fotos pertinentes, con recorte consistente; si falta la imagen, usar el placeholder existente. Los chips cambian de fondo claro a verde profundo al seleccionarse; conservar el texto legible y comunicar la selección a tecnologías de asistencia.

No mostrar datos ficticios como saldo, stock, canje o impacto real. Los ejemplos del catálogo deben conservar su aviso de muestra y no habilitar un canje real. Un dato que no cargó no se representa como cero.

### Mapa e iconos

El mapa es contenido funcional: conservar marcadores, controles y atribución del proveedor. La lista, búsqueda y ficha deben seguir siendo útiles sin conceder ubicación. Separar dirección, entre calles y acciones de navegación con etiquetas claras. Un marcador de edición pendiente no se presenta como un punto ya publicado.

Usar Ionicons para la interfaz general y los iconos específicos ya usados por los componentes. Conservar la hoja para identidad y la moneda para puntos. Los iconos de acción suelen medir (20–24); mantener el tamaño del componente compartido. No introducir otra librería de iconos por gusto visual.

### Estados, accesibilidad y textos

Cada pantalla de datos contempla carga, vacío, error y éxito cuando corresponda. Reutilizar `PortalLoading`, `PortalFeedback`, `AdminEmpty`, `RewardsSkeleton` e `InfoNote` según contexto. Una carga no es un vacío. El vacío explica qué falta y ofrece una acción cuando existe; el error permite reintentar sin perder contexto. Confirmar “Guardado” sólo después de una respuesta exitosa.

Escribir en español con voseo: “Registrá”, “Elegí”, “Sumá”, “Contactanos”. Usar frases cortas y acciones concretas: “Guardar cambios”, “Buscar dirección”, “Ver detalle”. Evitar tecnicismos en la vista ciudadana. Mantener “Puntos verdes”, “Premios”, “Mis puntos”, “Mis entregas”, “Configuraciones”, “Contacto” y “Términos de uso”. La invitación a participar como punto verde conserva un tono de contribución al planeta; no volver a presentarla como registro de empresa ni inventar un correo de contacto.

Los controles nuevos deben ofrecer un área de interacción de al menos (44 × 44), incluso si el icono o chip es visualmente menor. Usar etiquetas accesibles en iconos, estado seleccionado/deshabilitado y mensajes de error anunciables. Conservar un foco de teclado visible en web y permitir tamaño de texto aumentado. Verificar contraste AA: (4.5:1) en texto normal y (3:1) en texto grande y controles relevantes. Son criterios de revisión, no una afirmación de cumplimiento total de las pantallas actuales.

## Do's and Don'ts

### Do

- Reutilizar el tema y los componentes compartidos antes de crear estilos locales.
- Mantener `ScreenHeader` en todas las pantallas salvo Inicio, incluidos empresa y admin.
- Usar Roboto, la paleta semántica y los radios de la familia de cada componente.
- Dar prioridad visual a la acción, el saldo, la dirección o el dato que necesita la persona.
- Mostrar carga, vacío y error como estados distintos, con información real.
- Revisar móvil y escritorio, nombres largos, teclado, foco y texto ampliado.

### Don't

- Crear una identidad diferente por rol, una fuente nueva o una paleta alternativa sin aprobación explícita.
- Copiar un header, botón o tarjeta compartidos para modificarlos sólo en una pantalla.
- Usar el mockup o una captura antigua para revertir navegación y contenido ya acordados.
- Confundir saldo global, datos de muestra o información pendiente con datos confirmados.
- Añadir sombras fuertes, degradados de pantalla, emojis como iconos o animaciones decorativas continuas.
- Inventar datos de contacto, stock, impacto o estados de éxito para completar un diseño.

### Revisión antes de entregar

1. La pantalla se reconoce como parte de la vista del ciudadano aunque pertenezca a otro rol.
2. El header, tema y componentes correspondientes se reutilizan; las excepciones están justificadas en el cambio.
3. La jerarquía permite identificar título, información principal y acción sin competir entre sí.
4. No hay recortes, superposiciones ni scroll horizontal de lectura en móvil y escritorio.
5. Los estados y la navegación conservan el comportamiento acordado y los permisos reales.
6. Si cambió un componente o token del sistema, también se actualizaron esta guía y el sidecar.
7. La tarea o PR incluye evidencia de la revisión, estados y tamaños comprobados, y pendientes explícitos. Autor y revisor no dan por aprobadas comprobaciones que no realizaron.

Las fuentes concretas son los archivos enlazados y la implementación actual de Inicio, Perfil, Puntos verdes y Premios. La estructura documental sigue el [formato DESIGN.md](https://raw.githubusercontent.com/google-labs-code/design.md/main/docs/spec.md); las decisiones visuales pertenecen a ReciVolt.
