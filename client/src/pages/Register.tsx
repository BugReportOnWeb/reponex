import { useState, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import { RegisterFormData } from "../types/formData";

const SERVER_ORIGIN = import.meta.env.VITE_SERVER;

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState('');

    const { setAuthUser } = useContext(AuthUserContext) as AuthUserContextType;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Password doesn't match");
            return;
        }

        const formData: RegisterFormData = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        };

        try {
            const res = await fetch(`${SERVER_ORIGIN}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                setAuthUser(data.username);
            }

            if (!res.ok) {
                setError(data.error);
            }
        } catch (error) {
            console.error("Error during Registration:", error);
        }
    };
    return (
        <div className="absolute h-[calc(100vh-8.54rem)] w-full flex items-center justify-center">
            <div className='relative flex flex-col gap-5'>
                <h1 className='text-3xl font-semibold text-center'>Register Account</h1>
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
                        <input
                            type="password"
                            autoComplete="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className='rounded-md text-sm border border-[#27272a] h-10 py-2 px-3 bg-transparent placeholder:text-[#7f8ea3] placeholder:text-sm focus:outline-none focus:outline-offset-2 focus:outline-[#27272a]'
                            required
                        />
                    </div>
                    <button className='inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                        Register
                    </button>
                </form>
                <h1 className='text-sm text-[#7f8ea3] text-center'>Already have an account? <Link className='underline underline-offset-4 decoration-[#e1e7ef]/40 hover:decoration-[#e1e7ef]/80' to='/login'>Login</Link></h1>
                <div className='absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-fit text-red-400 text-sm text-center -mt-2'>{error}</div>
            </div>
        </div>
    );
};

export default Register;
