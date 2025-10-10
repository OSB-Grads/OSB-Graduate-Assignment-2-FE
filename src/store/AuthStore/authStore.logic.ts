import { setToken } from "../../utils/httpClientUtil";
import { resetAllStores } from "../reset";
import { loginApi, registerApi } from "./authstore.api";

export const authenticate = (set: any, toAuthenticate: boolean) => {
    set({
        isAuthenticated: toAuthenticate,
    })
}

export const signup = async (set: any, username: string, password: string) => {
    try {
        const token = await registerApi(username, password);
        
        set({
            isAuthenticated: true,
        })
        setToken(token);
    } catch (e) {
        console.log("error occurred", e);
    }
}

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
    resetAllStores();
    console.log("LogOut INtiated")
    localStorage.removeItem('token');
    console.log("Token Deletion successful")
    setToken(null);
}