
export interface IProduct{
    productId:string,
    productName:string,
    interestRate:number,
    fundingWindow:number,
    coolingPeriod:number,
    tenure:number,
    description:string

}

export interface IProductStore{
    products:IProduct[],
    loading:boolean,
    error:boolean,
    fetchProductDetails:()=>Promise<void>
    createProductByAdmin:(product :IProduct)=>Promise<void>
    updateProductByAdmin:(productId:string,product:IProduct)=>Promise<void>
    deleteProductByAdmin:(productId:string)=>Promise<void>
}