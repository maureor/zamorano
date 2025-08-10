'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">
              Zamorano
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant={pathname === '/' ? 'default' : 'ghost'} asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant={pathname === '/users' ? 'default' : 'ghost'} asChild>
              <Link href="/users">Users</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 