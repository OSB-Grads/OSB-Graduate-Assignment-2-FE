import { create } from "zustand";
import { apiFetch } from "../lib/apiClient";

interface AuthState {
  username: string;
  token: string | null;
  setUsername: (username: string) => void;
  login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: "",
  token: null,

  setUsername: (username) => set({ username }),

  login: async (username, password, rememberMe) => {
    const payload = { username, password };

    const data = await apiFetch<{ token: string }>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    // save token in memory
    set({ username, token: data.token });

    // persist in local/session storage
    if (rememberMe) {
      localStorage.setItem("access_token", data.token);
    } else {
      sessionStorage.setItem("access_token", data.token);
    }
  },

  logout: () => {
    set({ username: "", token: null });
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
  },
}));
