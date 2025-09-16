import axiosInstance from "../../utils/httpClientUtil";
import type { AccountDto,TransactionDTO } from "./accountStore.interface";

export  const getAccount=async(accountNumber : String):Promise<AccountDto> =>{
    const res = await axiosInstance.get(`/accounts/${accountNumber}`); 
     return res.data;
}

export  const getTransactions=async(accountNumber : String):Promise<TransactionDTO[]> =>{
    const res = await axiosInstance.get(`/transactions/${accountNumber}`); 
     return res.data;
}