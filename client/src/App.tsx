// Core
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Rules from "./pages/Rules";
import Actions from "./pages/Actions";

// Context
import { AuthUserContext } from "./context/AuthUserContext";
import { AuthUserContextType } from "./types/auth";

const App = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    return (
        <Routes>
            <Route path="/" element={authUser ? <Dashboard /> : <Navigate to='/login' />} />
            <Route path="/chat" element={authUser ? <Chat /> : <Navigate to='/login' />} />
            <Route path="/actions" element={authUser ? <Actions /> : <Navigate to='/login' />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/' />} />
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to='/' />} />
            <Route path="/rules" element={<Rules />} />
        </Routes>
    )
}

export default App;
