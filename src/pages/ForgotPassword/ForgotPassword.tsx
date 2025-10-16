import React, { useEffect, useState } from 'react'
import InputField from '../../components/inputField/inputField';
import ButtonComponent from '../../components/Button/ButtonComponent';
import OTPInput from '../../components/OTPInput/OTPInput';
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../../components/Toast/Alerts';
import { ToastTypes } from '../../components/Toast/interfaces';
import useForgotPasswordStore from '../../store/OTPStore/ForgotPasswordStore';
import './ForgotPassword.css'

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);

  
    // console.log(useForgotPasswordStore);
 const {verifyEmail ,verifyOtp,otpSuccess}=useForgotPasswordStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    
    if (otpSuccess) {
      
      navigate('/SetPassword');
    }
  }, [otpSuccess])

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleSendOTP = async () => {
    if (!email) {
      notify({
        type: ToastTypes.WARNING as keyof typeof ToastTypes,
        message: 'Please enter email address.',
      });
      return;
    }
    if (!validateEmail(email)) {
      notify({
        type: ToastTypes.WARNING as keyof typeof ToastTypes,
        message: 'Please enter valid email address.',
      });
      return;
    }

    setLoadingForgotPassword(true);
    try {
      await verifyEmail(email);
      setIsOTPSent(true);
      setTimer(30);
    } catch (error: any) {
      notify({
            type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
            message: 'Error in Verify Email',
        });
    } finally {
      setLoadingForgotPassword(false);
    }
  };


  const handleResendOTP = async () => {
    if (!email) {
      notify({
        type: ToastTypes.WARNING as keyof typeof ToastTypes,
        message: 'Please enter email address first.',
      });
      return;
    }
    if (timer > 0) {
      notify({
        type: ToastTypes.WARNING as keyof typeof ToastTypes,
        message: `Please wait ${timer}s before resending.`,
      });
      return;
    }

    setLoadingForgotPassword(true);
    try {
      await verifyEmail(email);
      notify({
        type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
        message: 'OTP resent. Check your email.',
      });
      setTimer(30);
      setIsOTPSent(true);
    } catch (err: any) {
      notify({
        type: ToastTypes.ERROR as keyof typeof ToastTypes,
        message: 'Failed to resend OTP. Try again.',
      });
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  const onOtpSubmit = (value: string) => {
    setOtp(value);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      notify({
        type: ToastTypes.WARNING as keyof typeof ToastTypes,
        message: 'Enter a 6-digit OTP.',
      });
      return;
    }

    if (!email) {
      notify({
        type: ToastTypes.ERROR as keyof typeof ToastTypes,
        message: 'Missing email — please enter email.',
      });
      return;
    }

    setLoadingForgotPassword(true);
    try {
     await verifyOtp(otp);
     
    } catch (err: any) {
      notify({
        type: ToastTypes.ERROR as keyof typeof ToastTypes,
        message: err?.message || 'Invalid or expired OTP. Please try again.',
      });
    } finally {
      setLoadingForgotPassword(false);
    }
  };

  return (
    <div className="forgotPasswordPage">
      <div className="forgotPasswordCard">
        <h2 className="PasswordHeading"> Forgot Password ?</h2>

        <div className="EmailInput">
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* {!isOTPSent ? ( */}
        <div className="OTPButtons">
          <div className="sendOTPButton">
            <ButtonComponent
              label='  Send  OTP '
              type="button"
              variant="primary"
              onClick={handleSendOTP}
              disabled={loadingForgotPassword}
            />
          </div>

          <div className="resendOTPButton">
            <ButtonComponent
              label={timer > 0 ? `Resend OTP [${timer}s]` : 'Resend OTP'}
              type="button"
              variant="primary"
              disabled={!isOTPSent || timer > 0 || loadingForgotPassword}
              onClick={handleResendOTP}
            />
          </div>
        </div>

        <p className="OTPmessage">Please check your email for OTP.</p>

        <div className="EnterOTP">
          <h3 className="enterOTPMessage">Enter OTP</h3>
          <OTPInput length={6} onOtpSubmit={onOtpSubmit} />
        </div>


        <div className='continueButton'>
          <ButtonComponent
            label='  Continue '
            type="button"
            variant="primary"
            onClick={handleVerifyOTP}
            disabled={loadingForgotPassword}
          />
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;
