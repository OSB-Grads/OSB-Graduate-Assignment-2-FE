import axiosInstance from "../../utils/httpClientUtil";
import type { AccountDto } from "./accountStore.interface";

export  const getAccount=async(accountNumber : String):Promise<AccountDto> =>{
    const res = await axiosInstance.get(`/accounts/${accountNumber}`); 
     return res.data;
}

export const getAllAccounts=async()=>{
    const res=await axiosInstance.get(`/api/v1/accounts`);
    return res.data;
}

export const  postAccount=async (balance:string,accountType:string ,productType:string) => {
    const res=await axiosInstance.post('/api/v1/accounts',
        {balance,accountType},
        {params:{productType}}
    )
    return res.data;
    
}