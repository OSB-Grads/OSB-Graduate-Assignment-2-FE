import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import { setTokens, getRefreshToken } from "../../utils/httpClientUtil";
import { loginApi, registerApi, logoutApi} from "./authstore.api";
import type { AuthResponse } from "./authstore.api";

export const authenticate = (set: any, toAuthenticate: boolean) => {
    set({
        isAuthenticated: toAuthenticate,
    })
}

export const signup = async (set: any, username: string, password: string) => {
    try {
        const authResponse: AuthResponse = await registerApi(username, password);
        
        set({
            isAuthenticated: true,
        })
        setTokens(authResponse.token, authResponse.refreshToken);
    } catch (e) {
        console.log("error occurred", e);
        throw e;
    }
}

export const login = async (set: any, username: string, password: string, rememberMe: boolean) => {
    try {
        const authResponse: AuthResponse = await loginApi(username, password);

        set({
            isAuthenticated: true,
        })
        setTokens(authResponse.token, authResponse.refreshToken);
          notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'Login Successful, Welcome',
        });
    } catch (error) {
        console.log("error occurred", error);
          notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: ` Login Failed ,Please Try again `,
        });
        
    }
}

export const logout = async (set: any) => {
    try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const refreshTokenRemoved=  await logoutApi(refreshToken);
          if(refreshTokenRemoved){
            console.log("refresh token is removed");
          }else{
             console.log("refresh token is not removed");
          }
        }
    } catch (error) {
        console.log("Logout API call failed, but clearing tokens anyway", error);
    } finally {
        set({
            isAuthenticated: false,
        })
        setTokens(null, null);
    }
}