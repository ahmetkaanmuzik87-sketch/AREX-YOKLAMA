import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-CIW9c3A3.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as CircleCheck, s as Check } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as Route } from "./_ssr/router-4d2op6tb.mjs";
import { t as PageShell } from "./_ssr/page-shell-DZdjYwzW.mjs";
import { a as submitYoklama, t as Button } from "./_ssr/api-B4dGirp9.mjs";
import { t as Input } from "./_ssr/input-Bfp2LsBt.mjs";
import { t as Label } from "./_ssr/label-BmYs5Og3.mjs";
import { n as getTeacher } from "./_ssr/teachers-CQdeo4EH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_teacherId-BO7lLkLd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md bg-paper px-3.5 py-2.5 text-sm text-fg shadow-[0_0_0_1px_var(--color-line)] outline-none transition-[box-shadow] duration-150 placeholder:text-fg-subtle focus-visible:shadow-[0_0_0_2px_var(--color-accent)] disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-fg-subtle", className),
		...props
	});
}
function YoklamaForm() {
	const { teacherId } = Route.useParams();
	const teacher = getTeacher(teacherId);
	const [absentNames, setAbsentNames] = (0, import_react.useState)("");
	const [absentNumbers, setAbsentNumbers] = (0, import_react.useState)("");
	const [lessonHour, setLessonHour] = (0, import_react.useState)("");
	const [allPresent, setAllPresent] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	if (!teacher) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Öğretmen bulunamadı",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-paper p-8 text-center shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg-muted",
				children: "Bu isim kadroda yer almıyor."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				variant: "ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/ogretmen",
					children: "Listeye dön"
				})
			})]
		})
	});
	function validate() {
		if (allPresent) return true;
		const next = {};
		if (!absentNames.trim()) next.absentNames = "Yok olan öğrenci isimlerini yazın.";
		if (!absentNumbers.trim()) next.absentNumbers = "Yok olan öğrenci numaralarını yazın.";
		if (!lessonHour.trim()) next.lessonHour = "Ders saatini yazın.";
		setErrors(next);
		return Object.keys(next).length === 0;
	}
	async function onSubmit(e) {
		e.preventDefault();
		if (!teacher) return;
		if (!validate()) return;
		setSending(true);
		try {
			await submitYoklama({ data: {
				teacherId: teacher.id,
				teacherName: teacher.name,
				teacherTitle: teacher.title,
				absentNames: allPresent ? "" : absentNames,
				absentNumbers: allPresent ? "" : absentNumbers,
				lessonHour: allPresent ? "" : lessonHour,
				allPresent
			} });
			setDone(true);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Gönderilemedi.");
		} finally {
			setSending(false);
		}
	}
	function toggleAllPresent() {
		const next = !allPresent;
		setAllPresent(next);
		setErrors({});
		if (next) {
			setAbsentNames("");
			setAbsentNumbers("");
			setLessonHour("");
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Yoklama",
		subtitle: teacher.name,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-lg rounded-xl bg-paper px-6 py-12 text-center shadow-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "mx-auto size-12 text-success",
					strokeWidth: 1.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 font-display text-2xl font-semibold leading-snug tracking-wide text-ink uppercase",
					children: [
						"Yoklama gönderildi",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"dersinize devam edebilirsiniz"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ink",
						onClick: () => {
							setDone(false);
							setAllPresent(false);
							setAbsentNames("");
							setAbsentNumbers("");
							setLessonHour("");
						},
						children: "Yeni yoklama"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Ana menü"
						})
					})]
				})
			]
		})
	});
	const locked = allPresent;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: teacher.name,
		subtitle: teacher.title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mx-auto max-w-lg space-y-5 rounded-xl bg-paper p-5 shadow-card sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "absent-names",
							children: "Yok olan öğrenci isimleri"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "absent-names",
							value: absentNames,
							onChange: (e) => setAbsentNames(e.target.value),
							disabled: locked,
							placeholder: "Örn: Ayşe Demir, Mehmet Kaya",
							rows: 3
						}),
						errors.absentNames ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: errors.absentNames
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "absent-numbers",
							children: "Yok olan öğrenci numaraları"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "absent-numbers",
							value: absentNumbers,
							onChange: (e) => setAbsentNumbers(e.target.value),
							disabled: locked,
							placeholder: "Örn: 145, 212",
							rows: 2
						}),
						errors.absentNumbers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: errors.absentNumbers
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "lesson-hour",
							children: "Yoklama alınan ders saati"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "lesson-hour",
							value: lessonHour,
							onChange: (e) => setLessonHour(e.target.value),
							disabled: locked,
							placeholder: "Örn: 3. Ders"
						}),
						errors.lessonHour ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-accent",
							children: errors.lessonHour
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "switch",
					"aria-checked": allPresent,
					onClick: toggleAllPresent,
					className: cn("flex min-h-14 w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors", allPresent ? "bg-success-soft text-success" : "bg-paper-2 text-fg"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-6 shrink-0 items-center justify-center rounded-xs border", allPresent ? "border-success bg-success text-paper" : "border-line bg-paper"),
						children: allPresent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4",
							strokeWidth: 2.5
						}) : null
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-medium tracking-wide",
						children: "Olmayan öğrenci yok"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs opacity-70",
						children: "İşaretlenince üstteki alanlar kilitlenir"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "h-12 w-full",
					disabled: sending,
					children: sending ? "Gönderiliyor…" : "Gönder"
				})
			]
		})
	});
}
//#endregion
export { YoklamaForm as component };
