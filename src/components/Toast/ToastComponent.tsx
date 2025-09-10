import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { ToastTypes, type IToastProps } from "./interfaces";
const ToastColors = {
    SUCCESS: '--color-primary',
    ERROR: '--color-primary',
    WARNING: '--color-primary',
    INFO: '--color-primary',
}

const Toast = ({ type, message, handleClose }: IToastProps) => {
    return (
        <div
            className="toast"
            style={{ color: `var(${ToastColors[type]})` }}
        >
            <Icon type={type} />
            <p>{message}</p>
            <div className="toast-close" onClick={handleClose}>&#10006;</div>
        </div>
    );

}

const Icon = ({ type }: { type: keyof typeof ToastTypes }) => {
    if (type === ToastTypes.SUCCESS) return <CheckCircleIcon />;
    if (type === ToastTypes.ERROR) return <ErrorIcon />;
    if (type === ToastTypes.INFO) return <InfoIcon />;
    if (type === ToastTypes.WARNING) return <WarningIcon />;
}

export default Toast;