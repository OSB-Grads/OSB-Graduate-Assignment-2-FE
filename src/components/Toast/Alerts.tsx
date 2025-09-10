import { useState } from "react";
import { v4 as uuid } from 'uuid';
import type { IToastProps } from "./interfaces";
import Toast from "./ToastComponent";

let notify: (instance: IToastProps) => void;

const Alerts = () => {
    const [alerts, setAlerts] = useState<IToastProps[]>([]);

    const remove = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id))
    }

    notify = (instance: IToastProps) => {
        instance.id = uuid();
        instance.handleClose = () => remove(instance.id!);
        setAlerts(prev => ([...prev, instance]));
        setTimeout(() => remove(instance.id!), 5000);
    }

    return (
        <div className="toast-container">
            {alerts.map(alert => <Toast {...alert} key={alert.id} />)}
        </div>
    );
}

export default Alerts;
export { notify };

