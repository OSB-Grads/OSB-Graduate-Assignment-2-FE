import {create} from "zustand";
import { apiAxiosFetchRequest } from "../lib/apiClientAxios";


interface ProductDTO{
    productId:string,
    productName:string,
    interestRate:number,
    fundingWindow:number,
    coolingPeriod:number,
    Tenure:number,
    description:string

}

interface ProductStore{
    products:ProductDTO[],
    loading:boolean,
    error:boolean,
    fetchProductDetails:()=>Promise<void>
}
const useProductStore=create<ProductStore>((set)=>({
    products:[],
    loading:false,
     error:false,
     fetchProductDetails:async()=>{
        try{
            console.log("Products Details Information Retrieval Started");
        const response:ProductDTO[]=await apiAxiosFetchRequest(import.meta.env.BANK_API_TO_RETRIEVE_PRODUCT_DETAILS,{
            method:"GET"
        });
        console.log("Products Information Successful");
        
        set(()=>({products:response}));
       }
       catch(error){
        console.log("Error Has Occured",error);
         
       }
     }
}));

export default useProductStore;