export interface UserData {
 name: String;
  email: String;
  phone: String;
}

export interface UserState{
    createUser:(name:string,email:string,phone:string)=>Promise<number|null>;
    getUser:()=>Promise<void>;
    user?:UserData;

};