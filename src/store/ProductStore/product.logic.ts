import { isEqual } from "date-fns";
import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import { apiCallToTheProductsEndpoint, createProductByAdminApi, deleteProductByAdminApi, updateProductByAdminApi } from "./product.api";
import type { IProduct } from "./product.interface";




export const fetchProductDetails=async(set:any)=>{
     try{
        
        set(()=>({loading:true}));
        const response = await apiCallToTheProductsEndpoint();
        set(()=>({products:response.data}));
         set(()=>({loading:false,error:false}))
       }
       catch(error){
        console.log("Error Has Occured",error);
        set(()=>({error:true,loading:false}));
       }

}


export const createProductByAdmin=async(set:any,product:IProduct)=>{
  try{
    const response=await createProductByAdminApi(product);

    if(response.productId===product.productId && response.productName===product.productName && response.description===product.description
      && response.coolingPeriod===product.coolingPeriod && response.fundingWindow===product.fundingWindow && response.tenure===product.tenure && response.interestRate===product.interestRate
    ){
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'Product Created Successfully',
        });
    }
    else{
       notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Creation Failed',
        });
    }
  }
  catch(error){
     notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Creation Failed',
        });

  }
}


export const updateProductByAdmin=async(set:any,productId:string,product:IProduct)=>{

  try{
    const response=await updateProductByAdminApi(productId,product);
     if(response.productId===product.productId && response.productName===product.productName && response.description===product.description
      && response.coolingPeriod===product.coolingPeriod && response.fundingWindow===product.fundingWindow && response.tenure===product.tenure && response.interestRate===product.interestRate
    ){
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'Product Updation Successfully',
        });
    }
    else{
       notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Updation Failed',
        });
    }


  }
  catch(error){
     notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Creation Failed',
        });

  }

}



export const deleteProductByAdmin=async(set:any,productId:string)=>{
  try{
    const response=await deleteProductByAdminApi(productId);
    if(response==="Product deleted Successfully"){
       notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'Product Deletion Successful',
        });

    }
    else{
      notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Deletion Failed',
        });

    }

  }
  catch(error){
     notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Product Deletion Failed',
        });
  }
}