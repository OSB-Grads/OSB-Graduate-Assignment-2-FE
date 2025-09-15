import { create } from "zustand";

import { createUser, getUser } from "./userstore.logic";
import type { UserState } from "./userstore.interface";

const useUserStore=create<UserState>()(
    (set)=>({
        user:undefined,
        createUser:(name,email,phone)=>createUser(set,name,email,phone),
        getUser:()=>getUser(set),

    })
)
export default useUserStore;
