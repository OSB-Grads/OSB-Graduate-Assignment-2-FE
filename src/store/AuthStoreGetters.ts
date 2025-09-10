import useAuthStore from "./authStore"
import type { AuthState } from "./authStore.interface"

export const isAuthenticated = () => {
    return useAuthStore((state: AuthState) => state.isAuthenticated)
}

export const getAuthStore = () => {
    return useAuthStore((state: AuthState) => state)
}