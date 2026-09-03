export const API_BASE_URL =
  import.meta.env.VITE_API_URL || (location.hostname === "localhost" ? "http://localhost:7777" : "/api");
