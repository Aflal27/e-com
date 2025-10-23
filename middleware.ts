import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  const { pathname } = req.nextUrl
  // Protect /admin
  if (pathname.startsWith('/admin') && !token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  // Prevent logged-in admins from seeing /login
  if (pathname.startsWith('/login') && token) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
