import { createUserApi, getUserApi, updateUserApi } from "./usestore.api";

export const createUser = async (set: any, name: string, email: string, phone: string) => {
    try {
        const status = await createUserApi(name, email, phone);
        return status;
    } catch (error) {
        console.log("error occurred", error);
        return null;
    }

}

export const getUser = async (set: any) => {
    try {
        const userData = await getUserApi();
        set({ user: userData });
        // const dummyUser = {
        //     name: "John Doe",
        //     email: "john@example.com",
        //     phone: "1234567890",
        //     address: "123 Main St",
        // };
        // set({ user: dummyUser });

    } catch (error) {
        console.log("error occurred", error);

    }
}
export const updateUser = async (set: any, name: string, email: string, phone: string, address: string): Promise<void> => {
    try {
        await updateUserApi(name, email, phone, address);
    } catch (error) {
        console.log("error occured", error);

    }
}