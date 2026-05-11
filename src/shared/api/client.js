import { createDemoRecord, getDemoBootstrap } from "../data/demoBootstrap.js";

const API_BASE_URL = getApiBaseUrl();
export const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

export async function loginUser(credentials) {
  if (IS_DEMO_MODE) {
    return {
      token: "demo-token",
      user: {
        name: "Visitante Demo",
        email: credentials.email || "demo@pcd.pro",
        role: "Demo publica"
      }
    };
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "No se pudo iniciar sesion.");
  }

  return data;
}

export async function fetchBootstrap(token) {
  if (IS_DEMO_MODE) {
    return getDemoBootstrap();
  }

  const response = await fetch(`${API_BASE_URL}/bootstrap`, {
    headers: createAuthHeaders(token)
  });

  if (!response.ok) {
    throw new Error("No se pudo conectar con la API de PCD Pro.");
  }

  return response.json();
}

export async function createRecord(endpoint, payload, token) {
  if (IS_DEMO_MODE) {
    return createDemoRecord(endpoint, payload);
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...createAuthHeaders(token)
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "No se pudo crear el registro.");
  }

  return data;
}

function createAuthHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function getApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  const isLocalDevHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const isApiServerPort = window.location.port === "4000";

  if (isLocalDevHost && !isApiServerPort) {
    return "http://127.0.0.1:4000/api";
  }

  return "/api";
}
