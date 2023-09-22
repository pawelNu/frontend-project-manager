import React from 'react';
import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Sidebar } from './layout/Sidebar/Sidebar';
import { ProjectPage } from './layout/ProjectPage/ProjectPage';
import { UsersPage } from './layout/Users/UsersPage';

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
