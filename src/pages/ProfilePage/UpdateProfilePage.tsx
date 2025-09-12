import ButtonComponent from "../../components/Button/ButtonComponent";
import InputField from "../../components/inputField/inputField";
import Header from "../../components/Header/Header";
import DashboardAccount from "../../components/DashboardAccount/DashBoardAccount";
import React from "react";
import useUserStore from "../../store/userstore/userstore";

function UpdateUserProfile(){
    const[UpdatedFirstName,setUpdatedFirstName]=React.useState("");
    const[UpdatedLastName,setUpdatedLastName]=React.useState("");
    const[UpdatedPhone,setUpdatedPhone]=React.useState("");
    const[UpdateEmail,setUpdatedEmail]=React.useState("");
    const[UpdatedAddress,setUpdatedAddress]=React.useState("");
    const FullName=UpdatedFirstName+UpdatedLastName;
    const{updateUser}=useUserStore();

    const handleUpdateUser=async(e:React.FormEvent)=>{
        e.preventDefault();

        await updateUser(FullName,UpdatedPhone,UpdateEmail,UpdatedAddress);  
    }
}