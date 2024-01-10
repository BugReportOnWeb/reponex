import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="relative max-w-6xl mx-auto min-h-screen">
                <NavBar />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    </React.StrictMode>,
);
