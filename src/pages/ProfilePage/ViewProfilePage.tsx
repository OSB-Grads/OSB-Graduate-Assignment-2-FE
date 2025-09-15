import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import InputField from "../../components/inputField/inputField";
import useUserStore from "../../store/userstore/userstore";
import './ViewProfilePage.css';

const { user, getUser } = useUserStore();
const [FirstName, setFirstName] = React.useState("");
const [LastName, setLastName] = React.useState("");
const [Phone, setPhone] = React.useState("");
const [Email, setEmail] = React.useState("");
const [Address, setAddress] = React.useState("");
const [load, setload] = React.useState(true);
const navigate = useNavigate();
const handleClick = () => {
    navigate("/Edit");
}
useEffect(() => {
    const fetch = async () => {
        try {
            if (!user) {
                await getUser();
            }
        } catch (err) {
            console.error(err);
        }
        finally {
            setload(false);
        }
    };
    fetch();
}, []);
useEffect(() => {
    const fullname = user?.name || "";
    const parts = fullname.trim().split(" ");
    const firstname = parts[0] || "";
    const lastname = parts.length > 1 ? parts.slice(1).toString() : "";
    setFirstName(firstname);
    setLastName(lastname);
    setPhone(user?.phone ? user.phone.toString() : "");
    setEmail(user?.email ? user.email.toString() : "");
    setAddress(user?.address || "");
}, [user])
function ViewUserProfile() {
    return (
        <div className="update-body">
            <div className="update-container">
                <form onClick={handleClick} className="update-form">
                    <div className="form-header">
                        <h2 className="profile-heading">Profile</h2>
                        <div className="form-actions">
                            <ButtonComponent
                                label="Edit"
                                type="button"
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
                                value={load ? "Loading..." : FirstName}
                                onChange={(e) => { if (!load) setFirstName(e.target.value) }}
                                disabled
                                kind='SECONDARY'
                            />
                            <InputField
                                id="lastname"
                                label=""
                                type="text"
                                value={load ? "Loading..." : LastName}
                                onChange={(e) => { if (!load) setLastName(e.target.value) }}
                                disabled
                                kind='SECONDARY'
                            />
                        </div>
                        <div className="PhandEmail">
                            <InputField
                                id="Phone"
                                label=""
                                type="tel"
                                value={load ? "Loading..." : Phone}
                                onChange={(e) => { if (!load) setPhone(e.target.value) }}
                                disabled
                                kind='SECONDARY'
                            />
                            <InputField
                                id="Email"
                                label=""
                                type="email"
                                value={load ? "Loading..." : Email}
                                onChange={(e) => { if (!load) setEmail(e.target.value) }}
                                disabled
                                kind='SECONDARY'
                            />
                        </div>
                        <div className="Address">
                            <InputField
                                id="address"
                                label=""
                                type="textarea"
                                value={load ? "Loading..." : Address}
                                onChange={(e) => { if (!load) setAddress(e.target.value) }}
                                disabled
                                kind='SECONDARY'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ViewUserProfile;