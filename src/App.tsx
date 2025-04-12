import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MainPage } from './components/pages/MainPage';
import { routes } from './components/routes';
import { routeConfig } from './config/routes.config';

export const App = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path={routes.pages.main()} element={<MainPage />} />
                {routeConfig.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
            <Footer />
        </>
    );
};
