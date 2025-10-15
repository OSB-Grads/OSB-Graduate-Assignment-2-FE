import { useNavigate } from "react-router-dom";
import { notify } from "../../components/Toast/Alerts";
import { ToastTypes } from "../../components/Toast/interfaces";
import { resendOtpApi, resetPasswordApi, verifyEmailApi, verifyOtpApi } from "./ForgotPassword.api";

export const verifyEmailLogic = async (set: any, userEmail: string) => {
    try {
        set({ loading: true, error: false });
        const res = await verifyEmailApi(userEmail);
        const otpId = res.data.otpId;

        set({
            userEmail,
            otpId,
            loading: false,
            error: false,
            mailSuccess: true,
        });
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'OTP sent. Please check your email.',
        });

    }

    catch (error: any) {

        set({
            loading: false,
            error: true,
            mailSuccess: false,
        });
        notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'User doesnt exist. Try Again',
        });
    }

};

export const resendOtpLogic = async (set: any, get: any) => {
    try {
        set({ loading: true, error: false })
        const email = get.userEmail;
        if (!email) {
            
            throw new Error("Email not set in Store.");
        }

        const res = await resendOtpApi(email);
        const otpId = res.data.otpId;
        set({ otpId, loading: false });
    }

    catch (error: any) {
        
        set({
            loading: false,
            error: true,
            mailSuccess: false,
        });
        notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'OTP Sending Failed.',
        });
    }

}

export const verifyOtpLogic = async (set: any, get: any, otp: string) => {

    try {
        set({ loading: true, error: false })
        const otpId = get().otpId
        if (!otpId) {
        
            throw new Error("Missing OTP ID")
        }
        const res = await verifyOtpApi(otpId, otp);

        if (res.data === true) {
            set({ otp, loading: false, otpSuccess: true })
            notify({
                type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
                message: 'OTP Verified Successfully',
            });
        }
        else {
            set({ otp, loading: false, otpSuccess: false, error: true });
            
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: 'Invalid or OTP Expired',
            });
        }
    }
    catch (err: any) {
        
        set({ loading: false, error: true });
        notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'OTP Verification Failed',
        });
    }
};

export const resetPasswordLogic = async (set: any, get: any, password: string) => {
    try {

        const otpId = get().otpId;
        if (!otpId) {
            throw new Error("Missing OTP ID")
        }
        set({ loading: true, error: false });
        const res = await resetPasswordApi(password, otpId);

        if (res.data === true) {
            set({ loading: false, resetSuccess: true })
        }
        else {
            set({ loading: false, resetSuccess: false, error: true })
            
            notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Password Reset Failed',
        });
        }

    }
    catch (err: any) {
        set({ loading: false, error: false });
        notify({
            type: ToastTypes.ERROR as keyof typeof ToastTypes,
            message: 'Reset Operation failed',
        });
    }


}

