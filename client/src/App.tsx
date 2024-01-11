// Core
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

// Extras
import { AuthUserContext } from "./context/AuthUserContext";
import { AuthUserContextType } from "./types/user";

const App = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/chat' element={<Chat />} />
            {/* Uncomment below and comment above when dashboard UI is completed (no auth required for testing) */}
            {/* <Route path="/" element={authUser ? <Dashboard /> : <Navigate to='/login' />} /> */}
            <Route path="/register" element={!authUser ? <Register /> : <Navigate to='/' />} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to='/' />} />
        </Routes>
    )
}

export default App;
