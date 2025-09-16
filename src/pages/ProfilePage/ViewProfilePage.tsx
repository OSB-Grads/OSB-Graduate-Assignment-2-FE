import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import InputField from "../../components/inputField/inputField";
import useUserStore from "../../store/userstore/userstore";
import './ViewProfilePage.css';

function ViewUserProfile() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [FirstName, setFirstName] = useState("loading...");
    const [LastName, setLastName] = useState("loading...");
    const [Phone, setPhone] = useState("loading...");
    const [Email, setEmail] = useState("loading...");
    const [Address, setAddress] = useState("loading...");
    const [load, setload] = useState(true);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (editMode) handleUpdateUser();
        setEditMode(prev => !prev);
    }
    const { user, getUser, updateUser } = useUserStore();
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

    const handleUpdateUser = async () => {
        await updateUser(`${FirstName} ${LastName}`, Email, Phone, Address);
    };
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
    return (
        <div className="profile-body">
            <div className="profile-container">
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="profile-form-header">
                        <h2 className="profile-heading">Profile</h2>
                        <div className="profile-form-actions">
                            {
                                editMode
                                    ? <ButtonComponent
                                        label="Save"
                                        type="submit"
                                    />
                                    : <ButtonComponent
                                        label="Edit"
                                        type="submit"
                                    />
                            }
                        </div>
                    </div>
                    <div className="profile-form-fields">
                        <div className="profile-Names">
                            <InputField
                                id="firstname"
                                label=""
                                type="text"
                                value={load ? "Loading..." : FirstName}
                                placeholder="Firstname"
                                onChange={(e) => { setFirstName(e.target.value) }}
                                disabled={!editMode}
                            // kind='SECONDARY'
                            />
                            <InputField
                                id="lastname"
                                label=""
                                type="text"
                                value={load ? "Loading..." : LastName}
                                placeholder="Lastname"
                                onChange={(e) => { setLastName(e.target.value) }}
                                disabled={!editMode}
                            // kind='SECONDARY'
                            />
                        </div>
                        <div className="profile-PhandEmail">
                            <InputField
                                id="Email"
                                label=""
                                type="email"
                                value={load ? "Loading..." : Email}
                                placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                disabled={!editMode}
                            // kind='SECONDARY'
                            />
                            <InputField
                                id="Phone"
                                label=""
                                type="tel"
                                value={load ? "Loading..." : Phone}
                                placeholder="phone"
                                onChange={(e) => { setPhone(e.target.value) }}
                                disabled={!editMode}
                            // kind='SECONDARY'
                            />

                        </div>
                        <div className="profile-Address">
                            <InputField
                                id="address"
                                label=""
                                type="textarea"
                                value={load ? "Loading..." : Address}
                                placeholder="Address"
                                onChange={(e) => { setAddress(e.target.value) }}
                                disabled={!editMode}
                            // kind='SECONDARY'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ViewUserProfile;