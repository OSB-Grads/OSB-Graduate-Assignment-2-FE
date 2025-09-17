import { create } from "zustand";
import type { AccountState } from "./accountStore.interface";
import { CreateAccount, fetchAccount, fetchAllAccounts } from "./accountStore.logic";



const useAccountStore = create<AccountState>(
    (set) => ({
        account:null,
        accounts:[],
        accountLoading:false,
        accountError:null,
        loadingFetchAccount:false,
        errorFetchAccount:null,
        loadingCreateAccount:false,
        errorCreateAccount:null,
        fetchAccount:(accountNumber)=>fetchAccount(set,accountNumber),
        fetchAllAccounts:()=>fetchAllAccounts(set),
        CreateAccount:(balance,accountType,productType)=>CreateAccount(set,balance,accountType,productType)

}
  
))

export default useAccountStore;