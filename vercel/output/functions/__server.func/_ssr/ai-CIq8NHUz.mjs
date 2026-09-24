import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-CIW9c3A3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Bot, l as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as PageShell } from "./page-shell-DZdjYwzW.mjs";
import { n as askAssistant, t as Button } from "./api-B4dGirp9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CIq8NHUz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTIONS = [
	"Bugün kimler yok?",
	"Hangi öğretmenler yoklama gönderdi?",
	"Olmayan öğrenci yok işaretlenen dersler"
];
function ChatBody({ text }) {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, i) => {
		const bold = /^\*\*([^*]+)\*\*$/.exec(part);
		if (bold) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: bold[1] }, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	}) });
}
function AiPage() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const scroller = (0, import_react.useRef)(null);
	async function send(text) {
		const trimmed = text.trim();
		if (!trimmed || pending) return;
		const next = [...messages, {
			role: "user",
			text: trimmed
		}];
		setMessages(next);
		setInput("");
		setPending(true);
		setError("");
		try {
			const res = await askAssistant({ data: { messages: next } });
			setMessages([...next, {
				role: "model",
				text: res.text
			}]);
			requestAnimationFrame(() => {
				scroller.current?.scrollTo({
					top: scroller.current.scrollHeight,
					behavior: "smooth"
				});
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Yanıt alınamadı.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Atatürk AI",
		subtitle: "Yoklama asistanı · Gemini ücretsiz katman",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[70dvh] flex-col rounded-xl bg-paper shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full min-h-64 flex-col items-center justify-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-12 items-center justify-center rounded-full bg-ink text-paper",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-display text-2xl font-semibold text-ink",
								children: "Nasıl yardımcı olayım?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-sm text-sm text-fg-muted",
								children: "Yoklama kayıtlarını sorabilir, günlük özet alabilir veya form hakkında bilgi isteyebilirsiniz."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap justify-center gap-2",
								children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => send(s),
									className: "rounded-full bg-paper-2 px-3 py-2 text-xs text-fg transition-colors hover:bg-paper-3",
									children: s
								}, s))
							})
						]
					}) : messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex", m.role === "user" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap", m.role === "user" ? "rounded-br-xs bg-ink text-paper" : "rounded-bl-xs bg-paper-2 text-fg"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatBody, { text: m.text })
						})
					}, `${m.role}-${i}`)),
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-fg-subtle",
						children: "Düşünüyor…"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-accent",
						children: error
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "border-t border-line p-3 sm:p-4",
				onSubmit: (e) => {
					e.preventDefault();
					send(input);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						rows: 1,
						placeholder: "Bir soru yazın…",
						className: "max-h-32 min-h-11 flex-1 resize-none rounded-md bg-paper-2 px-3.5 py-2.5 text-sm outline-none focus-visible:shadow-[0_0_0_2px_var(--color-accent)]",
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								send(input);
							}
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: pending || !input.trim(),
						"aria-label": "Gönder",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})]
				})
			})]
		})
	});
}
//#endregion
export { AiPage as component };
