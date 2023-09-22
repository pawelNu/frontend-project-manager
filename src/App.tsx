import React from 'react';
import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Sidebar } from './layout/Sidebar/Sidebar';
import { ProjectPage } from './layout/Pages/ProjectPage/ProjectPage';
import { UsersPage } from './layout/Pages/UserPage/UsersPage';

export const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <ProjectPage/>
      <UsersPage/>
      <Footer />
    </div>
  );
}
