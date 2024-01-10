import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <main className="relative max-w-6xl mx-auto min-h-screen">
                <NavBar />
                <App />
                <Footer />
            </main>
        </BrowserRouter>
    </React.StrictMode>
)
