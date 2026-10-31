# Tablero de Tareas: Recorridos de la App (Diseño Etapa 1)

> Documento de tareas formato Trello para desarrollo y ajuste visual de los **11 recorridos (37 vistas)** según el documento de especificación visual de la primera etapa.
> 
> **Regla compartida:** Antes de comenzar cualquier tarea de interfaz, es obligatorio leer [`DESIGN.md`](../DESIGN.md) y [`AGENTS.md`](../AGENTS.md). Reutilizar componentes compartidos (`ScreenHeader`, `ActionButton`, etc.), importar colores y fuentes desde `@/theme` (Roboto 400/500/700) y verificar la interfaz en vistas móvil y escritorio antes de darla por finalizada.
> 
> **Regla del Header Común (`ScreenHeader`):** Todas las pantallas interiores salvo Inicio (`home.tsx`) **deben** implementar obligatoriamente `ScreenHeader` (`src/components/ui/ScreenHeader.tsx`) en la raíz fuera del `ScrollView` (título centrado en Roboto 700 20px, chevron a la izquierda y acción/espacio simétrico a la derecha). No crear cabeceras personalizadas.

---

## Índice de Tarjetas

| ID | Tarjeta Trello | Tipo de esfuerzo | Estado actual |
| :--- | :--- | :--- | :--- |
| **CARD-01** | [Recorrido 01: Inicio y cuenta](#card-01-recorrido-01--inicio-y-cuenta-4-vistas) | Ajuste visual y formulario | Funcional con desvíos visuales |
| **CARD-02** | [Recorrido 02: Encontrar dónde entregar](#card-02-recorrido-02--encontrar-dónde-entregar-3-vistas) | Feature UI + Refactor layout | 2 vistas funcionales + 1 modal nuevo |
| **CARD-03** | [Recorrido 03: Recepción y educación ambiental](#card-03-recorrido-03--recepción-y-educación-ambiental-3-vistas) | Feature UI + Contenido | 2 vistas con desvíos + 1 pantalla nueva |
| **CARD-04** | [Recorrido 04: De la entrega a los puntos](#card-04-recorrido-04--de-la-entrega-a-los-puntos-3-vistas) | Rediseño de componentes | Implementado y verificado |
| **CARD-05** | [Recorrido 05: Solicitar y seguir un retiro](#card-05-recorrido-05--solicitar-y-seguir-un-retiro-3-vistas) | Nueva funcionalidad completa | Por implementar (Backlog P2) |
| **CARD-06** | [Recorrido 06: Premios que acompañan al comercio](#card-06-recorrido-06--premios-que-acompañan-al-comercio-4-vistas) | Rediseño visual (Grilla a Lista) | Funcional con desvíos visuales |
| **CARD-07** | [Recorrido 07: Cuenta, saldo e historial](#card-07-recorrido-07--cuenta-saldo-e-historial-3-vistas) | Refactor + Nueva pantalla unificada | 2 vistas funcionales + 1 feed nuevo |
| **CARD-08** | [Recorrido 08: Gestión de la organización](#card-08-recorrido-08--gestión-de-la-organización-4-vistas) | Adaptación móvil de portal | Implementado y verificado |
| **CARD-09** | [Recorrido 09: Recibir y validar en el local](#card-09-recorrido-09--recibir-y-validar-en-el-local-3-vistas) | Rediseño de escáner y validación | Lógica funcional, UI desalineada |
| **CARD-10** | [Recorrido 10: Coordinar y operar los retiros](#card-10-recorrido-10--coordinar-y-operar-los-retiros-3-vistas) | Nueva funcionalidad completa | Por implementar (Backlog P2) |
| **CARD-11** | [Recorrido 11: Administración y trazabilidad](#card-11-recorrido-11--administración-y-trazabilidad-4-vistas) | Adaptación móvil y filtros | Funcional en portal, UI desalineada |

---

### CARD-01: Recorrido 01 — Inicio y cuenta (4 vistas)
- **Etiquetas:** `UI/UX`, `Autenticación`, `Ciudadano`, `Prioridad: Alta`
- **Referencia visual:** Documento de diseño, Pág. 4.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Alinear las pantallas del recorrido de acceso y bienvenida con el diseño visual aprobado. Actualmente, la pantalla de Inicio (`home.tsx`) ya cumple con la maqueta, pero las pantallas de Iniciar sesión, Crear cuenta y Recuperar contraseña poseen formularios y textos desalineados con respecto al diseño de referencia.

#### Vistas involucradas
1. **Inicio (ciudadano):** Cabecera de marca, saludo personalizado, tarjeta de puntos, accesos rápidos redondos (*Entregas, Mis puntos, Premios, Impacto*), mapa de puntos y tarjeta destacada con foto.
2. **Iniciar sesión:** Cabecera con volver, ilustración central del candado verde con hojas, título *"Te damos la bienvenida"*, campos con icono (*Correo electrónico*, *Contraseña* con toggle), botón *"Ingresar"*, enlace *"Olvidé mi contraseña"*, divisor *"o"*, botón de contorno *"Crear cuenta"* y botón *"Seguir como visitante"*.
3. **Crear cuenta:** Cabecera con volver, ilustración central de usuario ecológico, título *"Creá tu cuenta"*, exactamente 3 campos (*Nombre y apellido*, *Correo electrónico*, *Contraseña* con toggle), checkbox de aceptación de *Términos y Condiciones y Política de Privacidad*, botón verde *"Crear cuenta"*.
4. **Recuperar contraseña:** Ilustración de sobre con flechas de reciclaje, título *"Recuperá tu contraseña"*, texto explicativo, campo de correo, botón *"Enviar enlace"* y botón secundario *"Volver a ingresar"*.

#### Archivos afectados
- `src/app/(app)/home.tsx`
- `src/app/(auth)/login.tsx`
- `src/app/(auth)/register.tsx`
- `src/app/(auth)/forgot-password.tsx`
- `src/components/auth/AuthTextField.tsx`
- `src/components/ui/EcoArtwork.tsx`

#### Checklist de tareas
- [ ] **Home:** Verificar la correcta lectura de marca desde `src/config/brand.json` y el avatar accesible en la esquina superior derecha.
- [ ] **Login:**
  - [ ] Incorporar el componente de ilustración del candado ecológico.
  - [ ] Actualizar títulos a *"Te damos la bienvenida"* y subtítulo *"Iniciá sesión para continuar y ser parte de una comunidad que recicla tecnología."*.
  - [ ] Cambiar botón primario a *"Ingresar"* y agregar divisor *"o"*.
  - [ ] Agregar botón secundario de contorno *"Crear cuenta"*.
  - [ ] Agregar enlace inferior *"Seguir como visitante"* (redirige a `/` en modo invitado).
- [ ] **Registro:**
  - [ ] Incorporar ilustración circular de usuario verde.
  - [ ] Unificar los campos de nombre a un solo campo *"Nombre y apellido"*.
  - [ ] Eliminar el segundo campo redundante de confirmación de contraseña en la UI manteniendo validación limpia.
  - [ ] Remover la tarjeta promocional externa *"¿Querés sumarte como punto verde?"* (pertenece a contacto).
  - [ ] Agregar checkbox accesible de *Términos y Condiciones y Política de Privacidad* con enlaces funcionales a sus pantallas.
- [ ] **Recuperación:**
  - [ ] Incorporar ilustración de sobre con reciclaje.
  - [ ] Ajustar textos a *"Recuperá tu contraseña"* y *"Te enviaremos un enlace a tu correo..."*.
  - [ ] Proveer acción secundaria *"Volver a ingresar"*.

#### Criterios de Aceptación
- La navegación entre Login, Registro y Recuperación es fluida y respeta `ScreenHeader` y áreas seguras.
- Los formularios no se deforman con teclado abierto (`KeyboardAvoidingView`).
- Se respetan los colores semánticos (`colors.primary`, `colors.primarySoft`, `colors.border`) y tipografía Roboto.

---

### CARD-02: Recorrido 02 — Encontrar dónde entregar (3 vistas)
- **Etiquetas:** `UI/UX`, `Mapas`, `Geolocalización`, `Prioridad: Alta`
- **Referencia visual:** Documento de diseño, Pág. 5.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Refactorizar la pantalla de Puntos Verdes para otorgar protagonismo total al mapa interactivo y extraer los filtros a un componente Bottom Sheet / Modal dedicado. Enriquecer la pantalla de detalle del punto con fotografía de cabecera y desglose de materiales recibidos y no recibidos.

#### Vistas involucradas
1. **Puntos verdes (mapa):** Buscador superior *"Buscá un punto verde"*, conmutadores píldora `[Mapa]` y `[Lista]`, mapa interactivo ocupando el fondo, tarjeta flotante inferior (*"16 puntos verdes · Ver todos >"*) con preview del punto seleccionado.
2. **Filtros de puntos (Modal / Bottom Sheet):** Fondo semitransparente sobre el mapa, hoja inferior con checkboxes de *Dispositivos aceptados* (Computadoras, Notebooks, Celulares, Electrodomésticos), selectores desplegables de *Localidad* ("Pilar") y *Servicio* ("Recepción en el lugar"), y botones *"Limpiar"* y *"Aplicar filtros"*.
3. **Detalle del punto:** Cabecera con foto real del punto verde, título, localidad, mapa compacto con pin, dirección, horarios de consulta, botón *"Cómo llegar"*, tarjetas destacadas *Qué recibimos* (con tildes verdes) y *Qué no recibimos* (con cruces rojas) con enlaces a listados completos, y botón fijo inferior *"Registrar entrega"*.

#### Archivos afectados
- `src/app/(app)/green-points.tsx`
- `src/app/point/[id].tsx`
- `src/components/discovery/PointsMap.tsx`
- `src/components/discovery/PointFilterSheet.tsx` *(nuevo)*
- `src/components/discovery/PointCardPreview.tsx` *(nuevo o refactor)*

#### Checklist de tareas
- [ ] **Puntos verdes:**
  - [ ] Rediseñar el layout para que el mapa ocupe el área principal de la pantalla.
  - [ ] Reemplazar los carruseles horizontales de filtros fijos por el botón de filtro que abre la hoja modal.
  - [ ] Construir la tarjeta flotante inferior con contador de puntos y la tarjeta del punto seleccionado con su foto y dirección.
  - [ ] Asegurar alternancia fluida entre vista `[Mapa]` y `[Lista]`.
- [ ] **Filtros de puntos:**
  - [ ] Crear el componente `PointFilterSheet` (accesible, con soporte de teclado y arrastre o cierre con botón).
  - [ ] Implementar checkboxes para las categorías de dispositivos.
  - [ ] Implementar dropdowns para localidad y tipo de servicio.
  - [ ] Conectar los botones *"Limpiar"* y *"Aplicar filtros"* con el estado de `useDiscovery`.
- [ ] **Detalle del punto:**
  - [ ] Incorporar el banner fotográfico en la parte superior.
  - [ ] Reemplazar la lista exhaustiva de días/horarios por el botón/desplegable compacto *"Consultar horarios"*.
  - [ ] Añadir los dos bloques visuales colapsables: *Qué recibimos* (verde `#246440`) y *Qué no recibimos* (rojo `#A30303`).
  - [ ] Ubicar el botón *"Registrar entrega"* fijo en la parte inferior sobre un contenedor seguro.

#### Criterios de Aceptación
- La selección de un pin en el mapa actualiza la tarjeta inferior.
- El modal de filtros no recorta su contenido en dispositivos móviles pequeños.
- El detalle del punto permite abrir la app de mapas externa mediante *"Cómo llegar"*.

---

### CARD-03: Recorrido 03 — Recepción y educación ambiental (3 vistas)
- **Etiquetas:** `UI/UX`, `Contenido`, `Educación`, `Prioridad: Media`
- **Referencia visual:** Documento de diseño, Pág. 6.
- **Responsable:** Dev Frontend

#### Descripción
Modernizar el módulo de categorías y educación ambiental. Reemplazar la lista plana actual por un directorio estructurado con buscador y acordeones desplegables, crear la pantalla faltante de residuos no admitidos y transformar la pantalla de impacto en una guía práctica ilustrada de preparación de dispositivos.

#### Vistas involucradas
1. **Qué recibimos:** Buscador superior *"Buscar en el listado"*, lista categorizada en acordeones desplegables (*Informática y comunicación, Electrodomésticos, Insumos eléctricos, Herramientas, Juguetes y equipos*) con iconos correspondientes y subcategorías anidadas.
2. **Qué no recibimos:** Buscador superior, tarjeta de advertencia roja con icono de prohibición (*Residuos no recibidos*), desglose de elementos no admitidos (*Pilas, Baterías, Elementos con mercurio, Instrumentos médicos*) con icono rojo, y tarjeta informativa inferior de precaución legal/ambiental.
3. **Impacto (Prepará tus dispositivos):** Cabecera ilustrada con dispositivos y cables, título *"Prepará tus dispositivos"*, subtítulo instructivo, lista de 4 pasos numerados en círculos verdes suaves (1: Copia de archivos, 2: Cierre de sesiones, 3: Restablecimiento de fábrica, 4: Separación de accesorios), tarjeta interactiva *"¿Se puede reparar o reutilizar?"* y botón verde *"Buscar un punto verde"*.

#### Archivos afectados
- `src/app/device-categories.tsx`
- `src/app/device-unaccepted.tsx` *(nueva ruta o componente compartido)*
- `src/app/impact.tsx`
- `src/components/ui/EcoArtwork.tsx`

#### Checklist de tareas
- [ ] **Qué recibimos:**
  - [ ] Agregar `SearchBar` con placeholder *"Buscar en el listado"*.
  - [ ] Implementar acordeones colapsables (`CollapsibleSection`) agrupando las categorías del backend por familia técnica.
  - [ ] Añadir iconos específicos de MaterialCommunityIcons o Ionicons para cada grupo tecnológico.
- [ ] **Qué no recibimos:**
  - [ ] Crear la ruta `device-unaccepted.tsx` y enlazarla desde el detalle del punto y perfil.
  - [ ] Diseñar las tarjetas con iconos semánticos rojos (`colors.danger` = `#A30303`, fondo suave `rgba(179, 38, 30, 0.16)`).
  - [ ] Redactar e incorporar los textos de advertencia sobre sustancias peligrosas y baterías.
- [ ] **Impacto:**
  - [ ] Reemplazar la vista estática actual de `impact.tsx` por la guía numerada.
  - [ ] Diseñar los 4 pasos secuenciales con números circulares destacados.
  - [ ] Agregar la tarjeta de enlace a guía de reparación/reutilización.
  - [ ] Conectar el botón de acción principal para redirigir a `/green-points`.

#### Criterios de Aceptación
- Los acordeones conservan su estado de apertura y no causan saltos bruscos en el scroll.
- El buscador filtra en tiempo real tanto categorías principales como subdispositivos.
- Los textos respetan el voseo en español estándar del proyecto.

---

### CARD-04: Recorrido 04 — De la entrega a los puntos (3 vistas)
- **Etiquetas:** `UI/UX`, `Entregas`, `QR`, `Puntos`, `Prioridad: Alta`
- **Referencia visual:** Documento de diseño, Pág. 7.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Transformar el flujo de registro y seguimiento de entrega ciudadana desde su formato actual (formulario web de portal) hacia los componentes de tarjetas móviles limpios de la maqueta: tarjeta de receptor, categoría, control numérico tipo stepper, cámara y pantallas diferenciadas para estado pendiente y confirmado.

#### Vistas involucradas
1. **Nueva entrega:** Cabecera con volver, tarjeta seleccionable de *Organización receptora*, tarjeta de *Categoría de residuos*, control numérico stepper `[-] 10 [+]`, campo de notas con contador `0/200`, tarjeta para *Subir foto (opcional)* con cámara, nota informativa sobre acreditación y botón *"Generar código"*.
2. **Tu entrega (Pendiente):** Banner de estado amarillo/reloj *"Pendiente de recepción"*, tarjeta del punto verde, código QR centrado con fondo blanco y márgenes amplios, código alfanumérico legible con botón de copiar, resumen de dispositivos declarados, aviso de que aún no suma puntos y botón secundario *"Cancelar entrega"*.
3. **Detalle de entrega (Confirmada):** Banner/icono de éxito verde grande con tilde, título *"Entrega confirmada"*, subtítulo de agradecimiento, tarjeta de la entidad receptora, desglose de computadoras recibidas, tarjeta destacada verde *"1200 puntos acreditados · Tu saldo se puede usar en toda la red"*, botón primario *"Ver mis puntos"* y botón secundario *"Volver al inicio"*.

#### Archivos afectados
- `src/app/new-delivery.tsx`
- `src/app/delivery/[id].tsx`
- `src/components/delivery/DeliverySummary.tsx`
- `src/components/ui/NumericStepper.tsx` *(nuevo)*

#### Checklist de tareas
- [x] **Nueva entrega:**
  - [x] Crear componente `NumericStepper` (`[-] cantidad [+]`) con validación de enteros mayores a cero.
  - [x] Maquetar la tarjeta de selección de organización con icono institucional y flecha.
  - [x] Maquetar la tarjeta de selección de categoría de residuos.
  - [x] Incorporar el campo de notas multilínea con contador reactivo `0/200`.
  - [x] Adaptar la tarjeta de carga de fotos con icono de cámara y preview en miniatura.
  - [x] Conectar el botón *"Generar código"* con la mutación existente de `deliveryCommand('create')`.
- [x] **Tu entrega (Pendiente):**
  - [x] Crear el banner superior de aviso de recepción pendiente.
  - [x] Añadir botón de copia rápida al portapapeles junto al código de texto manual.
  - [x] Asegurar que el botón de cancelación solicite confirmación y actualice el estado de inmediato.
- [x] **Detalle de entrega (Confirmada):**
  - [x] Separar la vista de entrega confirmada para que no comparta el layout del QR pendiente.
  - [x] Implementar la tarjeta verde suave de puntos acreditados con texto explicativo del saldo global.
  - [x] Enlazar *"Ver mis puntos"* hacia `/my-points` y *"Volver al inicio"* hacia `/home`.

#### Criterios de Aceptación
- La creación de la entrega genera un `requestId` idempotente para evitar duplicados.
- El QR escaneable tiene tamaño mínimo de 220x220 con contraste óptimo.
- Al confirmarse físicamente la entrega, la pantalla transiciona al estado verde de confirmación.

---

### CARD-05: Recorrido 05 — Solicitar y seguir un retiro (3 vistas)
- **Etiquetas:** `Feature Nueva`, `Retiros`, `Logística`, `Prioridad: Media / Backlog P2`
- **Referencia visual:** Documento de diseño, Pág. 8.
- **Responsable:** Dev Fullstack

#### Descripción
Implementar desde cero el circuito ciudadano de solicitud y seguimiento de retiros a domicilio de residuos electrónicos de gran porte (ej. lavarropas, heladeras, impresoras pesadas). En la versión actual este circuito se encuentra deshabilitado.

#### Vistas involucradas
1. **Solicitar retiro:** Selector de receptor habilitado para retiros, selector de material a retirar (con selector de cantidad), carga de foto opcional, bloque de dirección de retiro (calle, localidad, referencias de domicilio), aviso de confirmación y botón *"Enviar solicitud"*.
2. **Detalle del retiro (Por coordinar):** Banner amarillo *"Por coordinar"*, tarjeta de organización receptora, material a retirar, dirección de retiro, bloque de disponibilidad *"A coordinar"*, aviso de contacto y botón *"Cancelar solicitud"*.
3. **Detalle del retiro (Coordinado):** Banner verde *"Coordinado"*, línea de tiempo / stepper de progreso (*1. Solicitado [fecha] -> 2. Coordinado [fecha] -> 3. En camino -> 4. Recibido*), datos de la entidad, material, dirección, aviso de acreditación y botón *"Ver detalle de la solicitud"*.

#### Archivos afectados
- `src/app/pickup/new.tsx` *(nuevo)*
- `src/app/pickup/[id].tsx` *(nuevo)*
- `src/models/Pickup.ts` *(nuevo modelo)*
- `src/services/pickup.service.ts` *(nuevo servicio)*
- `supabase/migrations/` *(tablas y políticas RLS para pickups)*

#### Checklist de tareas
- [ ] **Backend / Supabase:**
  - [ ] Diseñar tabla `pickups` vinculada a `profiles` y `companies`, con estados: `REQUESTED`, `COORDINATED`, `IN_TRANSIT`, `COMPLETED`, `CANCELLED`.
  - [ ] Configurar RLS: ciudadano puede crear y ver sus propios retiros; empresa asignada puede leer y actualizar estado.
- [ ] **Frontend - Solicitar retiro:**
  - [ ] Crear pantalla `src/app/pickup/new.tsx`.
  - [ ] Implementar selectores de punto con retiro habilitado (`pickupEnabled: true`).
  - [ ] Formulario de dirección con campos de calle, localidad y referencia de timbre/portón.
  - [ ] Acción de envío con feedback accesible y redirección al detalle.
- [ ] **Frontend - Detalle y Seguimiento:**
  - [ ] Crear pantalla `src/app/pickup/[id].tsx`.
  - [ ] Crear componente de línea de tiempo con los 4 hitos secuenciales y fechas dinámicas.
  - [ ] Manejar estado *"Por coordinar"* con opción de cancelación.
  - [ ] Manejar estado *"Coordinado"* y transiciones hacia completado.

#### Criterios de Aceptación
- Un ciudadano solo puede solicitar retiros en organizaciones que tengan habilitado el servicio.
- La línea de tiempo refleja fielmente la fecha de solicitud y la fecha acordada por la empresa.
- Cancelar el retiro libera la solicitud y actualiza la vista en tiempo real.

---

### CARD-06: Recorrido 06 — Premios que acompañan al comercio (4 vistas)
- **Etiquetas:** `UI/UX`, `Premios`, `Comercios`, `Prioridad: Alta`
- **Referencia visual:** Documento de diseño, Pág. 9.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Rediseñar el catálogo de premios de la vista en grilla de 2 columnas hacia el formato de lista vertical de tarjetas horizontales limpias. Adaptar la ficha de detalle del premio y crear pantallas especializadas para el canje reservado (con código QR y datos estructurados) y el canje completado/entregado.

#### Vistas involucradas
1. **Catálogo de premios:** Tarjeta superior de saldo *"Tus puntos: 1199 puntos · Canjeá tus puntos por beneficios en comercios de Pilar"*, barra de chips por categoría `[Todos] [Gastronomía] [Bienestar] [Hogar]`, lista vertical de tarjetas horizontales con foto a la izquierda, título, nombre del comercio, badge verde de costo (`1 punto`, `100 puntos`) y flecha lateral.
2. **Detalle del premio:** Imagen hero superior grande, título, comercio, badge verde de puntos con icono de regalo, sección *"Condiciones del beneficio"* con icono de documento, sección *"Ubicación"* con icono de pin, y botón fijo inferior *"Canjear por X puntos"*.
3. **Tu canje (Reservado):** Banner de estado azul/reloj *"Reservado · Mostrá este código en el local para validar tu canje"*, código QR grande, código manual legible con icono de copiar, tabla estructurada de metadatos (Premio, Comercio, Ubicación, Puntos utilizados, Estado) y nota sobre condiciones de compra.
4. **Detalle del canje (Entregado):** Banner verde de éxito *"Premio entregado · ¡Disfrutá tu beneficio!"*, foto del premio, tabla con fecha y hora exacta de validación, confirmación de validación del comercio y botón *"Ver mis canjes"*.

#### Archivos afectados
- `src/app/(app)/rewards.tsx`
- `src/app/reward/[id].tsx`
- `src/app/redemption/[id].tsx`
- `src/components/rewards/RewardsUI.tsx`
- `src/components/rewards/RewardCard.tsx`

#### Checklist de tareas
- [ ] **Catálogo de premios:**
  - [ ] Implementar la tarjeta verde superior con el saldo reactivo del usuario y bajada ambiental.
  - [ ] Refactorizar `RewardCard` para que sea una fila horizontal: miniatura con bordes redondeados a la izquierda, información central, badge verde de puntos a la derecha y chevron.
  - [ ] Conectar los chips de filtro de categoría horizontalmente.
- [ ] **Detalle del premio:**
  - [ ] Maquetar la cabecera hero con imagen en alta definición y efecto cover.
  - [ ] Incorporar el bloque de *"Condiciones del beneficio"* destacando si requiere o no consumo previo.
  - [ ] Mantener el botón de canje accesible en la parte inferior deshabilitándolo si el saldo es insuficiente.
- [ ] **Canje reservado:**
  - [ ] Reemplazar la vista mixta con código de barras por el layout de la maqueta: QR centrado, código manual con botón de copiar y tabla de detalles limpia.
- [ ] **Canje entregado:**
  - [ ] Crear la variante visual de canje completado con el banner de *"Premio entregado"*, registro temporal y botón de retorno a mis canjes.

#### Criterios de Aceptación
- La reserva descuenta puntos una sola vez y genera un código único persistente.
- El comercio puede escanear el QR sin requerir recálculos de saldo.
- La navegación entre el catálogo, la reserva y el histórico de canjes no pierde el contexto de búsqueda.

---

### CARD-07: Recorrido 07 — Cuenta, saldo e historial (3 vistas)
- **Etiquetas:** `UI/UX`, `Perfil`, `Historial`, `Ciudadano`, `Prioridad: Media`
- **Referencia visual:** Documento de diseño, Pág. 10.
- **Responsable:** Dev Frontend

#### Descripción
Refactorizar el módulo personal del ciudadano unificando la pantalla de Perfil con accesos rápidos claros, construyendo la nueva pantalla unificada de "Mi actividad" (feed cronológico con filtros) y estilizando "Mis puntos" con diferenciación cromática de movimientos positivos y negativos.

#### Vistas involucradas
1. **Perfil:** Cabecera con volver, avatar circular verde, nombre del usuario, tarjeta verde suave de saldo disponible (*"1199 puntos · Un solo saldo para canjear en toda la red"*), y lista de 5 opciones esenciales con icono y flecha: *Mis entregas, Mis canjes, Mis puntos, Contacto, Cerrar sesión*.
2. **Mi actividad:** Pestañas de filtro píldora `[Todos] [Entregas] [Retiros] [Canjes]`, listado cronológico de eventos con iconos temáticos (reciclaje para entrega con puntos en verde `+1200 puntos`, regalo para canje con puntos en rojo `-1 punto`), y tarjeta informativa inferior para el estado de retiros.
3. **Mis puntos:** Tarjeta verde de saldo disponible con icono circular verde, botón verde *"Ver premios >"*, sección *"Historial de movimientos"* con transacciones detalladas con fecha, origen y variación de puntos en verde o rojo.

#### Archivos afectados
- `src/app/(app)/profile.tsx`
- `src/app/my-points.tsx`
- `src/app/my-activity.tsx` *(nueva ruta o consolidación de `my-raee.tsx`)*
- `src/components/delivery/DeliveryBalance.tsx`

#### Checklist de tareas
- [ ] **Perfil:**
  - [ ] Simplificar la pantalla de perfil removiendo enlaces redundantes y dejando las 5 filas del diseño.
  - [ ] Integrar la tarjeta de saldo verde idéntica a la maqueta con el texto *"Un solo saldo para canjear en toda la red"*.
  - [ ] Asegurar que el cierre de sesión solicite confirmación y limpie el estado del wallet.
- [ ] **Mi actividad:**
  - [ ] Implementar la pantalla `my-activity.tsx` con soporte de pestañas: Todos, Entregas, Retiros, Canjes.
  - [ ] Construir las tarjetas del feed con icono izquierdo, nombre de la entidad, fecha, estado y puntaje.
  - [ ] Agregar el estado informativo para retiros futuros (*"Tus retiros aparecerán acá..."*).
- [ ] **Mis puntos:**
  - [ ] Diseñar el botón de acceso directo *"Ver premios >"*.
  - [ ] Aplicar color verde (`#0B5C27` / `colors.primaryDark`) para sumas de puntos y rojo semántico (`#A30303` / `colors.danger`) para débitos por canjes.

#### Criterios de Aceptación
- El saldo de puntos es reactivo y consistente entre Home, Perfil y Mis puntos.
- El feed de actividad permite navegar directamente al detalle de la entrega o del canje al tocar una fila.

---

### CARD-08: Recorrido 08 — Gestión de la organización (4 vistas)
- **Etiquetas:** `UI/UX`, `Organizaciones`, `Portal Empresa`, `Prioridad: Media`
- **Referencia visual:** Documento de diseño, Pág. 11.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Adaptar las herramientas de gestión de la organización (empresa / punto verde) desde su presentación actual de pestañas web hacia un flujo móvil nativo con pantallas y tarjetas independientes para datos de la empresa, edición de punto verde, tarifas de puntos por categoría y administración del equipo.

#### Vistas involucradas
1. **Mi empresa (Panel principal):** Tarjeta con icono institucional verde, nombre de la entidad, badge de rol (*Responsable*), botón verde destacado *"Recibir entrega o validar premio"*, y menú vertical de navegación con chevrons (*Historial de entregas, Puntos verdes, Premios de tu empresa, Datos, Puntos por categoría, Equipo*).
2. **Punto verde (Edición):** Formulario móvil con nombre, mapa embebido de ubicación, dirección con icono de pin, tabla de horarios de atención (Lunes a viernes, Sábado, Domingo con campos `--:-- a --:--`), checkboxes de categorías aceptadas, selector de estado (*Publicado*) y botón *"Guardar cambios"*.
3. **Puntos por categoría:** Mensaje informativo superior *"Se acreditan al confirmar lo recibido"*, tabla vertical con cada categoría de residuo y su input numérico a la derecha `[ 120 ] puntos por unidad`, y botón *"Guardar cambios"*.
4. **Equipo:** Tarjeta institucional, lista de miembros activos con badge *"Tú"*, formulario para invitar miembros (Nombre, Correo electrónico, Rol desplegable *Trabajador / Responsable*), botón *"Invitar al equipo"* y nota aclaratoria sobre límites de acceso.

#### Archivos afectados
- `src/app/company/index.tsx`
- `src/components/portal/CompanyPointEditor.tsx`
- `src/components/portal/CompanyTeam.tsx`
- `src/components/portal/PortalUI.tsx`

#### Checklist de tareas
- [x] **Panel Mi empresa:**
  - [x] Reestructurar el menú principal para que en pantallas móviles se presente como una lista de navegación con chevrons y no como pestañas horizontales diminutas.
  - [x] Destacar el botón primario de escáner en la parte superior.
- [x] **Edición de Punto verde:**
  - [x] Integrar el mapa interactivo con marcador arrastrable o selector de coordenadas.
  - [x] Crear la grilla de configuración horaria con rangos de apertura y cierre.
  - [x] Implementar la selección de categorías mediante checkboxes accesibles.
- [x] **Puntos por categoría:**
  - [x] Maquetar la tabla compacta con inputs alineados a la derecha.
  - [x] Validar que solo se ingresen números enteros positivos.
- [x] **Equipo:**
  - [x] Maquetar la lista de miembros con badges visuales de rol.
  - [x] Implementar el formulario de invitación conectado al servicio de invitaciones por email existente.

#### Criterios de Aceptación
- Solo los usuarios con rol de `Responsable` (owner) pueden editar horarios, puntos y equipo.
- Los trabajadores operativos solo ven accesos de escáner e historial de entregas.
- Las mutaciones actualizan los datos de inmediato sin recargar la página completa.

---

### CARD-09: Recorrido 09 — Recibir y validar en el local (3 vistas)
- **Etiquetas:** `UI/UX`, `Escáner`, `Cámara`, `Operaciones`, `Prioridad: Alta`
- **Referencia visual:** Documento de diseño, Pág. 12.
- **Responsable:** Dev Frontend / Mobile

#### Descripción
Refactorizar la interfaz de la herramienta de escaneo y validación operativa. Agregar marco delimitador tipo visor de escáner, botón de ayuda en cabecera, controles numéricos stepper para la verificación física de residuos entregados y tarjetas limpias para la validación de canjes de premios en comercios asociados.

#### Vistas involucradas
1. **Validar código (Escáner):** Cabecera con volver, título *"Validar código"* y botón de ayuda `(?)`, visor de cámara central enmarcado con esquinas verdes y gráfico de código QR, texto instructivo *"Escaneá el código de entrega o canje"*, separador *"o"*, campo de ingreso manual *"Ingresar código"* y botón verde *"Buscar"*.
2. **Confirmar entrega de residuos:** Cabecera con ayuda, datos de la entidad receptora, datos del ciudadano (avatar + nombre), tarjeta de materiales recibidos con stepper de ajuste `[-] 10 [+]` sobre la cantidad declarada, tarjeta verde destacada con puntos a acreditar, advertencia *"Confirmá solo lo que recibiste físicamente"*, botón verde *"Confirmar recepción"* y botón de contorno *"Cancelar"*.
3. **Confirmar canje de premio:** Cabecera con ayuda, comercio asociado, nombre del premio con icono de regalo, datos del ciudadano, badge de estado *"Reservado"*, texto explicativo de puntos ya descontados, nota de exclusividad de equipo autorizado y botón verde *"Confirmar entrega del premio"*.

#### Archivos afectados
- `src/app/company/scanner.tsx`
- `src/components/delivery/DeliverySummary.tsx`
- `src/components/ui/NumericStepper.tsx`

#### Checklist de tareas
- [ ] **Pantalla de escáner:**
  - [ ] Incorporar el visor superpuesto con bordes verdes tipo escáner sobre la vista de cámara `CameraView`.
  - [ ] Añadir modal o tooltip de ayuda disparado desde el icono `(?)` en la cabecera.
  - [ ] Mejorar el campo de código manual con formateador automático de mayúsculas y botón *"Buscar"*.
- [ ] **Confirmación de entrega:**
  - [ ] Diseñar el bloque de ajuste físico de residuos con el control `NumericStepper`.
  - [ ] Calcular y mostrar en vivo los puntos a acreditar según la cantidad modificada.
  - [ ] Incorporar el banner de alerta preventiva sobre la verificación física real.
- [ ] **Confirmación de canje:**
  - [ ] Diseñar la tarjeta de validación de beneficio comercial con el badge *"Reservado"*.
  - [ ] Mostrar claramente que la operación no vuelve a descontar puntos al ciudadano.
  - [ ] Bloquear el botón con feedback de carga al confirmar para evitar doble validación.

#### Criterios de Aceptación
- La lectura de códigos QR funciona en cámara física y mediante entrada manual de texto.
- Ajustar cantidades a cero anula los puntos de esa categoría sin cancelar la entrega completa si hay otros dispositivos.
- El canje validado queda registrado en la base de datos como completado y el código queda inhabilitado para reutilización.

---

### CARD-10: Recorrido 10 — Coordinar y operar los retiros (3 vistas)
- **Etiquetas:** `Feature Nueva`, `Retiros`, `Portal Empresa`, `Prioridad: Media / Backlog P2`
- **Referencia visual:** Documento de diseño, Pág. 13.
- **Responsable:** Dev Fullstack

#### Descripción
Construir desde cero el módulo operativo para que el equipo de una organización pueda gestionar, coordinar y confirmar la recepción de solicitudes de retiro a domicilio. Este circuito complementa la CARD-05 y actualmente no existe en la aplicación.

#### Vistas involucradas
1. **Bandeja de retiros:** Pestañas de estado `[Solicitados] [Coordinados] [En camino] [Recibidos]`, botón de filtros, tarjetas de solicitud con material (ej. Lavarropas), nombre del ciudadano, localidad, badge de estado (*Solicitado*) y botón *"Ver solicitud"*.
2. **Coordinar retiro:** Datos del ciudadano y material, selectores desplegables de *Fecha de retiro*, *Horario de retiro* y *Responsable del retiro* (miembro del equipo asignado), mapa con pin de ubicación del domicilio, botón primario verde *"Confirmar coordinación"* y botón secundario de contorno *"No podemos realizar este retiro"*.
3. **Recepción del retiro:** Datos del ciudadano y producto, comparativa de cantidad declarada vs. cantidad recibida editable, selector de estado (`Recibido`), aviso informativo sobre cálculo de puntos según tarifa vigente y botón verde *"Confirmar recepción"*.

#### Archivos afectados
- `src/app/company/pickups/index.tsx` *(nuevo)*
- `src/app/company/pickups/[id]/coordinate.tsx` *(nuevo)*
- `src/app/company/pickups/[id]/receive.tsx` *(nuevo)*
- `src/services/pickup.service.ts` *(nuevo)*

#### Checklist de tareas
- [ ] **Bandeja de retiros:**
  - [ ] Crear la pantalla con pestañas de estado y contador de solicitudes activas.
  - [ ] Conectar la consulta a la tabla `pickups` filtrando por la organización activa.
- [ ] **Coordinación:**
  - [ ] Implementar selectores de fecha y rango horario.
  - [ ] Listar a los miembros de la empresa en el selector de chofer / responsable asignado.
  - [ ] Mostrar mapa interactivo centrado en la dirección del ciudadano.
  - [ ] Manejar rechazo justificado con el botón *"No podemos realizar este retiro"*.
- [ ] **Recepción y cierre:**
  - [ ] Implementar la pantalla de verificación final al momento de recibir el material.
  - [ ] Conectar la acreditación de puntos al ciudadano según la tarifa configurada de la empresa.

#### Criterios de Aceptación
- Cambiar el estado a "Coordinado" notifica/actualiza la vista del ciudadano en el Recorrido 05.
- La confirmación de la recepción acredita los puntos globales al ciudadano de forma atómica e idempotente.

---

### CARD-11: Recorrido 11 — Administración y trazabilidad (4 vistas)
- **Etiquetas:** `UI/UX`, `Admin`, `Auditoría`, `Portal`, `Prioridad: Media`
- **Referencia visual:** Documento de diseño, Pág. 14.
- **Responsable:** Dev Frontend / Fullstack

#### Descripción
Modernizar el portal de superadministración adaptándolo al diseño visual móvil y tablet. Agregar segmentación compacta de organizaciones, tarjetas con miniaturas para el catálogo maestro de premios, interfaz depurada para solicitudes de cupos y filtros desplegables para el registro cronológico de auditoría y trazabilidad.

#### Vistas involucradas
1. **Administración (Organizaciones):** Pestañas tipo switch `[Puntos verdes] [Buscador]`, campo de búsqueda *"Buscar organización"*, tarjetas de entidades con icono temático, nombre, badge de estado (*Punto publicado / Comercio de canje*), localidad y chevron, con botón flotante fijo inferior `+ Agregar punto`.
2. **Premios:** Lista de beneficios publicados con miniatura fotográfica a la izquierda, título, comercio, costo en puntos, badge verde *"Activo"*, flecha lateral, botón verde `+ Crear premio` y nota explicativa.
3. **Límites (Cupos del equipo):** Tarjeta de la organización solicitante, campo de cupo autorizado, campo de motivo con contador `0/200`, botones `[Aprobar]` y `[Rechazar]`, ilustración de estado vacío *"Sin solicitudes pendientes"*, leyenda de colores de estado (*En revisión, Aprobada, Rechazada*) y cuadro explicativo de roles.
4. **Historial de cambios (Auditoría):** Selectores desplegables superiores (*"Todas las instituciones"*, *"Todos los tipos de acción"*), listado de eventos con iconos temáticos (*Alta de comercio, Premio publicado, Entrega confirmada, Canje validado*), fecha de registro y flecha de detalle.

#### Archivos afectados
- `src/app/admin/index.tsx`
- `src/components/portal/AdminPoints.tsx`
- `src/components/portal/AdminRewards.tsx`
- `src/components/portal/AdminChangelog.tsx`
- `src/components/portal/LimitsManager.tsx` *(refactor)*

#### Checklist de tareas
- [ ] **Administración de organizaciones:**
  - [ ] Implementar el control segmentado superior `[Puntos verdes] [Buscador]`.
  - [ ] Maquetar las tarjetas de entidades con badges de color (*Punto publicado* en verde, *Comercio de canje* en gris/azul).
  - [ ] Agregar el botón flotante inferior con icono de suma `+ Agregar punto`.
- [ ] **Gestión de premios:**
  - [ ] Agregar miniaturas de foto con fallback para cada premio en la lista administrativa.
  - [ ] Incorporar badge *"Activo"* / *"Inactivo"* y botón directo `+ Crear premio`.
- [ ] **Límites de equipo:**
  - [ ] Diseñar el panel de resolución rápida con campos de observación y botones Aprobar / Rechazar.
  - [ ] Agregar ilustración de estado vacío para cuando no haya peticiones pendientes.
  - [ ] Incorporar la caja pedagógica con la descripción de roles (*Administrador, Responsable, Trabajador*).
- [ ] **Historial y auditoría:**
  - [ ] Crear los filtros dropdown para filtrar por empresa y por tipo de acción.
  - [ ] Asociar iconos semánticos a cada tipo de evento de la tabla `audit_log`.

#### Criterios de Aceptación
- El acceso está restringido exclusivamente a usuarios con rol `admin`.
- Las acciones de aprobación de cupos o alta de entidades generan de inmediato una entrada en el historial de trazabilidad.
- La búsqueda filtra organizaciones sin demoras ni bloqueos en la interfaz.

---

## Recomendaciones para el Sprint Planning

1. **Sprint 1 (Fundaciones y Ajustes Visuales Críticos):**
   * CARD-01 (Inicio y cuenta)
   * CARD-04 (De la entrega a los puntos)
   * CARD-06 (Premios del comercio)
   * CARD-07 (Cuenta, saldo e historial)
2. **Sprint 2 (Descubrimiento y Operaciones de Validación):**
   * CARD-02 (Encontrar dónde entregar + Modal de filtros)
   * CARD-03 (Recepción y educación ambiental)
   * CARD-09 (Recibir y validar en el local)
   * CARD-11 (Administración y trazabilidad)
3. **Sprint 3 (Módulos Nuevos de Retiros):**
   * CARD-05 (Solicitar y seguir un retiro - Ciudadano)
   * CARD-10 (Coordinar y operar los retiros - Empresa)
