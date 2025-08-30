import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Solo aplicar middleware a rutas /admin (excepto login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      request.nextUrl.pathname !== '/admin/login') {
    
    // Verificar cookie de sesión
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
