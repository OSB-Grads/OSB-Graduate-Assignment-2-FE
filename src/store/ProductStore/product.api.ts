import axiosInstance from "../../utils/httpClientUtil";


export const apiCallToTheProductsEndpoint=async()=>{
    return await axiosInstance.get('/api/v1/product/fetch');
}