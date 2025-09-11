import axiosInstance from "../../utils/httpClientUtil";


export const apiCallToTheProductsEndpoint=async()=>{
    return await axiosInstance.get(import.meta.env.VITE_API_BASE_URL + '/api/v1/product/fetch');
}