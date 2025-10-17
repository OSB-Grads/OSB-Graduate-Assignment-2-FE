import axiosInstance from "../../utils/httpClientUtil";

export const getUserApi = async () => {
    const response = await axiosInstance.get('/api/v1/users/me')
    return response.data;
}

export const createUserApi = async (name: string, email: string, phone: string) => {
    const response = await axiosInstance.put('api/v1/users/me', { name, email, phone })
    return response.status;
}
export const updateUserApi = async (name: string, email: string, phone: string, address: string) => {
    const response = await axiosInstance.patch('api/v1/users/me', { name, email, phone, address })
    return response.status;
}


export const fetchAllUsersForAdminApi=async ()=>{
    const response=await axiosInstance.get('/api/v1/admin/users');
    return response.data;

}