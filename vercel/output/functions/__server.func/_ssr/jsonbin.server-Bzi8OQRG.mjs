//#region node_modules/.nitro/vite/services/ssr/assets/jsonbin.server-Bzi8OQRG.js
var BIN_ID = "6aa526aeffd5d16053fd9b35";
var MASTER_KEY = "$2a$10$2t91Xxj8wP.QggDQvBLp3O39FRDkg.z.duCo3XC0fTfA4D5jAZ4xm";
var BASE = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
async function jsonbin(path, init) {
	const res = await fetch(`${BASE}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			"X-Master-Key": MASTER_KEY,
			...init.headers ?? {}
		}
	});
	const text = await res.text();
	if (!res.ok) throw new Error(`Kayıt sunucusuna ulaşılamadı (${res.status}). ${text.slice(0, 180)}`);
	return text ? JSON.parse(text) : {};
}
async function readRecords() {
	const data = await jsonbin("/latest", {
		method: "GET",
		cache: "no-store"
	});
	return Array.isArray(data.record?.records) ? data.record.records : [];
}
async function writeRecords(records) {
	await jsonbin("", {
		method: "PUT",
		body: JSON.stringify({ records })
	});
}
async function appendRecord(record) {
	let lastError;
	for (let attempt = 0; attempt < 3; attempt++) try {
		const records = await readRecords();
		records.unshift(record);
		await writeRecords(records);
		return record;
	} catch (error) {
		lastError = error;
		await new Promise((r) => setTimeout(r, 180 * (attempt + 1)));
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("Yoklama kaydı gönderilemedi.");
}
//#endregion
export { appendRecord, readRecords };
