import { SignJWT, jwtVerify } from 'jose'

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
const encoder = new TextEncoder()

export async function signAdminToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(ADMIN_JWT_SECRET))
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, encoder.encode(ADMIN_JWT_SECRET))
  return payload
}

export function validateAdminCredentials(username: string, password: string) {
  return username === ADMIN_USER && password === ADMIN_PASS
}

export const authCookieName = 'admin_token'
