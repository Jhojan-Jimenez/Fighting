# AGENTS.md — TNT Sports Apparel Digital Catalog (Fi)

Este documento es la guía arquitectónica y memoria técnica para Antigravity y otros agentes de IA que trabajen sobre este repositorio en futuras sesiones.

---

## 🎯 Visión y Propósito del Proyecto

* **Repositorio GitHub:** `https://github.com/Jhojan-Jimenez/Fi.git` (rama `main`).
* **Tipo de Aplicación:** Catálogo digital e-commerce interactivo de indumentaria deportiva / BJJ / rashguards de alto rendimiento.
* **Estética y Filosofía:** Minimalista, técnica, contrastada y limpia (inspirada en marcas deportivas premium como Gymshark, Venum o Hayabusa).
* **Enfoque de Producto ("Element-First"):** Los productos principales se definen por **Elemento** (Agua, Aire, Fuego, Tierra, Avatar), y cada uno cuenta con múltiples variantes cromáticas (*colorways*) y tallas (`S`, `M`, `L`, `XL`, `2XL`).
* **Objetivo de Conversión:** Permitir al usuario explorar visualmente las 38 referencias de rashguards, alternar colores y tallas en tiempo real, consultar la tabla de medidas y solicitar pedidos/cotizaciones directamente vía WhatsApp con un mensaje preconfigurado con las especificaciones exactas seleccionadas.

---

## 🛠️ Stack Tecnológico

* **Bundler & Build Tool:** Vite 5.4+ con HMR ultra rápido.
* **Framework:** React 18+ con TypeScript.
* **Estilos:** Tailwind CSS v3 con utilidades personalizadas (`brand-radio`, `brand-checkbox`, `no-scrollbar`).
* **Iconografía:** `lucide-react`.
* **Gestor de Paquetes:** `pnpm` (modo `--ignore-workspace` debido al workspace padre).
* **Assets:** 38 mockups PNG de alta resolución (1536 × 1024 px, relación de aspecto nativa 3:2) almacenados localmente en `public/mockups/`.

---

## 📁 Estructura del Proyecto

```
tnt-catalog/
├── public/
│   ├── mockups/                  # 38 imágenes PNG organizadas por jerarquía
│   │   ├── HOMBRE/               # 30 mockups (5 elementos x 6 colorways H01-H06)
│   │   │   ├── H01_TNT_BLANCO_CYAN/
│   │   │   ├── H02_TNT_NEGRO_AZUL/
│   │   │   ├── H03_TNT_NEGRO_ROJO/
│   │   │   ├── H04_TNT_NEGRO_VERDE/
│   │   │   ├── H05_TNT_NEGRO_GRIS/
│   │   │   └── H06_TNT_NEGRO_MORADO/
│   │   └── MUJER/                # 8 mockups (4 elementos x 2 colorways M01-M02)
│   │       ├── M01_TNT_BLANCO_ROSA/
│   │       └── M02_TNT_NEGRO_AZUL/
│   └── vite.svg
├── src/
│   ├── components/               # Componentes modulares desacoplados
│   │   ├── Navbar.tsx            # Barra superior fija con filtros rápidos y contacto
│   │   ├── CollectionBanner.tsx  # Hero minimalista con badges técnicos
│   │   ├── FilterSidebar.tsx     # Filtro lateral desktop + drawer móvil (Género, Elemento, Talla)
│   │   ├── ProductCard.tsx       # Tarjeta 3:2 con selector de colorway y tallas
│   │   └── ProductModal.tsx      # Modal inmersivo con cambio de colorway, tallas y tabla de medidas
│   ├── data/
│   │   └── mockups.ts            # Fuente de verdad de los 38 mockups y agrupador por producto
│   ├── App.tsx                   # Ensamblador principal de estado y layout responsivo
│   ├── index.css                 # Directivas Tailwind y estilos de controles interactivos
│   └── main.tsx                  # Punto de entrada React
├── AGENTS.md                     # Este archivo de memoria técnica
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 👕 Modelo de Datos y Tallas

### 1. Elementos y Temáticas
* **Agua (Water):** Color Cyan / Azul `#00d2ff`. Icono `Droplets`.
* **Aire (Air):** Color Blanco / Slate `#cbd5e1`. Icono `Wind`.
* **Fuego (Fire):** Color Rojo / Naranja `#ff4b1f`. Icono `Flame`.
* **Tierra (Earth):** Color Verde / Esmeralda `#10b981`. Icono `Mountain`.
* **Avatar:** Color Púrpura / Índigo `#a855f7`. Icono `Sparkles` (Exclusivo categoría Hombre).

### 2. Tallas Disponibles (`AVAILABLE_SIZES`)
Las prendas son atléticas de compresión (Rashguards BJJ / MMA). Las tallas soportadas en toda la interfaz son:
`['S', 'M', 'L', 'XL', '2XL']`

