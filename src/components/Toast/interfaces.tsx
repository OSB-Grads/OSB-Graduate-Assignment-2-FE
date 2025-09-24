export const ToastTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
    UNAUTHENTICATED: 'UNAUTHENTICATED'
}

export interface IToastProps {
    id?: string;
    type: keyof typeof ToastTypes;
    message: string;
    TTL?: number;
    handleClose?: () => void;
};