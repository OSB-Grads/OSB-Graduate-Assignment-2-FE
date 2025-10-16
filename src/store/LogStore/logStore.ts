import { create } from "zustand";
import type { ILogStore } from "./logStore.interface";
import { fetchAllLogsForAdmin } from "./logStore.logic";



export const useLogStore=create<ILogStore>((set)=>({

    logData:[],
    fetchAllLogsForAdmin:()=>fetchAllLogsForAdmin(set)
})

)