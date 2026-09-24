import type { YoklamaRecord } from "./types";

const BIN_ID = "6aa526aeffd5d16053fd9b35";
const MASTER_KEY = "$2a$10$2t91Xxj8wP.QggDQvBLp3O39FRDkg.z.duCo3XC0fTfA4D5jAZ4xm";
const BASE = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

type BinBody = { records: YoklamaRecord[] };

async function jsonbin<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY,
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Kayıt sunucusuna ulaşılamadı (${res.status}). ${text.slice(0, 180)}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export async function readRecords(): Promise<YoklamaRecord[]> {
  const data = await jsonbin<{ record?: BinBody }>("/latest", {
    method: "GET",
    cache: "no-store",
  });
  return Array.isArray(data.record?.records) ? data.record.records : [];
}

export async function writeRecords(records: YoklamaRecord[]) {
  await jsonbin("", {
    method: "PUT",
    body: JSON.stringify({ records } satisfies BinBody),
  });
}

export async function appendRecord(record: YoklamaRecord) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const records = await readRecords();
      records.unshift(record);
      await writeRecords(records);
      return record;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 180 * (attempt + 1)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Yoklama kaydı gönderilemedi.");
}
