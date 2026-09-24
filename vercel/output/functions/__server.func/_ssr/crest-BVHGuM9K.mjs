import { t as cn } from "./utils-CIW9c3A3.mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crest-BVHGuM9K.js
var import_jsx_runtime = require_jsx_runtime();
function Crest({ className, variant = "light" }) {
	const ring = variant === "dark" ? "#f6f1e8" : "#0b1220";
	const fill = variant === "dark" ? "#0b1220" : "#f6f1e8";
	const accent = "#b81c2c";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 80 80",
		className: cn("size-16 shrink-0", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "38",
				fill,
				stroke: ring,
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40",
				cy: "40",
				r: "32.5",
				fill: "none",
				stroke: ring,
				strokeWidth: "0.8",
				opacity: "0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M40 14l2.05 6.3h6.62l-5.36 3.9 2.05 6.3L40 26.6l-5.36 3.9 2.05-6.3-5.36-3.9h6.62z",
				fill: accent
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28 44.5c0-7.4 5.4-12.2 12-12.2 4.6 0 8.2 2.1 10.2 5.4",
				fill: "none",
				stroke: ring,
				strokeWidth: "2.1",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M28.8 44.5h22.4c.8 8.6-4.2 14.8-11.2 14.8-7.2 0-12.2-6.1-11.2-14.8z",
				fill: ring,
				opacity: "0.92"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M26 63.5h28",
				stroke: accent,
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
}
//#endregion
export { Crest as t };
