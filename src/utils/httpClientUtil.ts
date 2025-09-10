import axios from "axios";
import { notify } from "../components/Toast/Alerts";
import { ToastTypes } from "../components/Toast/interfaces";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

interface IToken {
    token: string | null,
}

const token: IToken = {
    token: null,
}

export const setToken = function (t: string | null) {
    token.token = t
}

const getToken = () => token.token

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    }
)
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.message === 'Network Error') {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'Backend is not connected ',
            });
        } else {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'An error occurred while receiving response',
            });
        }

        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.message === 'Network Error') {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'Backend is not connected',
            });
        }
        return Promise.reject(error);
    }
);


export default axiosInstance