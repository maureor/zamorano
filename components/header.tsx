"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navigationItems = [
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
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo-header.png?height=50&width=150"
              alt="Zamorano Viajes Logo"
              width={150}
              height={50}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                {item.title}
                {item.badge && (
                  <Badge className="absolute -top-4 -right-6 bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs px-1.5 py-0.5 transform scale-75 shadow-sm">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Image
                src="/logo-wpp.png"
                alt="WhatsApp"
                width={30}
                height={30}
                className="mr-1"
              />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-purple-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={buttonRef}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

                {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white shadow-lg fixed top-20 left-0 right-0 z-[9999] animate-in slide-in-from-top-2 duration-300" ref={menuRef}>
              <div className="container mx-auto px-4">
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs px-1.5 py-0.5 shadow-sm">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white justify-center">
                      <Image
                        src="/logo-wpp.png"
                        alt="WhatsApp"
                        width={30}
                        height={30}
                        className="mr-1"
                      />
                      Contactar por WhatsApp
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="bg-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center space-x-4 text-sm">
            <span>🎉 Promociones especiales de septiembre</span>
            <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs animate-pulse">
              Hasta 30% OFF
            </Badge>
            <span>en destinos seleccionados</span>
          </div>
          
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center space-x-2">
              <span className="text-xs">🎉 Promociones especiales de septiembre</span>
            </div>
            <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs animate-pulse px-3 py-1">
              Hasta 30% OFF
            </Badge>
            <div className="text-xs">en destinos seleccionados</div>
          </div>
        </div>
      </div>
    </header>
  )
}
