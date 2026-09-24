import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ClipboardList, c as Bot, n as Shield } from "../_libs/lucide-react.mjs";
import { t as Crest } from "./crest-BVHGuM9K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-edI8q69y.js
var import_jsx_runtime = require_jsx_runtime();
var OPTIONS = [
	{
		to: "/yonetim",
		label: "Yönetim",
		detail: "Yoklama kayıtlarını görüntüle ve filtrele",
		icon: Shield
	},
	{
		to: "/ogretmen",
		label: "Öğretmen",
		detail: "İsminizi seçin, ders yoklamasını gönderin",
		icon: ClipboardList
	},
	{
		to: "/ai",
		label: "Atatürk AI",
		detail: "Yoklama asistanı · Gemini ücretsiz katman",
		icon: Bot
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ink-grid relative min-h-dvh overflow-hidden bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent",
			"aria-hidden": "true"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "rise flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, {
						variant: "dark",
						className: "size-14 sm:size-[4.5rem]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-medium tracking-[0.28em] text-paper/55 uppercase",
						children: "T.C. Millî Eğitim Bakanlığı"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] tracking-[0.18em] text-paper/70 uppercase",
						children: "Artvin · Arhavi"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise mt-8 mb-8 sm:my-auto sm:py-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium tracking-[0.32em] text-accent-soft uppercase",
							children: "2026–2027 öğretim yılı"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-display text-[2.2rem] leading-[0.95] font-semibold tracking-tight text-paper sm:text-6xl",
							children: [
								"Atatürk",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Ortaokulu"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-px w-24 bg-accent sm:mt-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-xl tracking-[0.18em] text-paper/85 uppercase sm:mt-4 sm:text-3xl",
							children: "Yoklama Sistemi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-lg font-display text-base leading-snug text-paper/55 italic sm:mt-6 sm:text-lg",
							children: "Öğretmenler! Yeni nesil sizin eseriniz olacaktır."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "rise grid gap-3 pb-4 sm:grid-cols-3",
					style: { animationDelay: "160ms" },
					"aria-label": "Ana menü",
					children: OPTIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "group rounded-xl bg-paper p-5 text-ink shadow-card transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-hover",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
								className: "size-5 text-accent",
								strokeWidth: 1.75
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-display text-2xl font-semibold tracking-tight",
								children: item.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-snug text-fg-muted",
								children: item.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 inline-flex text-xs font-medium tracking-wide text-accent",
								children: "Devam et"
							})
						]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-6 text-center text-[11px] tracking-wide text-paper/40",
					children: "Arhavi Atatürk Ortaokulu · Teşkilat şemasına göre kadro"
				})
			]
		})]
	});
}
//#endregion
export { Home as component };
