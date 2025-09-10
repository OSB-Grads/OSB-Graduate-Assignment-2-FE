import { setToken } from "../../utils/httpClientUtil";
import { loginApi } from "./authstore.api";

export const login = async (set: any, username: string, password: string, rememberMe: boolean) => {
    try {
        const token = await loginApi(username, password);

        set({
            isAuthenticated: true,
        })
        setToken(token);

        if (rememberMe) {
            localStorage.setItem('token', token);
        }
    } catch (e) {
        console.log("error occurred", e);
    }
}

export const logout = (set: any) => {
    set({
        isAuthenticated: false,
    })
    localStorage.removeItem('token');
    setToken(null);
}