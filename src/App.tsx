import React from 'react';
import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { Sidebar } from './layout/Sidebar/Sidebar';

export const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <Footer />
    </div>
  );
}
