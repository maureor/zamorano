"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
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
    title: "Servicios Terrestres",
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
    badge: "0% Interés",
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/placeholder.svg?height=50&width=150"
              alt="Zamorano Viajes Logo"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="relative flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                {item.title}
                {item.badge && (
                  <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
              <Phone className="h-4 w-4 mr-2" />
              +54 11 4567-8900
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-purple-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
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
                    <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-center border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +54 11 4567-8900
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="bg-purple-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span>🎉 Promociones especiales de septiembre</span>
            <Badge className="bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 text-xs animate-pulse">
              Hasta 30% OFF
            </Badge>
            <span>en destinos seleccionados</span>
          </div>
        </div>
      </div>
    </header>
  )
}
