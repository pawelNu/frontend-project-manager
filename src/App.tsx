import './App.css';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

function App() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Footer />
        </>
    );
}

export default App;
