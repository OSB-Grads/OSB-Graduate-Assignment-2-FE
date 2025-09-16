import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
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


    } catch (error) {
        console.log("error occurred", error);

    }
}
export const updateUser = async (set: any, name: string, email: string, phone: string, address: string): Promise<void> => {
    try {
        await updateUserApi(name, email, phone, address);
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'profile Updated Successfully',
        });
    } catch (error) {
        notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Error!!! ',
        });

    }
}