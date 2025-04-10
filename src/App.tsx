import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MainPage } from './components/pages/MainPage';

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
            <Footer />
        </>
    );
};
