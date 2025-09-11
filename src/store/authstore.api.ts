import axios from "axios";
import axiosInstance from "../utils/httpClientUtil";

export const loginApi = async (username: string, password: string) => {
    const response = await axiosInstance.post("/api/v1/auth/login", {
        username, password
    })
    return response.data.token;
}

export const registerApi = async (username : string, password : string ) => {
    const response = await axiosInstance.post("/api/v1/auth/register", {
        username, password
    })
    return response.data.token;
}