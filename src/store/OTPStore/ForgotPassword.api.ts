import axiosInstance from "../../utils/httpClientUtil"

export const verifyEmailApi = async(userEmail : string) => {
    return await axiosInstance.post(`/api/v1/forgotPassword/${userEmail}`)
}

export const resendOtpApi = async(userEmail: string)=> {
    return await axiosInstance.put(`/api/v1/forgotPassword/resendOtp/${userEmail}`)
}

export const verifyOtpApi = async(otpId: string, otp: string) =>{
    return await axiosInstance.post(`/api/v1/forgotPassword/verify-otp`,{
    otpId, otp,});
}

export const resetPasswordApi = async (password : string, otpId : string) => {
    return await axiosInstance.put(`/api/v1/forgotPassword/resetPassword`, {
        password, otpId,});
}