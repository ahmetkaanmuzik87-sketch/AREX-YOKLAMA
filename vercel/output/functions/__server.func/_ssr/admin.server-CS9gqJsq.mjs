import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.server-CS9gqJsq.js
var PIN = "713840";
var SECRET = "ao-yoklama-admin-v1";
var TTL_MS = 432e5;
function safeEqual(a, b) {
	const left = Buffer.from(a);
	const right = Buffer.from(b);
	if (left.length !== right.length) return false;
	return timingSafeEqual(left, right);
}
function checkPin(pin) {
	return safeEqual(pin.trim(), PIN);
}
function issueToken() {
	const exp = Date.now() + TTL_MS;
	const payload = String(exp);
	return `${payload}.${createHmac("sha256", SECRET).update(payload).digest("hex")}`;
}
function verifyToken(token) {
	const [payload, sig] = token.split(".");
	if (!payload || !sig) return false;
	const exp = Number(payload);
	if (!Number.isFinite(exp) || Date.now() > exp) return false;
	return safeEqual(sig, createHmac("sha256", SECRET).update(payload).digest("hex"));
}
//#endregion
export { checkPin, issueToken, verifyToken };
