import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authCookieName, verifyAdminToken } from '@/lib/auth'
import { dbConnect } from '@/lib/db'
import { Banner } from '@/models/Banner'

async function requireAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get(authCookieName)?.value
  if (!token) return false
  try {
    await verifyAdminToken(token)
    return true
  } catch {
    return false
  }
}

export async function GET() {
  await dbConnect()
  const banners = await Banner.find().sort({ createdAt: -1 })
  return NextResponse.json(banners)
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { image, alt } = await req.json()
  if (!image || !alt)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  await dbConnect()
  const created = await Banner.create({ image, alt })
  return NextResponse.json(created, { status: 201 })
}
