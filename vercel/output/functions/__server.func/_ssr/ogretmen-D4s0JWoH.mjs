import { i as __toESM } from "../_runtime.mjs";
import { a as matchesQuery } from "./utils-CIW9c3A3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Search } from "../_libs/lucide-react.mjs";
import { t as PageShell } from "./page-shell-DZdjYwzW.mjs";
import { t as Input } from "./input-Bfp2LsBt.mjs";
import { r as teachersByDepartment, t as TEACHERS } from "./teachers-CQdeo4EH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ogretmen-D4s0JWoH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OgretmenList() {
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const list = TEACHERS.filter((t) => matchesQuery(t.name, query) || matchesQuery(t.title, query) || matchesQuery(t.department, query));
		return teachersByDepartment(list);
	}, [query]);
	const total = filtered.reduce((n, g) => n + g.teachers.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		title: "Öğretmen Yoklaması",
		subtitle: "İsminizi arayın veya listeden seçin",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fg-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Öğretmen adı, branş…",
					className: "h-12 pl-10",
					autoFocus: true,
					autoComplete: "off"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-xs tracking-wide text-fg-subtle",
				children: [total, " öğretmen · Teşkilat şeması"]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-paper p-8 text-center shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg-muted",
					children: "Aramanıza uygun öğretmen bulunamadı."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-7",
				children: filtered.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "sticky top-0 z-10 -mx-1 bg-paper/90 px-1 py-2 font-display text-lg font-semibold text-ink backdrop-blur-sm",
					children: group.department
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-line overflow-hidden rounded-xl bg-paper shadow-card",
					children: group.teachers.map((teacher) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/ogretmen/$teacherId",
						params: { teacherId: teacher.id },
						className: "flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-paper-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium text-ink",
							children: teacher.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-fg-muted",
							children: teacher.title
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-wide text-accent",
							children: "Seç"
						})]
					}) }, teacher.id))
				})] }, group.department))
			})
		]
	});
}
//#endregion
export { OgretmenList as component };
