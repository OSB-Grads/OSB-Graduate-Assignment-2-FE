import { transactionsApi } from "./transactionStore.api";

export const fetchTransactionDetails = async (set : any) => {
    try{
        set(() => ({loading: true}));
        const result = await transactionsApi();
        set(() => ({transactions : result.data, loading : false}));
    } catch(error){
        console.log("Error in transaction fetch", error)
        set(() => ({error : true, loading: false}));
    }
}