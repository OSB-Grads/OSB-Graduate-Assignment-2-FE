import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import { useLayoutEffect, useRef } from 'react';
import { ToastTypes, type IToastProps } from "./interfaces";
import styles from './ToastComponents.module.css';

const ToastColors = {
    SUCCESS: '--color-primary',
    ERROR: '--color-primary',
    UNAUTHENTICATED: '--color-primary',
    WARNING: '--color-primary',
    INFO: '--color-primary',
}

const Toast = ({ type, message, handleClose, TTL = 5 }: IToastProps) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        ref.current?.style.setProperty('--TTL', `${TTL}s`);
    }, [])

    return (
        <div
            ref={ref}
            className={styles.toast}
            style={{ color: `var(${ToastColors[type]})` }}
        >
            <Icon type={type} />
            <p>{message}</p>
            <div className={styles.close} onClick={handleClose}>&#10006;</div>
        </div>
    );

}

const Icon = ({ type }: { type: keyof typeof ToastTypes }) => {
    if (type === ToastTypes.SUCCESS) return <CheckCircleIcon />;
    if (type === ToastTypes.ERROR) return <ErrorIcon />;
    if (type === ToastTypes.UNAUTHENTICATED) return <ErrorIcon />;
    if (type === ToastTypes.INFO) return <InfoIcon />;
    if (type === ToastTypes.WARNING) return <WarningIcon />;
}

export default Toast;