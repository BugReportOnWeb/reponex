import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";

const Dashboard = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    const sendRequest = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/users");
            const data = await res.json();
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    };

    return (

        // TODO: Same side padding for all (DRY in App)
        <div className='p-5'>
            <h1>Hello {authUser}!</h1>
            <button onClick={sendRequest}>Send Request</button>
        </div>
    );
}

export default Dashboard;
