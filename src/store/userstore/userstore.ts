import { create } from "zustand";

import type { IUserState } from "./userstore.interface";
import { createUser, getUser, updateUser } from "./userstore.logic";

const useUserStore = create<IUserState>()(
    (set) => ({
        user: undefined,
        createUser: (name, email, phone) => createUser(set, name, email, phone),
        getUser: () => getUser(set),
        updateUser: (name, email, phone, address) => updateUser(set, name, email, phone, address)
    })
)
export default useUserStore;
