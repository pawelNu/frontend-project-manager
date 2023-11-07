import React from "react";
import "./App.css";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { Sidebar } from "./layout/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { AllProjectsPage } from "./pages/ProjectsPages/AllProjectsPage";
import { AddNewProject } from "./pages/ProjectsPages/AddNewProject";
import { EditProject } from "./pages/ProjectsPages/EditProject";

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/all-projects" element={<AllProjectsPage />} />
                    <Route
                        path="/add-new-project"
                        element={<AddNewProject />}
                    />
                    <Route path="/edit-project/:id" element={<EditProject />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
};
