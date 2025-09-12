import {create} from "zustand";
import type { transactionState } from "./transactionStore.interface";
import { fetchTransactionDetails } from "./transactionStore.login";


const useTransactionStore = create<transactionState>((set)=>({
    transactions :[],
    loading:false,
    error:false,
    fetchTransactionDetails: () => fetchTransactionDetails(set)
}));

export default useTransactionStore;