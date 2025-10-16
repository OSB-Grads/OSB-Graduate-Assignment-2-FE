import { create } from "zustand";
import type { ForgotPasswordStore } from "./ForgotPassword.interface";
import { resendOtpLogic, resetPasswordLogic, verifyEmailLogic, verifyOtpLogic } from "./ForgotPassword.logic";

const useForgotPasswordStore = create<ForgotPasswordStore>((set, get) => ({
  userEmail: null,
  otpId: null,
  loading: false,
  error: false,
  mailSuccess: false,
  otpSuccess:false,
  resetSuccess:false,

  verifyEmail: async (userEmail: string) =>{
    await verifyEmailLogic(set,userEmail)
  },

  resendOtp: async () => {
    await resendOtpLogic(set, get)
},
  verifyOtp: async (otp: string) => {
    await verifyOtpLogic(set, get, otp);
    
  },

  resetPassword: async (password: string) =>
    await resetPasswordLogic(set, get, password),
}));

export default useForgotPasswordStore;
