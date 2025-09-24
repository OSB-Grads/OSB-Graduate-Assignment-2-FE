import { useState } from "react";
import { v4 as uuid } from 'uuid';
import './Alerts.css';
import { ToastTypes, type IToastProps } from "./interfaces";
import Toast from "./ToastComponent";
import useAuthStore from "../../store/AuthStore/authStore";

let notify: (instance: IToastProps) => void = () => { };

const Alerts = () => {
    const [alerts, setAlerts] = useState<IToastProps[]>([]);
    const {logout} = useAuthStore();

    const remove = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id))
    }

    notify = (instance: IToastProps) => {
        if(instance.type == ToastTypes.UNAUTHENTICATED) {
            logout();
        };
        if((alerts.filter(alert => alert.type === ToastTypes.UNAUTHENTICATED).length)) return
        const TTL = 5;
        instance.id = uuid();
        instance.handleClose = () => remove(instance.id!);
        instance.TTL = TTL;
        setAlerts(prev => ([...prev, instance]));
        setTimeout(() => remove(instance.id!), TTL * 1000 + 1);
    }

    return (
        <div className="toast-container">
            {alerts.map(alert => <Toast {...alert} key={alert.id} />)}
        </div>
    );
}

export default Alerts;
export { notify };

