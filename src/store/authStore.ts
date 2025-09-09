import {create} from "zustand";
import {persist} from "zustand/middleware";
//AuthState
type AuthState={
    token:string |null;       //JWT Token returned from backend
    isAuthenticated:boolean;
    login:(token:string)=>void; 
    logout:()=>void;
};
//AuthStore
export const useAuthStore=create<AuthState>()(
    persist(
        (set)=>({
            token:null,
            isAuthenticated:false,
            //Login
            login:(token)=>
                set({
                    token,
                    isAuthenticated:true,
                }),
            //Logout
            logout:()=>
                 set({
                    token:null,
                    isAuthenticated:false,
                }),
        }),
        {name:"auth-storage"}
    )
);