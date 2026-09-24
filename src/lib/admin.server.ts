import { createHmac, timingSafeEqual } from "node:crypto";

const PIN = "713840";
const SECRET = "ao-yoklama-admin-v1";
const TTL_MS = 1000 * 60 * 60 * 12;

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkPin(pin: string) {
  return safeEqual(pin.trim(), PIN);
}

export function issueToken() {
  const exp = Date.now() + TTL_MS;
  const payload = String(exp);
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string) {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
  return safeEqual(sig, expected);
}
