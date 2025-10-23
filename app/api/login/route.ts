import { NextRequest, NextResponse } from 'next/server'
import {
  authCookieName,
  signAdminToken,
  validateAdminCredentials,
} from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }
  const ok = validateAdminCredentials(username, password)
  if (!ok)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  const token = await signAdminToken({ sub: username, role: 'admin' })
  const res = NextResponse.json({ ok: true })
  res.cookies.set(authCookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
