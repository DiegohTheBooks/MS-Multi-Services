import "server-only";

import { createHmac, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { cookies } from "next/headers";

const scryptAsync = promisify(scrypt);
const SESSION_COOKIE = "ms-admin-session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

type CookieStore = Awaited<ReturnType<typeof cookies>>;
type AdminSession = { email: string; expiresAt: number };

function getAuthConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.AUTH_SECRET;
  if (!email || !passwordHash || !secret || Buffer.byteLength(secret) < 32) return null;
  return { email, passwordHash, secret };
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [algorithm, salt, expectedEncoded] = storedHash.split("$");
  if (algorithm !== "scrypt" || !salt || !expectedEncoded) return false;
  let expected: Buffer;
  try { expected = Buffer.from(expectedEncoded, "base64url"); } catch { return false; }
  if (expected.length !== 64 || salt.length > 128) return false;
  const actual = await scryptAsync(password, salt, expected.length) as Buffer;
  return timingSafeEqual(actual, expected);
}

export async function authenticateAdmin(email: string, password: string): Promise<boolean> {
  const config = getAuthConfig();
  if (!config) return false;

  const now = Date.now();
  const attempts = failedAttempts.get(config.email);
  if (attempts?.lockedUntil && attempts.lockedUntil > now) return false;
  if (attempts?.lockedUntil && attempts.lockedUntil <= now) failedAttempts.delete(config.email);

  const emailMatches = email === config.email;
  const passwordMatches = await verifyPassword(password, config.passwordHash).catch(() => false);
  if (!emailMatches || !passwordMatches) {
    const current = failedAttempts.get(config.email) ?? { count: 0, lockedUntil: 0 };
    current.count += 1;
    if (current.count >= MAX_FAILED_ATTEMPTS) current.lockedUntil = now + LOCKOUT_MS;
    failedAttempts.set(config.email, current);
    return false;
  }
  failedAttempts.delete(config.email);
  return true;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export async function createAdminSession(cookieStore: CookieStore, email: string): Promise<void> {
  const config = getAuthConfig();
  if (!config) throw new Error("A configuração administrativa está incompleta.");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const payload = Buffer.from(JSON.stringify({ email, expiresAt } satisfies AdminSession)).toString("base64url");
  const token = payload + "." + sign(payload, config.secret);
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession(cookieStore: CookieStore): Promise<void> {
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(cookieStore: CookieStore): Promise<AdminSession | null> {
  const config = getAuthConfig();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!config || !token) return null;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;
  const payload = token.slice(0, separator);
  const suppliedSignature = Buffer.from(token.slice(separator + 1), "base64url");
  const expectedSignature = Buffer.from(sign(payload, config.secret), "base64url");
  if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (session.email !== config.email || !Number.isInteger(session.expiresAt) || session.expiresAt <= Date.now() / 1000) return null;
    return session;
  } catch { return null; }
}

export function hasAdminSession(request: { cookies: { get(name: string): { value: string } | undefined } }): boolean {
  const config = getAuthConfig();
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!config || !token) return false;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = token.slice(0, separator);
  const suppliedSignature = Buffer.from(token.slice(separator + 1), "base64url");
  const expectedSignature = Buffer.from(sign(payload, config.secret), "base64url");
  if (suppliedSignature.length !== expectedSignature.length || !timingSafeEqual(suppliedSignature, expectedSignature)) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    return session.email === config.email && Number.isInteger(session.expiresAt) && session.expiresAt > Date.now() / 1000;
  } catch { return false; }
}

