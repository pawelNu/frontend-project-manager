import React from "react";
import "./App.css";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { Sidebar } from "./layout/Sidebar";

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Footer />
        </>
    );
};
