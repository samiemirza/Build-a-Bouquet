export const MAX_NOTE_LENGTH = 160;
const MAX_PAYLOAD_LENGTH = 4096;

export type BouquetPayload = {
  f: string;
  w: string;
  n: string;
};

const idPattern = /^[a-z0-9-]{1,40}$/i;

export function normalizeNote(note: string): string {
  return note.replace(/\r\n?/g, "\n").trim();
}

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof window === "undefined") {
    return Buffer.from(bytes).toString("base64");
  }

  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  if (typeof window === "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }

  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function toBase64Url(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(base64url: string): string {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4;
  if (padding === 0) {
    return base64;
  }
  return `${base64}${"=".repeat(4 - padding)}`;
}

function parsePayload(value: unknown): BouquetPayload | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const candidate = value as Partial<BouquetPayload>;

  if (
    typeof candidate.f !== "string" ||
    typeof candidate.w !== "string" ||
    typeof candidate.n !== "string"
  ) {
    return null;
  }

  if (!idPattern.test(candidate.f) || !idPattern.test(candidate.w)) {
    return null;
  }

  return {
    f: candidate.f,
    w: candidate.w,
    n: normalizeNote(candidate.n).slice(0, MAX_NOTE_LENGTH)
  };
}

export function encodePayload(payload: BouquetPayload): string {
  const parsed = parsePayload(payload);

  if (!parsed) {
    throw new Error("Invalid bouquet payload");
  }

  const json = JSON.stringify(parsed);
  const bytes = new TextEncoder().encode(json);
  const base64 = bytesToBase64(bytes);
  return toBase64Url(base64);
}

export function decodePayload(payload: string): BouquetPayload | null {
  if (!payload || payload.length > MAX_PAYLOAD_LENGTH) {
    return null;
  }

  try {
    const base64 = fromBase64Url(payload);
    const bytes = base64ToBytes(base64);
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    return parsePayload(parsed);
  } catch {
    return null;
  }
}
