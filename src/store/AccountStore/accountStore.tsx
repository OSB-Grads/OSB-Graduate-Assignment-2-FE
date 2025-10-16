import { create } from "zustand";
import type { AccountState } from "./accountStore.interface";
import { CreateAccount, fetchAccount, fetchAllAccounts, fetchAllAccountsByAdmin } from "./accountStore.logic";
import { addToResetFns } from "../reset";



const useAccountStore = create<AccountState>(
    (set) => {
        addToResetFns(() => set({
            account:null,
        accounts:[],
        allAccountsForAdmin:[],
        accountLoading:false,
        accountError:false,
        loadingFetchAccount:false,
        errorFetchAccount:false,
        loadingCreateAccount:false,
        errorCreateAccount:null,
        loadingAdminFetch:false,
        errorAdminFetch:false
        }))
        return {
        account:null,
        accounts:[],
        allAccountsForAdmin:[],
        accountLoading:false,
        accountError:false,
        loadingFetchAccount:false,
        errorFetchAccount:false,
        loadingCreateAccount:false,
        errorCreateAccount:null,
        loadingAdminFetch:false,
        errorAdminFetch:false,
        fetchAccount:(accountNumber)=>fetchAccount(set,accountNumber),
        fetchAllAccounts:()=>fetchAllAccounts(set),
        CreateAccount:(balance,accountType,productType)=>CreateAccount(set,balance,accountType,productType),
        fetchAllAccountsByAdmin:()=>fetchAllAccountsByAdmin(set)
        }
    })

export default useAccountStore;