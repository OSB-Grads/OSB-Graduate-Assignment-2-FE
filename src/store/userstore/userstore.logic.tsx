import { createUserApi, getUserApi } from "./usestore.api"

export const createUser=async(set:any,name:string,email:string,phone:string)=>{
    try {
       const status=await createUserApi(name,email,phone);
       return status;
    } catch (error) {
        console.log("error occurred", error);
        return null;
    }

}

export const getUser=async(set:any)=>{
    try {
       const userData= await getUserApi();
       set({user:userData});
      
    } catch (error) {
        console.log("error occurred", error);
       
    }
}