import axios from "axios";

const configuredBase = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
const API = `${configuredBase}/api`;

export const api = axios.create({ baseURL: API, withCredentials: true });

function getCookie(name) {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  const item = document.cookie.split("; ").find((row) => row.startsWith(prefix));
  return item ? decodeURIComponent(item.slice(prefix.length)) : null;
}

api.interceptors.request.use((config) => {
  const csrf = getCookie("csrf_token");
  if (csrf && ["post", "put", "patch", "delete"].includes((config.method || "get").toLowerCase())) {
    config.headers["X-CSRF-Token"] = csrf;
  }
  return config;
});

export function formatError(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default API;
