import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthUserContext } from "./context/AuthUserContext";
import { AuthUserContextType } from "./types/user";

const App = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    return (
        <Routes>
            <Route path="/" element={authUser ? <Dashboard /> : <Login />} />
            <Route path="/register" element={authUser ? <Dashboard /> : <Register />} />
            <Route path="/login" element={authUser ? <Dashboard /> : <Login />} />
        </Routes>
    )
}

export default App;
