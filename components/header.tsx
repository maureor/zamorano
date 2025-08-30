"use client"

import React, { useEffect, useRef, useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



// Memoizar los items de navegación como constantes estáticas
const NAVIGATION_ITEMS = [
  {
    title: "Paquetes en Bus",
    href: "/paquetes-bus",
    badge: "Popular",
  },
  {
    title: "Paquetes Aéreos",
    href: "/paquetes-aereos",
    badge: null,
  },
  {
    title: "Terrestres",
    href: "/servicios-terrestres",
    badge: null,
  },
  {
    title: "Cruceros",
    href: "/cruceros",
    badge: "Nuevo",
  },
  {
    title: "Transporte",
    href: "/transporte",
    badge: null,
  },
  {
    title: "Financiación",
    href: "/financiacion",
    badge: null,
  },
] as const

// Componente memoizado para cada item de navegación
const NavigationItem = memo(function NavigationItem({ 
  item, 
  isMobile = false,
  onClose 
}: { 
  item: typeof NAVIGATION_ITEMS[number]
  isMobile?: boolean
  onClose?: () => void
}) {
  const handleClick = useCallback(() => {
    if (isMobile && onClose) {
      onClose()
    }
  }, [isMobile, onClose])

  return (
    <Link
      href={item.href}
      className={`relative flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium ${
        isMobile ? 'justify-between py-2' : ''
      }`}
      onClick={handleClick}
    >
      <span>{item.title}</span>
      {item.badge && (
        <Badge 
          className={`bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs px-1.5 py-0.5 shadow-sm ${
            isMobile ? '' : 'absolute -top-4 -right-6 transform scale-75'
          }`}
        >
          {item.badge}
        </Badge>
      )}
    </Link>
  )
})

// Componente memoizado para la navegación desktop
const DesktopNavigation = memo(function DesktopNavigation() {
  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {NAVIGATION_ITEMS.map((item, index) => (
        <NavigationItem key={`desktop-${index}`} item={item} />
      ))}
    </nav>
  )
})

// Componente memoizado para la navegación móvil
const MobileNavigation = memo(function MobileNavigation({
  isOpen,
  onClose,
  buttonRef
}: {
  isOpen: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Manejar click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose, buttonRef])

  if (!isOpen) return null

  return (
    <div ref={menuRef} className="lg:hidden py-4 border-t border-gray-200 bg-white shadow-lg fixed top-20 left-0 right-0 z-[9999] animate-in slide-in-from-top-2 duration-300">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col space-y-4">
          {NAVIGATION_ITEMS.map((item, index) => (
            <NavigationItem 
              key={`mobile-${index}`} 
              item={item} 
              isMobile={true}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </div>
  )
})



// Hook personalizado para el menú móvil
function useMobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Cerrar menú al hacer scroll en mobile
  useEffect(() => {
    const handleScroll = () => {
      // Solo cerrar si estamos en mobile (viewport < 768px) y el menú está abierto
      if (isMenuOpen && window.innerWidth < 768) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      // Agregar listener con passive para mejor rendimiento
      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isMenuOpen, closeMenu])

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    buttonRef
  }
}

// Componente principal del Header ultra-optimizado
export const Header = memo(function Header() {
  const { isMenuOpen, toggleMenu, closeMenu, buttonRef } = useMobileMenu()

  // Clases del header fijas (sin animación de scroll)
  const headerClasses = "bg-white shadow-lg fixed top-0 z-40 w-full overflow-hidden"

  return (
    <>

      
      <header className={headerClasses}>
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Memoizado */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo-header.png?height=50&width=150"
                alt="Zamorano Viajes Logo"
                width={150}
                height={50}
                className="h-9 w-auto"
                priority
              />
            </Link>

            {/* Navegación Desktop */}
            <DesktopNavigation />

            {/* Botones Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* WhatsApp button removed to avoid duplication */}
            </div>

            {/* Botón Menú Móvil */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-purple-600"
              onClick={toggleMenu}
              ref={buttonRef}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Navegación Móvil */}
      <MobileNavigation isOpen={isMenuOpen} onClose={closeMenu} buttonRef={buttonRef} />
    </>
  )
})

// Exportar como default también
export default Header
