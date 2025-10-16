import axiosInstance from "../../utils/httpClientUtil";
import type { IProduct } from "./product.interface";


export const apiCallToTheProductsEndpoint=async()=>{
    return await axiosInstance.get('/api/v1/product/fetch');
}

export const createProductByAdminApi=async(product:IProduct):Promise<IProduct>=>{
    const response=await axiosInstance.post('/api/v1/product/create',product);
    return response.data;
}

export const updateProductByAdminApi=async(productId:string,product:IProduct)=>{
    const response=await axiosInstance.put(`/api/v1/product/update/${productId}`, product);
    return response.data;
}


export const deleteProductByAdminApi=async(productId:string)=>{
    const response=await axiosInstance.delete(`/api/v1/product/delete/${productId}`);
    return response.data;
}