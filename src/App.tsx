import React from 'react';
import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Sidebar } from './layout/Sidebar/Sidebar';
import { ProjectPage } from './pages/ProjectPage';
import { AppUsersPage } from './pages/AppUsersPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UpdateProject } from './forms/project/UpdateProject'

export const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/projects' element={<ProjectPage />} />
        <Route path='/app-users' element={<AppUsersPage />} />
        <Route path='/update-project/:id' element={<UpdateProject />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}
