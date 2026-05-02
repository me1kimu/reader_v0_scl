import crypto from 'crypto'

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('base64')
  const derived = crypto.scryptSync(password, salt, 64)
  return `${salt}:${derived.toString('base64')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false

  const derived = crypto.scryptSync(password, salt, 64)
  const storedBuf = Buffer.from(hash, 'base64')
  if (storedBuf.length !== derived.length) return false
  return crypto.timingSafeEqual(derived, storedBuf)
}

export function generateEncryptionKey(password: string, salt: string): string {
  const key = crypto.scryptSync(password, salt, 32)
  return key.toString('base64')
}

export default {
  hashPassword,
  verifyPassword,
  generateEncryptionKey
}
