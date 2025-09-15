import React, { useEffect } from "react";
import ButtonComponent from "../../components/Button/ButtonComponent";
import InputField from "../../components/inputField/inputField";
import useUserStore from "../../store/userstore/userstore";
import './UpdateProfilePage.css';

function UpdateUserProfile() {
    const [UpdatedFirstName, setUpdatedFirstName] = React.useState("");
    const [UpdatedLastName, setUpdatedLastName] = React.useState("");
    const [UpdatedPhone, setUpdatedPhone] = React.useState("");
    const [UpdateEmail, setUpdatedEmail] = React.useState("");
    const [UpdatedAddress, setUpdatedAddress] = React.useState("");
    const FullName = UpdatedFirstName + " " + UpdatedLastName;
    const { updateUser, user } = useUserStore();

    useEffect(() => {
        const fullname = user?.name || "";
        const parts = fullname.trim().split(" ");
        const firstname = parts[0] || "";
        const lastname = parts.length > 1 ? parts.slice(1).toString() : "";
        setUpdatedFirstName(firstname);
        setUpdatedLastName(lastname);
        setUpdatedPhone(user?.phone ? user.phone.toString() : "");
        setUpdatedEmail(user?.email ? user.email.toString() : "");
        setUpdatedAddress(user?.address || "");
    }, [user])
    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        await updateUser(FullName, UpdatedPhone, UpdateEmail, UpdatedAddress);
    };
    return (
        <div className="update-body">
            <div className="update-container">
                <form onSubmit={handleUpdateUser} className="update-form">
                    <div className="form-header">
                        <h2 className="profile-heading">Profile</h2>
                        <div className="form-actions">
                            <ButtonComponent
                                label="Save"
                                type="submit"
                                variant="primary"
                            />
                        </div>
                    </div>
                    <div className="form-fields">
                        <div className="Names">
                            <InputField
                                id="firstname"
                                label=""
                                type="text"
                                placeholder="Firstname"
                                value={UpdatedFirstName}
                                onChange={(e) => setUpdatedFirstName(e.target.value)}
                            />
                            <InputField
                                id="lastname"
                                label=""
                                type="text"
                                placeholder="Lastname"
                                value={UpdatedLastName}
                                onChange={(e) => setUpdatedLastName(e.target.value)}
                            />
                        </div>
                        <div className="PhandEmail">
                            <InputField
                                id="Phone"
                                label=""
                                type="tel"
                                placeholder="phone"
                                value={UpdatedPhone}
                                onChange={(e) => setUpdatedPhone(e.target.value)}
                            />
                            <InputField
                                id="Email"
                                label=""
                                type="email"
                                placeholder="Email"
                                value={UpdateEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </div>
                        <div className="Address">
                            <InputField
                                id="address"
                                label=""
                                type="textarea"
                                placeholder="Address"
                                value={UpdatedAddress}
                                onChange={(e) => setUpdatedAddress(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default UpdateUserProfile;