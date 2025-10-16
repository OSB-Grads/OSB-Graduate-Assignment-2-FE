

export interface ILogData{
    id:string,
    action:string,
    details:string,
    ip_address:string,
    status:string,
    timestamp:string,
    user_id:string
}


export interface ILogStore{
    logData:ILogData[],
    fetchAllLogsForAdmin:()=>Promise<void>;
}