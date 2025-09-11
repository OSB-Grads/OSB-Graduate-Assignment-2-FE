import axiosInstance from "../../utils/httpClientUtil";

export const getUserApi=async()=>{
   const response= await axiosInstance.get('/api/v1/users/me')
   return response.data;
}

export const createUserApi=async(name:string,email:string,phone:string)=>{
    const response=await axiosInstance.put('api/v1/users/me',{name,email,phone})
    return response.status;
}