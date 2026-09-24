import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-aq_fha3p.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginAdmin_createServerFn_handler = createServerRpc({
	id: "27a12dc5843fc434c662bf9e95bf70f9de70d24b7c54841f00e5046d4cba75ae",
	name: "loginAdmin",
	filename: "src/lib/api.ts"
}, (opts) => loginAdmin.__executeServer(opts));
var loginAdmin = createServerFn({ method: "POST" }).validator((data) => data).handler(loginAdmin_createServerFn_handler, async ({ data }) => {
	const { checkPin, issueToken } = await import("./admin.server-CS9gqJsq.mjs");
	if (!checkPin(data.pin ?? "")) return {
		ok: false,
		error: "Şifre hatalı."
	};
	return {
		ok: true,
		token: issueToken()
	};
});
var listYoklama_createServerFn_handler = createServerRpc({
	id: "9bd1b4b0d30a67bd55fef9af1a8d277ad8992334ed22affe0425c7485e3e8e53",
	name: "listYoklama",
	filename: "src/lib/api.ts"
}, (opts) => listYoklama.__executeServer(opts));
var listYoklama = createServerFn({ method: "POST" }).validator((data) => data).handler(listYoklama_createServerFn_handler, async ({ data }) => {
	const { verifyToken } = await import("./admin.server-CS9gqJsq.mjs");
	if (!verifyToken(data.token ?? "")) return {
		ok: false,
		error: "Oturum sona erdi.",
		records: []
	};
	const { readRecords } = await import("./jsonbin.server-Bzi8OQRG.mjs");
	return {
		ok: true,
		records: await readRecords()
	};
});
var submitYoklama_createServerFn_handler = createServerRpc({
	id: "e79aeda53f2b51e46dbf87b61cf2b5207bdfb62a3cc3e276d8388bda1ec980b2",
	name: "submitYoklama",
	filename: "src/lib/api.ts"
}, (opts) => submitYoklama.__executeServer(opts));
var submitYoklama = createServerFn({ method: "POST" }).validator((data) => data).handler(submitYoklama_createServerFn_handler, async ({ data }) => {
	const allPresent = Boolean(data.allPresent);
	const absentNames = allPresent ? "" : (data.absentNames ?? "").trim();
	const absentNumbers = allPresent ? "" : (data.absentNumbers ?? "").trim();
	const lessonHour = allPresent ? "" : (data.lessonHour ?? "").trim();
	if (!data.teacherId || !data.teacherName) throw new Error("Öğretmen bilgisi eksik.");
	if (!allPresent && (!absentNames || !absentNumbers || !lessonHour)) throw new Error("Tüm alanları doldurun veya «Olmayan öğrenci yok» seçeneğini işaretleyin.");
	const record = {
		id: crypto.randomUUID(),
		teacherId: data.teacherId,
		teacherName: data.teacherName,
		teacherTitle: data.teacherTitle ?? "",
		absentNames,
		absentNumbers,
		lessonHour,
		allPresent,
		submittedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const { appendRecord } = await import("./jsonbin.server-Bzi8OQRG.mjs");
	await appendRecord(record);
	return {
		ok: true,
		record
	};
});
var askAssistant_createServerFn_handler = createServerRpc({
	id: "3aee11771751c59ffeb3c4f262e91a82a2c4782a9347d4e0bab3b6d830093f83",
	name: "askAssistant",
	filename: "src/lib/api.ts"
}, (opts) => askAssistant.__executeServer(opts));
var askAssistant = createServerFn({ method: "POST" }).validator((data) => data).handler(askAssistant_createServerFn_handler, async ({ data }) => {
	const { readRecords } = await import("./jsonbin.server-Bzi8OQRG.mjs");
	const { askGemini } = await import("./gemini.server-BSb9Mn5D.mjs");
	const records = await readRecords();
	return {
		ok: true,
		text: await askGemini(data.messages ?? [], records)
	};
});
//#endregion
export { askAssistant_createServerFn_handler, listYoklama_createServerFn_handler, loginAdmin_createServerFn_handler, submitYoklama_createServerFn_handler };
