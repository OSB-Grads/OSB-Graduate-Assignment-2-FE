<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> 24ab80a0710d6931be5a4623570ca319151a622c
import axiosInstance from "../../utils/httpClientUtil";

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