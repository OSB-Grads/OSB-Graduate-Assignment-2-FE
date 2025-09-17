export interface UserData {
  name: String;
  email: String;
  phone: String;
  address: string;
}

export interface UserState{
    createUser:(name:string,email:string,phone:string, address : string)=>Promise<number|null>;
    getUser:()=>Promise<void>;
    user?:UserData;

};