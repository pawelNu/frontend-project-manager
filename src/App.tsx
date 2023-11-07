import React from "react";
import "./App.css";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { Sidebar } from "./layout/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { AllProjectsPage } from "./pages/ProjectsPages/AllProjectsPage";

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/all-projects" element={<AllProjectsPage />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
};
