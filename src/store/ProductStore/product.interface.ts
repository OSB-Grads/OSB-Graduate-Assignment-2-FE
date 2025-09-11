
export interface IProduct{
    productId:string,
    productName:string,
    interestRate:number,
    fundingWindow:number,
    coolingPeriod:number,
    Tenure:number,
    description:string

}

export interface IProductStore{
    products:IProduct[],
    loading:boolean,
    error:boolean,
    fetchProductDetails:()=>Promise<void>
}