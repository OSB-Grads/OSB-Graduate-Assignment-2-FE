import React from 'react'
import InputField from '../../components/inputField/inputField';
import { notify } from '../../components/Toast/Alerts';
import { ToastTypes } from '../../components/Toast/interfaces';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import useForgotPasswordStore from '../../store/OTPStore/ForgotPasswordStore';
import "./SetPassword.css";

function SetPassword() {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const { resetPassword } = useForgotPasswordStore();

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {

        if (!password || !confirmPassword) {
            notify({
                type: ToastTypes.WARNING as keyof typeof ToastTypes,
                message: "Please fill all Fields to Set Password ",
            });
            return;
        }
        if (password !== confirmPassword) {
            notify({
                type: ToastTypes.WARNING as keyof typeof ToastTypes,
                message: "Passwords do not Match ",
            });
            return ;
        }
        
            await resetPassword(password);
            notify({
                type: ToastTypes.SUCCESS as keyof typeof ToastTypes,
                message: "Password reset successfull"
            })
            navigate("/login");
        }

        catch (error) {
            notify({
                type: ToastTypes.ERROR as keyof typeof ToastTypes,
                message: "Something went wrong, Please try again.",
            });
        }
    }


    return (
        <div className="mainContainer">
            <div className="resetPasswordCard">
            <h2 className="resetHeading">Reset your Password </h2>
            <InputField
                id="password-input"
                label="New Password"
                type="password"
                placeholder="Enter new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const confirmPassword = document.getElementById("confirm-password");
                        confirmPassword?.focus();
                    }
                }}
            />

            <InputField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
            />

            <div className="setPasswordButton">
                <ButtonComponent
                    label="Set Password"
                    type="submit"
                    variant="primary"
                    onClick={handleSubmit}
                />
            </div>

            <div className="backToLogin">
                <strong>
                    <Link to="/login">Back to Login </Link>
                </strong>
            </div>
            </div>
        </div>
    )
}

export default SetPassword;
