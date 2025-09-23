import { create } from "zustand";
import type { AccountState } from "./accountStore.interface";
import { CreateAccount, fetchAccount, fetchAllAccounts } from "./accountStore.logic";
import { addToResetFns } from "../reset";



const useAccountStore = create<AccountState>(
    (set) => {
        addToResetFns(() => set({
            account:null,
        accounts:[],
        accountLoading:false,
        accountError:false,
        loadingFetchAccount:false,
        errorFetchAccount:false,
        loadingCreateAccount:false,
        errorCreateAccount:null,
        }))
        return {
        account:null,
        accounts:[],
        accountLoading:false,
        accountError:false,
        loadingFetchAccount:false,
        errorFetchAccount:false,
        loadingCreateAccount:false,
        errorCreateAccount:null,
        fetchAccount:(accountNumber)=>fetchAccount(set,accountNumber),
        fetchAllAccounts:()=>fetchAllAccounts(set),
        CreateAccount:(balance,accountType,productType)=>CreateAccount(set,balance,accountType,productType),
}
    })

export default useAccountStore;