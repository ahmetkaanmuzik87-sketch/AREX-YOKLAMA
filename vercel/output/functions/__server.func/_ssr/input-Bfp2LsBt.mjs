import { t as cn } from "./utils-CIW9c3A3.mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-Bfp2LsBt.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-11 w-full rounded-md bg-paper px-3.5 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 placeholder:text-fg-subtle focus-visible:shadow-[0_0_0_2px_var(--color-accent)] disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-fg-subtle", className),
		...props
	});
}
//#endregion
export { Input as t };
