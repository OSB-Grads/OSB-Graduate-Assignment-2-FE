
import { getAccount ,getAllAccounts, postAccount} from './accountStore.api';



  export const fetchAccount= async (set:any,accountNumber:string ) => {
   
    try {
      const result= await getAccount(accountNumber);
      set(()=>({ account:result,loadingFetchAccount: false }));
    } catch (err: any) {
      set({ errorFetchAccount: err.message || "Failed to fetch account", loadingFetchAccount: false });
    }
  }


  export const fetchAllAccounts=async (set:any) => {
    try {
      set(()=>({accountLoading:true}))
      const result=await getAllAccounts();
      set(()=>({
        accounts:result,accountLoading:false
      }))
    } catch (error) {
      set(()=>({
        accountError:"error in fetchAllAccounts",accountLoading:false
      }))
    }
    
  }

  export const CreateAccount=async (set:any,balance:string,accountType:string ,productType:string) => {
    try {
      set(()=>({loadingCreateAccount:true}))
      const newAccount=await postAccount(balance,accountType,productType);
      set((state:any) => ({
      accounts: [...state.accounts, newAccount],
      loadingCreateAccount: false,
      }));
      
    } catch (error) {
      set(()=>({
        errorCreateAccount:"error in creating the accounts",loadingCreateAccount:false
      }))
      
    }
    
  }