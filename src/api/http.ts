// Tiny fetch wrapper: prefixes the base URL, sends/receives JSON, and unwraps
// the backend's `{ success, data, message, error }` envelope (ResponseWrapperAdvice).
// Throws on HTTP errors or `success:false` so callers can catch + toast.

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  "https://willubuyitornot-be-production.up.railway.app";

interface Envelope<T> {
  success: boolean;
  data: T;
  message: string | null;
  error: string | null;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  let body: Envelope<T> | null = null;
  try {
    body = (await res.json()) as Envelope<T>;
  } catch {
    // non-JSON / empty body — handled below
  }

  if (!res.ok || !body || body.success === false) {
    const reason =
      body?.error || body?.message || `요청에 실패했어요 (${res.status})`;
    throw new Error(reason);
  }

  return body.data;
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export function apiPost<T>(path: string, payload?: unknown): Promise<T> {
  return request<T>(path, {
    method: "POST",
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
}
