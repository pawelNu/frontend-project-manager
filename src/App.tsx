import React from "react";
import "./App.css";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import { Sidebar } from "./layout/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProjectsAll } from "./pages/Project/ProjectsAll";
import { ProjectNew } from "./pages/Project/ProjectNew";
import { ProjectEdit } from "./pages/Project/ProjectEdit";
import { ProjectDetails } from "./pages/Project/ProjectDetails";

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/all-projects" element={<ProjectsAll />} />
                    <Route path="/add-new-project" element={<ProjectNew />} />
                    <Route path="/edit-project/:id" element={<ProjectEdit />} />
                    <Route
                        path="/view-project/:id"
                        element={<ProjectDetails />}
                    />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
};
