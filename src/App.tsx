import React from 'react';
import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Sidebar } from './layout/Sidebar/Sidebar';
import { ProjectPage } from './pages/ProjectPage/ProjectPage';
import { AppUsersPage } from './pages/AppUserPage/AppUsersPage';

export const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <ProjectPage/>
      <AppUsersPage/>
      <Footer />
    </div>
  );
}
