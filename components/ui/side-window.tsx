"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { RefreshButton } from "@/components/ui/refresh-button"

interface SideWindowProps {
  trigger: React.ReactNode
  title: string
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean
}

export function SideWindow({
  trigger,
  title,
  children,
  open,
  onOpenChange,
  primary,
  secondary,
  tertiary,
}: SideWindowProps) {
  // Hook para detectar si es mobile
  const [isMobile, setIsMobile] = React.useState(false)
  
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Verificar en el mount
    checkIsMobile()
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        className="p-0 flex flex-col" 
        primary={isMobile ? true : primary}
        secondary={isMobile ? false : secondary}
        tertiary={isMobile ? false : tertiary}
      >
        {/* Header fijo */}
        <div className="flex-shrink-0 bg-background border-b relative">
          <div className="flex items-center h-14 px-4 pl-24">
            <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
          </div>
          {/* RefreshButton posicionado junto al botón X */}
          <div className="absolute top-2 left-12 z-20">
            <RefreshButton />
          </div>
        </div>
        
        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
