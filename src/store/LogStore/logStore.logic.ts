import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import { fetchAllLogsForAdminApi } from "./logStore.api";



export const fetchAllLogsForAdmin=async(set:any)=>{
    try{
        const logDataFetchOperation=await fetchAllLogsForAdminApi();
        set(()=>({
            logData:logDataFetchOperation
        }));
        console.log("Logs",logDataFetchOperation);
    }
    catch(error){
          notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Error While Fetching Logs',
        });

    }

}
