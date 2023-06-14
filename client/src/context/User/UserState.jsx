import { useState } from "react";
import UserContext from "./UserContext";

function UserState(props) {
    const [user, setUser] = useState({
        name: {
            first: "",
            last: ""
        },
        email: ""
    });

    //Getting User details
    const getUserDetails = async () => {
        const response = await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        let json = await response.json();
        if(json.success) {
            setUser({
                name: json.user.name,
                email: json.user.email
            });
        }
    }

    return (
        <UserContext.Provider value={{user, setUser, getUserDetails}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;