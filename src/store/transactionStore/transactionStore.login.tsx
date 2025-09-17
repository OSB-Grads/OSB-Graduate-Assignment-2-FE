import { getTransactionsFromAccountnumber, transactionsApi } from "./transactionStore.api";

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

export const fetchTransactionFromAccountnumber=async(set:any,accountNumber:string)=>{
    try {
        set(()=>({loadingTransactionsByAccount:true}));
        const result=await getTransactionsFromAccountnumber(accountNumber);
        set(()=>({transactionsFromAccountnumber:result,loadingTransactionsByAccount:false}))
        
    } catch (error) {
        console.log("Error in transaction fetch from account number", error)
        set(() => ({errorTransactionsByAccount: true, loadingTransactionsByAccount: false}));
    }
}