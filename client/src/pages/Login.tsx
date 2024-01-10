import { useState, SyntheticEvent } from "react";

const server = import.meta.env.VITE_SERVER;

interface FormData {
    username: string;
    password: string;
}

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const formData: FormData = {
        username: username,
        password: password,
      };

      const response = await fetch(`${server}/api/users/login`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the request was successful
      if (response.ok) {
        const result = await response.json();

        localStorage.setItem("token", result.token);

        // redirecting to Home page after Login
        window.location.replace("/");
      } else {
        // Handle Login failure
        console.error("Login failed");
      }

      console.log(response.json());
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };
  return (
    <main className="min-h-[73vh] flex items-center justify-center">
      <div className="w-80 rounded-2xl bg-slate-900">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
          <input
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="UserName"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
