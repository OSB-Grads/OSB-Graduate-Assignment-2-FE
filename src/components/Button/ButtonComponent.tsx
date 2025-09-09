import React from "react";
import styles from'./ButtonComponent.module.css';
// interface for ButtonProps
interface ButtonProps{
    label:string;
    onClick?:()=>void;
    type?:"button" | "submit" | "reset";
    variant?:"primary" | "secondary" ;
    disabled?:boolean;
}
const ButtonComponent:React.FC<ButtonProps>=({
    label,
    onClick,
    type="button",
    variant="primary",
    disabled=false,
})=>{
    const className=`${styles.button}
                    ${styles[variant]}
                    ${disabled ? styles.disabled : ''}`;
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {label}
        </button>
            );
        };
export default ButtonComponent;
