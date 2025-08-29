"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
      <SheetContent className="overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="flex items-center h-14 px-4 pl-24">
            <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
          </div>
        </div>
        
        <div className="px-6 py-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  )
}
