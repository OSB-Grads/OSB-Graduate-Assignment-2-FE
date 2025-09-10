import {create} from "zustand";
import axiosInstance from "../utils/httpClientUtil";
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
    products:[{productId:"default",
        productName:"SAVINGS ACCOUNT",
        interestRate:123,
        fundingWindow:1,
        coolingPeriod:2,
        Tenure:3,
        description:"Default dummy data"
    }],
    loading:false,
     error:false,
     fetchProductDetails:async()=>{
        try{
            console.log("Products Details Information Retrieval Started");
            set(()=>({loading:true}));
        const response = await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + '/api/v1/product/fetch');
        console.log("Products Information Successful");
        set(()=>({products:response.data}));
         set(()=>({loading:false}))
       }
       catch(error){
        console.log("Error Has Occured",error);
        set(()=>({error:true}));
         
       }
     }
}));

export default useProductStore;