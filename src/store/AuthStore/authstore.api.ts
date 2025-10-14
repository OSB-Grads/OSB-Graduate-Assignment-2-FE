import axiosInstance from "../../utils/httpClientUtil";

export interface AuthResponse {
    token: string;
    refreshToken: string;
}

export const loginApi = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/api/v1/auth/login", {
        username, password
    });
    return response.data;
}

export const registerApi = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>("/api/v1/auth/register", {
        username, password
    });
    return response.data;
}

export const logoutApi = async (refreshToken: string): Promise<boolean> => {
    const response = await axiosInstance.post<boolean>("/api/v1/auth/logout", null, {
        params: { Refreshtoken: refreshToken }
    });
    return response.data;
}