import { create } from "zustand";
import type { AuthState } from "./authStore.interface";
import { login, signup, logout, authenticate } from "./authStore.logic";
import { addToResetFns } from "../reset";

//AuthStore
const useAuthStore = create<AuthState>()(
    (set) => {
        addToResetFns(() => set({
            isAuthenticated: false,
        }))
        return {
        isAuthenticated: false,
        authenticate: (toAuthenticate: boolean) => authenticate(set, toAuthenticate),
        //Login
        login: (username, password, rememberMe) => login(set, username, password, rememberMe),
        signup : (username, password)  => signup(set, username, password),
        //Logout
        logout: () => logout(set),
    }
    }
);

export default useAuthStore;