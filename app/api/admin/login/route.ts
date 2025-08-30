import { NextRequest, NextResponse } from 'next/server'

// Credenciales básicas (en producción esto iría en variables de entorno)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { username: string; password: string }
    const { username, password } = body
    console.log('Login attempt:', { username }) // Debug (no password)

    // Verificar credenciales
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      console.log('Login successful, setting cookie') // Debug
      
      // Crear respuesta exitosa
      const response = NextResponse.json({ success: true })
      
      // Establecer cookie de sesión (básica)
      response.cookies.set('admin-session', 'authenticated', {
        httpOnly: false, // Permitir acceso desde JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      })

      return response
    } else {
      return NextResponse.json(
        { message: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Error del servidor' },
      { status: 500 }
    )
  }
}
