
import { notify } from '../../components/Toast/Alerts';
import { ToastTypes } from '../../components/Toast/interfaces';
import { getAccount ,getAllAccounts, getAllAccountsByAdminApi, postAccount} from './accountStore.api';



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
        accounts:result,accountLoading:false,accountError:false
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



  export const fetchAllAccountsByAdmin=async (set:any)=>{

    try{
      set(()=>({loadingAdminFetch:true}))
      const accountsForAdmin=await getAllAccountsByAdminApi();
      set(()=>({
        loadingAdminFetch:false,
        allAccountsForAdmin:accountsForAdmin
      }))
    }
    catch(error){

      set(()=>({
        loadingAdminFetch:false,
        errorAdminFetch:true
      }))

       notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Error While Fetching Accounts Operation',
        });

    }


  }