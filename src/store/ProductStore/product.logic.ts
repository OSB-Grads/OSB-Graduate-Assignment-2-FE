import { apiCallToTheProductsEndpoint } from "./product.api";


export const fetchProductDetails=async(set:any)=>{
     try{
        console.log("Products Details Information Retrieval Started");
        set(()=>({loading:true}));
        const response = await apiCallToTheProductsEndpoint();
        console.log("Products Information Successful");
        set(()=>({products:response.data}));
         set(()=>({loading:false,error:false}))
       }
       catch(error){
        console.log("Error Has Occured",error);
        set(()=>({error:true,loading:false}));
       }

}