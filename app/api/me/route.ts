import { cookies } from 'next/headers'
import { authCookieName, verifyAdminToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get(authCookieName)?.value
  if (!token) return NextResponse.json({ authenticated: false })
  try {
    const payload = await verifyAdminToken(token)
    return NextResponse.json({ authenticated: true, user: payload.sub })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
