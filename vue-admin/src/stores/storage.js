// Tiny localStorage helpers. Replace the stores' usage of these with API calls
// (axios/fetch) when you connect a real backend.
export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable – ignore */
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10)
