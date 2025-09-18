import axiosInstance from "../../utils/httpClientUtil";


export const transactionsApi = async() => {
    return await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + '/api/v1/transactions');
}

export const getTransactionsFromAccountnumber=async(accountNumber:string)=>
{
    const result=await axiosInstance.get(`/api/v1/transactions/${accountNumber}`);
    return result.data;
}


export const transferAmountAPI=async(fromAccountNumber:string,toAccountNumber:string,amount:number)=>{
    return await axiosInstance.post(import.meta.env.VITE_API_BASE_URL + '/api/v1/transactions/transfer', {
                fromAccountNumber,
                toAccountNumber,
                amount,
            });
}