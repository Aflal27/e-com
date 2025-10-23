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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const data = await req.json()
  await dbConnect()
  const updated = await Banner.findByIdAndUpdate(id, data, { new: true })
  if (!updated)
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAuth()))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await dbConnect()
  const deleted = await Banner.findByIdAndDelete(id)
  if (!deleted)
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  return NextResponse.json({ ok: true })
}
