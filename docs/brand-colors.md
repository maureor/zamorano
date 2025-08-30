# Colores de Marca - Zamorano Turismo

## Colores Violeta de Marca

Los siguientes colores están disponibles globalmente en toda la aplicación:

### Variables CSS
```css
/* Variables disponibles en :root y .dark */
--brand-purple-500: oklch(0.592 0.203 294.84); /* Tono más claro */
--brand-purple-600: oklch(0.532 0.203 294.84); /* Tono principal */
--brand-purple-700: oklch(0.472 0.203 294.84); /* Tono más oscuro */
```

### Clases de Tailwind
```css
/* Disponibles como clases de utilidad */
.bg-brand-purple-600
.text-brand-purple-600
.border-brand-purple-600
.hover:bg-brand-purple-700
.focus:ring-brand-purple-600
```

### Componente Button - Variante Brand
```tsx
// Nueva variante "brand" disponible en el componente Button
<Button variant="brand">
  Botón con colores de marca
</Button>

// Equivale a: bg-brand-purple-600 hover:bg-brand-purple-700
```

### Uso Recomendado

#### Botones Principales
- Usar `variant="brand"` para botones de acción principales
- Crear, Guardar, Confirmar, etc.

#### Botones Secundarios
- Mantener `variant="outline"` o `variant="secondary"`
- Opcional: agregar `hover:border-brand-purple-600` para interacciones sutiles

#### Elementos de Marca
- Usar `text-brand-purple-600` para elementos que necesiten destacar
- Usar `border-brand-purple-600` para bordes de elementos importantes

#### Navegación y Estados
- Hover sutil: `hover:text-brand-purple-600`
- Hover de fondo: `hover:bg-accent/50`
- Sección activa: `text-brand-purple-600` (texto + icono)
- Transiciones: `transition-all duration-200`
- Iconos importantes: `text-brand-purple-600`

#### Estados y Loading
- Spinners: `border-brand-purple-600`
- Badges destacados: `bg-brand-purple-100 text-brand-purple-800`
- Iconos importantes: `text-brand-purple-600`

### Ejemplos de Implementación

```tsx
// Botón principal de acción
<Button variant="brand">
  <Plus className="h-4 w-4 mr-2" />
  Nuevo Viaje
</Button>

// Botón secundario con hover de marca
<Button 
  variant="outline" 
  className="hover:border-brand-purple-600"
>
  Ver Detalles
</Button>

// Elemento de texto destacado
<h2 className="text-brand-purple-600 font-semibold">
  Título Importante
</h2>

// Navegación con hover sutil
<Link className="hover:text-brand-purple-600 hover:bg-accent/50 transition-all duration-200">
  Enlace con Hover Elegante
</Link>

// Navegación activa
<Link className="bg-accent text-brand-purple-600">
  Sección Activa (texto + icono violeta)
</Link>

// Header simple
<CardHeader>
  <CardTitle>Título Importante</CardTitle>
</CardHeader>

// Spinner con color de marca
<div className="animate-spin border-2 border-brand-purple-600 border-t-transparent" />

// Badge destacado
<Badge className="bg-brand-purple-100 text-brand-purple-800 border border-brand-purple-200">
  Estado Importante
</Badge>
```

### Coherencia con Página Pública

Estos colores son idénticos a los utilizados en la página pública:
- `purple-600` → `brand-purple-600`
- `purple-700` → `brand-purple-700`

Esto asegura coherencia visual entre el sitio público y el panel de administración.
