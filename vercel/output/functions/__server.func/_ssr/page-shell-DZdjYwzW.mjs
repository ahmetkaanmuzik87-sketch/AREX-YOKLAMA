import { t as cn } from "./utils-CIW9c3A3.mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Crest } from "./crest-BVHGuM9K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-shell-DZdjYwzW.js
var import_jsx_runtime = require_jsx_runtime();
function PageShell({ title, subtitle, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-grid min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line/80 bg-paper/90 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex size-11 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-paper-2 hover:text-fg",
						"aria-label": "Ana menü",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crest, { className: "size-11" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-medium tracking-[0.22em] text-fg-subtle uppercase",
								children: "Atatürk Ortaokulu · Arhavi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-xl font-semibold leading-tight text-ink sm:text-2xl",
								children: title
							}),
							subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-fg-muted",
								children: subtitle
							}) : null
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: cn("mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8", className),
			children
		})]
	});
}
//#endregion
export { PageShell as t };
