
export interface ForgotPasswordStore {
  userEmail: string | null ;
  otpId: string | null ;
  loading: boolean;
  error: boolean;
  mailSuccess: boolean,
  otpSuccess:boolean,
  resetSuccess:boolean,

  verifyEmail: (userEmail: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
}
