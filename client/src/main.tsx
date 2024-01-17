// Core
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Context
import { AuthUserContextProvider } from "./context/AuthUserContext.tsx";
import { MessageLogsContextProvider } from "./context/MessageLogsContext.tsx";

// Main Components
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthUserContextProvider>
            <MessageLogsContextProvider>
                <BrowserRouter>
                    <main className="relative max-w-6xl mx-auto min-h-screen">
                        <NavBar />
                        <App />
                        <Footer />
                    </main>
                </BrowserRouter>
            </MessageLogsContextProvider>
        </AuthUserContextProvider>
    </React.StrictMode>
)
