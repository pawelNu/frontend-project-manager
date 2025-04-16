import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { routes } from './components/routes';
import { routeConfig } from './config/routes.config';
import { ToastContainer } from 'react-toastify';

export const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                {routeConfig.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
            <ToastContainer />
        </>
    );
};

const NotFoundPage = () => {
    return (
        <div className="container m-5">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for does not exist.</p>
            <Link to={routes.page.main()}>Go to Main Page</Link>
        </div>
    );
};
