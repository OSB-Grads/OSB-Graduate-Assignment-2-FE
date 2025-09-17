import {create} from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails, fetchTransactionFromAccountnumber } from "./transactionStore.login";


const useTransactionStore = create<transactionState>((set)=>({
    transactions :[],
    transactionsFromAccountnumber:[],
    loading:false,
    error:false,
    loadingTransactionsByAccount:false,
    errorTransactionsByAccount:false,
    fetchTransactionDetails: () => fetchTransactionDetails(set),
    fetchTransactionFromAccountnumber:(accountNumber:string)=>fetchTransactionFromAccountnumber(set,accountNumber)
}));

export default useTransactionStore;