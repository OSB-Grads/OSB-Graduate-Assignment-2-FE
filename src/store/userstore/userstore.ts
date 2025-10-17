import { create } from "zustand";

import type { IUserState } from "./userstore.interface";
import { createUser, fetchAllUsersForAdmin, getUser, updateUser } from "./userstore.logic";

const useUserStore = create<IUserState>()(
    (set) => ({
        user: undefined,
        userDataForAdmin:[],
        createUser: (name, email, phone) => createUser(set, name, email, phone),
        getUser: () => getUser(set),
        updateUser: (name: string, email: string, phone: string, address: string) => updateUser(set, name, email, phone, address),
        fetchAllUsersForAdmin:()=>fetchAllUsersForAdmin(set)
    })
)

export default useUserStore;