### 3. Guía de Medidas Oficial (Tabla incluida en `ProductModal.tsx`):
| Talla | Pecho (cm) | Largo (cm) | Peso Sugerido |
| :---: | :---: | :---: | :---: |
| **S** | 88 - 94 cm | 66 cm | 55 - 68 kg |
| **M** | 94 - 102 cm | 68 cm | 68 - 78 kg |
| **L** | 102 - 110 cm | 71 cm | 78 - 88 kg |
| **XL** | 110 - 118 cm | 74 cm | 88 - 98 kg |
| **2XL** | 118 - 128 cm | 77 cm | 98 - 110+ kg |

---

## 🧩 Arquitectura de Componentes

### 1. `Navbar.tsx`
* Barra de navegación fija con efecto `backdrop-blur`.
* Selector de género rápido (`Todos`, `Hombre`, `Mujer`).
* Botón de apertura de filtros para mobile con indicador de filtros activos.
* Contador dinámico de productos mostrados y enlace directo a WhatsApp.

### 2. `CollectionBanner.tsx`
* Banner compacto (altura moderada `py-7 sm:py-9`) de alto impacto visual.
* Presenta el título de la colección, temporada y badges de tela deportiva: *UPF 50+ UV*, *Compresión 4-Way Stretch*, *Costuras Reforzadas Flatlock* y *Sublimación Digital HD*.

### 3. `FilterSidebar.tsx`
* Funciona como barra lateral fija en pantallas de escritorio (`hidden lg:block lg:w-72`).
* En móviles se despliega como un drawer modal flotante con backdrop oscuro.
* **Filtros gestionados:**
  - **Género:** Todos, Hombre, Mujer.
  - **Elemento:** Agua, Aire, Fuego, Tierra, Avatar.
  - **Talla:** S, M, L, XL, 2XL (píldoras interactivas con estado activo).
  - **Búsqueda por texto:** Filtra en tiempo real por nombre de elemento o colorway.
  - Botón "Limpiar Filtros" cuando hay criterios activos.

### 4. `ProductCard.tsx`
* Renderiza cada producto bajo una relación de aspecto nativa **3:2** (`aspect-[3/2]`) con fondo `#d0c6c6` idéntico al fondo de estudio de las fotos.
* Muestra las variantes de color (*swatches*) disponibles para ese elemento. Al hacer hover o clic en un swatch, cambia la foto inmediatamente en la tarjeta sin necesidad de abrir el modal.
* Muestra las píldoras de tallas con selección rápida.
* **Nota importante sobre el arte:** Las imágenes ya contienen el nombre del elemento impreso en la esquina superior izquierda (`H01-AGUA / AGUA`). No se deben superponer badges ni texto flotante en esa esquina para evitar redundancia visual.

### 5. `ProductModal.tsx`
* Experiencia inmersiva a pantalla completa o modal centrado (`max-w-5xl`, `h-[88vh] sm:max-h-[840px]`).
* **Contenedor visual izquierdo (62% en desktop):** Foto en 3:2 exacta con fondo `#d0c6c6`, encaje perfecto sin bandas blancas ni distorsión.
* **Panel de configuración derecho (38% en desktop):**
  - Selector de colorway con botones interactivos que actualizan la imagen en tiempo real.
  - Selector de talla interactivo (`S`, `M`, `L`, `XL`, `2XL`).
  - Botón "¿Cuál es mi talla?" que despliega un modal con la tabla de medidas anatómicas en centímetros y pesos sugeridos.
  - Botón de conversión a WhatsApp con el mensaje prearmado:
    `"¡Hola! Me interesa la Rashguard [ELEMENTO] ([GÉNERO]) en colorway [CÓDIGO - NOMBRE] en talla [TALLA]. ¿Tienen disponibilidad?"`

---

## 🎨 Reglas de Diseño y UX

1. **Aspect Ratio de Mockups:** Estrictamente **3:2** (1536 × 1024). Las imágenes no son 3:4 vertical; forzar 3:4 genera bandas grises laterales o recorta el arte.
2. **Color de Fondo de Estudio:** El fondo de los renders 3D es exactamente `rgb(208, 198, 198)` / `#d0c6c6`. Cualquier contenedor de imagen debe usar esta base para que el recorte sea imperceptible.
3. **Control de Scroll:** El modal bloquea el scroll del fondo mediante `useEffect` agregando `overflow-hidden` a `document.body`.
4. **Mobile First:** En smartphones, los filtros y la navegación utilizan gestos táctiles, botones con tamaño mínimo de 44px y contenedores con `overflow-x-auto` y clase `.no-scrollbar`.

---

## 💻 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
pnpm run dev

# Compilar para producción (validación estricta de TypeScript + Vite)
pnpm run build

# Previsualizar el bundle de producción
pnpm run preview
```

---

## 🚢 Flujo de Despliegue y Git

* **Remoto:** `git@github.com:Jhojan-Jimenez/Fi.git`
* **Rama Principal:** `main`
* Para enviar cambios:
  ```bash
  git add .
  git commit -m "feat(catalog): mensaje descriptivo del cambio"
  git push origin main
  ```
