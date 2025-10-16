import axiosInstance from "../../utils/httpClientUtil"



export const fetchAllLogsForAdminApi=async()=>{
    const response=await axiosInstance.get('/api/v1/logs');
    return response.data;
}