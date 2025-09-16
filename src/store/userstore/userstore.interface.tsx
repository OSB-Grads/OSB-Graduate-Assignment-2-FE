export interface UserData {
  name: String;
  email: String;
  phone: String;
  address: string;
}

export interface IUserState {
  createUser: (name: string, email: string, phone: string) => Promise<number | null>;
  getUser: () => Promise<void>;
  user?: UserData;
  updateUser: (name: string, email: string, phone: string, address: string) => Promise<void>;

};