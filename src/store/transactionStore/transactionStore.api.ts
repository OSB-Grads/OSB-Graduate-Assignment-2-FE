import axiosInstance from "../../utils/httpClientUtil";


export const transactionsApi = async() => {
    return await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + '/api/v1/transactions');
}

export const getTransactionsFromAccountnumber=async(accountNumber:string)=>
{
    const result=await axiosInstance.get(`/api/v1/transactions/${accountNumber}`);
    return result.data;
}