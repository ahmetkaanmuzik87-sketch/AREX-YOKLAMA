import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CIW9c3A3.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function foldTr(value) {
	return value.toLocaleLowerCase("tr").replaceAll("ı", "i").replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ş", "s").replaceAll("ö", "o").replaceAll("ç", "c").normalize("NFD").replace(/\p{M}/gu, "");
}
function matchesQuery(haystack, needle) {
	const q = foldTr(needle.trim());
	if (!q) return true;
	return foldTr(haystack).includes(q);
}
function formatDateTime(iso) {
	try {
		return new Intl.DateTimeFormat("tr-TR", {
			timeZone: "Europe/Istanbul",
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}
function formatDateShort(iso) {
	try {
		return new Intl.DateTimeFormat("tr-TR", {
			timeZone: "Europe/Istanbul",
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}).format(new Date(iso));
	} catch {
		return iso;
	}
}
function istanbulDateKey(iso) {
	try {
		return new Intl.DateTimeFormat("en-CA", {
			timeZone: "Europe/Istanbul",
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		}).format(new Date(iso));
	} catch {
		return "";
	}
}
//#endregion
export { matchesQuery as a, istanbulDateKey as i, formatDateShort as n, formatDateTime as r, cn as t };
