# SideWindow - Sistema de Tamaños

El componente `SideWindow` ahora soporta tres tamaños diferentes para adaptarse a diferentes necesidades de contenido.

## Tamaños Disponibles

### 1. Primary - Ancho Completo
- **Descripción**: Ocupa todo el ancho disponible en pantalla
- **Uso**: Para formularios complejos, dashboards, o contenido que necesita máximo espacio
- **Clase CSS**: `w-full`
- **Prop**: `primary`

```tsx
<SideWindow
  trigger={<Button>Formulario Complejo</Button>}
  title="Formulario Complejo"
  primary
>
  {/* Contenido que necesita máximo espacio */}
</SideWindow>
```

### 2. Secondary - Hasta la Sidebar (Por Defecto)
- **Descripción**: Se extiende exactamente hasta la sidebar (16rem = 256px)
- **Uso**: Para la mayoría de formularios y contenido estándar
- **Clase CSS**: `w-[calc(100vw-16rem)]`
- **Prop**: `secondary`

```tsx
<SideWindow
  trigger={<Button>Formulario Estándar</Button>}
  title="Formulario Estándar"
  secondary // o simplemente omitir, es el valor por defecto
>
  {/* Contenido estándar */}
</SideWindow>
```

### 3. Tertiary - Tamaño Compacto
- **Descripción**: Tamaño original del componente Sheet (más compacto)
- **Uso**: Para formularios simples, confirmaciones, o contenido que no necesita mucho espacio
- **Clase CSS**: `w-3/4 sm:max-w-sm`
- **Prop**: `tertiary`

```tsx
<SideWindow
  trigger={<Button>Formulario Simple</Button>}
  title="Formulario Simple"
  tertiary
>
  {/* Contenido compacto */}
</SideWindow>
```

## Implementación Técnica

### Props del SideWindow
```tsx
interface SideWindowProps {
  trigger: React.ReactNode
  title: string
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  primary?: boolean    // Para ancho completo
  secondary?: boolean  // Para hasta la sidebar
  tertiary?: boolean   // Para tamaño compacto
}
```

### Clases CSS Aplicadas
- **Primary**: `w-full` - Ancho completo de la pantalla
- **Secondary**: `w-[calc(100vw-16rem)]` - Ancho hasta la sidebar (16rem = 256px)
- **Tertiary**: `w-3/4 sm:max-w-sm` - 75% del ancho con máximo de 384px

## Casos de Uso Recomendados

### Primary
- Formularios de múltiples pasos
- Dashboards con muchas columnas
- Editores de texto ricos
- Tablas de datos complejas
- Contenido que necesita máximo espacio horizontal

### Secondary (Recomendado para la mayoría)
- Formularios estándar
- Listas de elementos
- Configuraciones
- Vista previa de contenido
- Contenido que respeta la sidebar

### Tertiary
- Confirmaciones
- Formularios simples
- Alertas
- Búsquedas rápidas
- Contenido compacto

## Ejemplo Completo

```tsx
import { SideWindow } from "@/components/ui/side-window"

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {/* Formulario complejo - ancho completo */}
      <SideWindow
        trigger={<Button>Formulario Complejo</Button>}
        title="Formulario Complejo"
        open={open}
        onOpenChange={setOpen}
        primary
      >
        {/* Contenido que necesita máximo espacio */}
      </SideWindow>

      {/* Formulario estándar - hasta la sidebar (por defecto) */}
      <SideWindow
        trigger={<Button>Formulario Estándar</Button>}
        title="Formulario Estándar"
        open={open}
        onOpenChange={setOpen}
        // secondary es el valor por defecto, no necesitas especificarlo
      >
        {/* Contenido estándar */}
      </SideWindow>

      {/* Formulario simple - compacto */}
      <SideWindow
        trigger={<Button>Formulario Simple</Button>}
        title="Formulario Simple"
        open={open}
        onOpenChange={setOpen}
        tertiary
      >
        {/* Contenido compacto */}
      </SideWindow>
    </div>
  )
}
```

## Ventajas del Sistema de Props Directas

- **Sin errores de tipeo**: No puedes escribir `'primary'` por error
- **IntelliSense**: El editor te sugiere las props disponibles
- **Type Safety**: TypeScript valida que solo uses las props correctas
- **Más limpio**: `primary` es más claro que `size="primary"`
- **Por defecto**: Si no especificas ninguna prop, usa `secondary`

## Notas Importantes

- **Secondary** es el tamaño por defecto si no especificas ninguna prop
- **Primary** es útil cuando necesitas máximo espacio horizontal
- **Tertiary** mantiene el comportamiento original del componente Sheet
- Solo puedes usar una prop de tamaño a la vez
- Todos los tamaños son responsivos y se adaptan a diferentes pantallas
