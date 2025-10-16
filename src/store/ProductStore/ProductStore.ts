import {create} from "zustand";
import axiosInstance from "../../utils/httpClientUtil";
import type { IProduct, IProductStore } from "./product.interface";
import { createProductByAdmin, deleteProductByAdmin, fetchProductDetails, updateProductByAdmin } from "./product.logic";

const useProductStore=create<IProductStore>((set)=>({
    products:[],
    loading:false,
     error:false,
     fetchProductDetails:async()=> await fetchProductDetails(set),
     createProductByAdmin:async(product:IProduct)=>await createProductByAdmin(set,product),
     updateProductByAdmin:async(productId:string,product:IProduct)=>await updateProductByAdmin(set,productId,product),
     deleteProductByAdmin:async(productId:string)=>await deleteProductByAdmin(set,productId)
}));

export default useProductStore;