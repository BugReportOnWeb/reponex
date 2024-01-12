import React from "react";
import ReactDOM from "react-dom/client";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthUserContextProvider } from "./context/AuthUserContext.tsx";
import App from "./App.tsx";
import "./index.css";
import { MessageLogsContextProvider } from "./context/MessageLogsContext.tsx";

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
