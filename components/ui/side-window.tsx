"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
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
}

export function SideWindow({
  trigger,
  title,
  children,
  open,
  onOpenChange,
}: SideWindowProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col">
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
