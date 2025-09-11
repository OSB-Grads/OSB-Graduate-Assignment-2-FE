import UserStore from "./userstore"
import type { UserState } from "./userstore.interface"


export const getUserStore=()=>{
    return UserStore((state:UserState)=>state);
}

