import React from "react";
import "./App.css";
import { Navbar } from "./layout/NavbarAndFooter/Navbar";
import { Footer } from "./layout/NavbarAndFooter/Footer";
import { Sidebar } from "./layout/Sidebar/Sidebar";
import { ProjectPage } from "./pages/ProjectPage";
import { AppUsersPage } from "./pages/AppUsersPage";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UpdateProject } from "./forms/project/UpdateProject";
import { ViewProject } from "./forms/project/ViewProject";
import { AddProject } from "./forms/project/AddProject";

export const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectPage />} />
                    <Route path="/app-users" element={<AppUsersPage />} />
                    <Route
                        path="/update-project/:id"
                        element={<UpdateProject />}
                    />
                    <Route path="/view-project/:id" element={<ViewProject />} />
                    <Route path="/add-project" element={<AddProject />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};
