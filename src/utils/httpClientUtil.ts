import axios from "axios";
import { notify } from "../components/Toast/Alerts";
import { ToastTypes } from "../components/Toast/interfaces";
import { logoutApi } from "../store/AuthStore/authstore.api";
import { logout } from "../store/AuthStore/authStore.logic";
import useAuthStore from "../store/AuthStore/authStore";
import { jwtDecode, type JwtPayload } from 'jwt-decode';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

})

interface ITokens {
    token: string | null;
    refreshToken: string | null;
}

interface IJWTTokenPayLoad {
    sub: string,
    role: string,
    exp: number,
    iat: number
}

const tokens: ITokens = {
    token: null,
    refreshToken: null,
}


export const setTokens = function (accessToken: string | null, refreshToken: string | null) {
    tokens.token = accessToken;
    tokens.refreshToken = refreshToken;


    // Store in localStorage
    if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
}

// Initialize tokens from localStorage
export const initializeTokens = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
        tokens.token = accessToken;
        tokens.refreshToken = refreshToken;
    }
}

const getAccessToken = () => tokens.token;
export const getRefreshToken = () => localStorage.getItem('refreshToken');

// Refresh token function
const refreshAuthToken = async (): Promise<string | null> => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const refreshTokenendpoint = import.meta.env.VITE_REFRESH_TOKEN_URL;
        console.log(refreshTokenendpoint);
        const response = await axios.post(refreshTokenendpoint, {}, {
            params: { Refreshtoken: refreshToken },

        });

        const newAccessToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;
        console.log(newAccessToken);
        console.log(newRefreshToken)

        // Update tokens
        setTokens(newAccessToken, newRefreshToken);
        return newAccessToken;
    } catch (error) {
        // Refresh failed, logout user

        notify({
            type: 'UNAUTHENTICATED' as keyof typeof ToastTypes,
            message: 'Session expired, please login again',
        });
        useAuthStore.getState().logout;
        setTokens(null, null);                                     //added logout
        window.location.href = '/login';
        return null;
    }
}


export const getRole = ():string => {

    const token = getAccessToken();

    if (token === null) return "";

    const decoded = jwtDecode<IJWTTokenPayLoad>(token);
    const roleOfUser = decoded.role;
    return roleOfUser;

}
// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor with token refresh logic
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 403 - Token expired (try refresh)
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAuthToken();
                if (newAccessToken) {
                    // Retry the original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, redirect to login

                useAuthStore.getState().logout;
                setTokens(null, null);                                       //added logout
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Handle 403 - Forbidden (no permission)
        // if (error.response?.status === 403) {
        //     notify({
        //         type: 'UNAUTHENTICATED' as keyof typeof ToastTypes,
        //         message: 'Access denied - insufficient permissions',
        //     });
        // }
        // Handle Network Errors
        else if (error.message === 'Network Error') {
            notify({
                type: 'ERROR' as keyof typeof ToastTypes,
                message: 'Backend is not connected',
            });
        }
        // Handle other errors
        else if (error.response?.status >= 500) {
            notify({
                type: 'ERROR' as keyof typeof ToastTypes,
                message: 'Server error, please try again later',
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;