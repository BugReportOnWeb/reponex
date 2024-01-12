import { useState, SyntheticEvent, useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import { Link } from "react-router-dom";

const server = import.meta.env.VITE_SERVER;

interface FormData {
    username: string;
    password: string;
}

const Login = () => {
    const { setAuthUser } = useContext(AuthUserContext) as AuthUserContextType;

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const formData: FormData = { username, password };

        try {
            const res = await fetch(`${server}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            // Check if the request was successful
            if (res.ok) {
                localStorage.setItem("token", data.token);
                setAuthUser(data.username);
            }

            if (!res.ok) {
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="absolute h-[calc(100vh-8.54rem)] w-full flex items-center justify-center">
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-semibold text-center'>Login Account</h1>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
                    <div className='flex flex-col gap-4 w-full'>
                        <input
                            type="username"
                            autoComplete="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                            className='rounded-md text-sm border border-[#27272a] h-10 py-2 px-3 bg-transparent placeholder:text-[#7f8ea3] placeholder:text-sm focus:outline-none focus:outline-offset-2 focus:outline-[#27272a]'
                            required
                        />
                        <input
                            type="password"
                            autoComplete="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='rounded-md text-sm border border-[#27272a] h-10 py-2 px-3 bg-transparent placeholder:text-[#7f8ea3] placeholder:text-sm focus:outline-none focus:outline-offset-2 focus:outline-[#27272a]'
                            required
                        />
                    </div>
                    <button className='inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                        Login
                    </button>
                </form>
                <h1 className='text-sm text-[#7f8ea3] text-center'>Don't have an account? <Link className='underline underline-offset-4 decoration-[#e1e7ef]/40 hover:decoration-[#e1e7ef]/80' to='/register'>Register Now</Link></h1>
                <div className='text-red-400 text-sm text-center -mt-2'>{error}</div>
            </div>
        </div>
    );
};

export default Login;
