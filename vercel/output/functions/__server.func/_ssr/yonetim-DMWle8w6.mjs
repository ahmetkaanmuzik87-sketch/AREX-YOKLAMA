import { i as __toESM } from "../_runtime.mjs";
import { a as matchesQuery, i as istanbulDateKey, n as formatDateShort } from "./utils-CIW9c3A3.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as LogOut, r as Search, s as Check } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as PageShell } from "./page-shell-DZdjYwzW.mjs";
import { i as loginAdmin, r as listYoklama, t as Button } from "./api-B4dGirp9.mjs";
import { t as Input } from "./input-Bfp2LsBt.mjs";
import { t as Label } from "./label-BmYs5Og3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/yonetim-DMWle8w6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOKEN_KEY = "ao-admin-token";
function YonetimPage() {
	const [token, setToken] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [pin, setPin] = (0, import_react.useState)("");
	const [unlocking, setUnlocking] = (0, import_react.useState)(false);
	const [records, setRecords] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setToken(sessionStorage.getItem(TOKEN_KEY) ?? "");
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!token) return;
		let cancelled = false;
		setLoading(true);
		listYoklama({ data: { token } }).then((res) => {
			if (cancelled) return;
			if (!res.ok) {
				sessionStorage.removeItem(TOKEN_KEY);
				setToken("");
				toast.error(res.error);
				return;
			}
			setRecords(res.records);
		}).catch((err) => {
			if (!cancelled) toast.error(err instanceof Error ? err.message : "Kayıtlar alınamadı.");
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [token]);
	async function onLogin(e) {
		e.preventDefault();
		setUnlocking(true);
		try {
			const res = await loginAdmin({ data: { pin } });
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			sessionStorage.setItem(TOKEN_KEY, res.token);
			setToken(res.token);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Giriş yapılamadı.");
		} finally {
			setUnlocking(false);
		}
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Yönetim",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card",
			children: "Yükleniyor…"
		})
	});
	if (!token) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageShell, {
		title: "Yönetim",
		subtitle: "Kayıtları görmek için şifre gerekli",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: onLogin,
			className: "mx-auto max-w-sm rounded-xl bg-paper p-6 shadow-card sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "pin",
					children: "Yönetim şifresi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "pin",
					type: "password",
					inputMode: "numeric",
					autoComplete: "current-password",
					value: pin,
					onChange: (e) => setPin(e.target.value),
					className: "mt-2 tracking-[0.4em]",
					placeholder: "••••••",
					autoFocus: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-5 h-12 w-full",
					disabled: unlocking || !pin,
					children: unlocking ? "Kontrol ediliyor…" : "Giriş"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminTable, {
		records,
		loading,
		onRefresh: () => {
			setToken((current) => current);
			listYoklama({ data: { token } }).then((res) => {
				if (res.ok) setRecords(res.records);
				else toast.error(res.error);
			});
		},
		onLogout: () => {
			sessionStorage.removeItem(TOKEN_KEY);
			setToken("");
			setRecords([]);
		}
	});
}
function AdminTable({ records, loading, onRefresh, onLogout }) {
	const [teacher, setTeacher] = (0, import_react.useState)("");
	const [student, setStudent] = (0, import_react.useState)("");
	const [number, setNumber] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		return records.filter((r) => {
			if (teacher && !matchesQuery(r.teacherName, teacher)) return false;
			if (student && !matchesQuery(r.absentNames, student)) return false;
			if (number && !matchesQuery(r.absentNumbers, number)) return false;
			if (date && istanbulDateKey(r.submittedAt) !== date) return false;
			return true;
		});
	}, [
		records,
		teacher,
		student,
		number,
		date
	]);
	const hasFilters = Boolean(teacher || student || number || date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageShell, {
		title: "Yönetim",
		subtitle: `${filtered.length} kayıt`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 rounded-xl bg-paper p-4 shadow-card sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-fg-muted uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), "Filtreleme"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						hasFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setTeacher("");
								setStudent("");
								setNumber("");
								setDate("");
							},
							children: "Temizle"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onRefresh,
							children: "Yenile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "size-9",
							onClick: onLogout,
							"aria-label": "Çıkış",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "f-teacher",
							children: "Öğretmen ismi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "f-teacher",
							value: teacher,
							onChange: (e) => setTeacher(e.target.value),
							placeholder: "Ara"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "f-student",
							children: "Yok olan öğrenci"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "f-student",
							value: student,
							onChange: (e) => setStudent(e.target.value),
							placeholder: "Ara"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "f-number",
							children: "Yok olan öğrenci numarası"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "f-number",
							value: number,
							onChange: (e) => setNumber(e.target.value),
							placeholder: "Ara"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "f-date",
							children: "Yoklama tarih-saat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "f-date",
							type: "date",
							value: date,
							onChange: (e) => setDate(e.target.value)
						})]
					})
				]
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card",
			children: "Kayıtlar yükleniyor…"
		}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-paper p-8 text-center text-sm text-fg-muted shadow-card",
			children: "Gösterilecek yoklama kaydı yok."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-hidden rounded-xl bg-paper shadow-card md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-ink text-[11px] tracking-[0.14em] text-paper uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Öğretmen ismi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Yok olan öğrenci ismi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Yok olan öğrenci numarası"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Yoklama alınan tarih ve saat"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-center font-medium",
								children: "Öğrenciler tam"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 ? "bg-paper-2/60" : "bg-paper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-medium text-ink",
								children: r.teacherName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-fg-muted",
								children: r.allPresent ? "" : r.absentNames
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 font-mono text-xs tabular-nums text-fg-muted",
								children: r.allPresent ? "" : r.absentNumbers
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-fg-muted",
								children: r.allPresent ? "" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatDateShort(r.submittedAt), r.lessonHour ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs text-fg-subtle",
									children: r.lessonHour
								}) : null] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-center",
								children: r.allPresent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex size-7 items-center justify-center rounded-full bg-success-soft text-success",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-4",
										strokeWidth: 2.5
									})
								}) : null
							})
						]
					}, r.id)) })]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3 md:hidden",
			children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-xl bg-paper p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-ink",
						children: r.teacherName
					}), r.allPresent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), "Tam"]
					}) : null]
				}), r.allPresent ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 space-y-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-fg-subtle uppercase",
							children: "Öğrenci"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: r.absentNames })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-fg-subtle uppercase",
							children: "Numara"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono text-xs tabular-nums",
							children: r.absentNumbers
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[11px] tracking-wide text-fg-subtle uppercase",
							children: "Tarih ve saat"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [formatDateShort(r.submittedAt), r.lessonHour ? ` · ${r.lessonHour}` : ""] })] })
					]
				})]
			}, r.id))
		})] })]
	});
}
//#endregion
export { YonetimPage as component };
