
import { getAccount ,getAllAccounts, postAccount} from './accountStore.api';



  export const fetchAccount= async (set:any,accountNumber:string ) => {
   
    try {
      set(()=>({loadingFetchAccount:true}))
      const result= await getAccount(accountNumber);
      set(()=>({ account:result,loadingFetchAccount: false,errorFetchAccount:false }));
    } catch (err: any) {
      set({ errorFetchAccount: true, loadingFetchAccount: false });
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
        accountError:true,accountLoading:false
      }))
    }
    
  }

  export const CreateAccount=async (set:any,balance:string,accountType:string ,productType:string) => {
    try {
      set(()=>({loadingCreateAccount:true}))
      const newAccount=await postAccount(balance,accountType,productType);
      console.log(newAccount)
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