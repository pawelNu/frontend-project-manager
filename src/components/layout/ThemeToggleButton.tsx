import { useEffect, useState } from 'react';

const THEME_KEY = 'preferred-theme';

export const ThemeToggleButton: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-bs-theme', initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button onClick={toggleTheme} className="btn btn-primary mt-2">
            Przełącz na motyw: {theme === 'light' ? 'Ciemny' : 'Jasny'}
        </button>
    );
};
