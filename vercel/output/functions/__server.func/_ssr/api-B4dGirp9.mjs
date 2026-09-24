import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-CIW9c3A3.mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-B4dGirp9.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-[opacity,transform,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg shadow-sm hover:opacity-90",
			ink: "bg-ink text-paper hover:bg-ink-2",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_var(--color-line)] hover:bg-paper-2",
			ghost: "bg-transparent text-fg-muted hover:bg-paper-2 hover:text-fg",
			cream: "bg-paper text-ink hover:bg-paper-2"
		},
		size: {
			default: "h-11 px-5",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loginAdmin = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("27a12dc5843fc434c662bf9e95bf70f9de70d24b7c54841f00e5046d4cba75ae"));
var listYoklama = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("9bd1b4b0d30a67bd55fef9af1a8d277ad8992334ed22affe0425c7485e3e8e53"));
var submitYoklama = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("e79aeda53f2b51e46dbf87b61cf2b5207bdfb62a3cc3e276d8388bda1ec980b2"));
var askAssistant = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3aee11771751c59ffeb3c4f262e91a82a2c4782a9347d4e0bab3b6d830093f83"));
//#endregion
export { submitYoklama as a, loginAdmin as i, askAssistant as n, listYoklama as r, Button as t };
