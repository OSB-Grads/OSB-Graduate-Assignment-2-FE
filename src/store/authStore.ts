import { create } from "zustand";
import type { AuthState } from "./authStore.interface";
import { authenticate, login, logout } from "./authStore.logic";

//AuthStore
const useAuthStore = create<AuthState>()(
    (set) => ({
        isAuthenticated: false,
        authenticate: (toAuthenticate: boolean) => authenticate(set, toAuthenticate),
        //Login
        login: (username, password, rememberMe) => login(set, username, password, rememberMe),
        //Logout
        logout: () => logout(set),
    })
);

export default useAuthStore;