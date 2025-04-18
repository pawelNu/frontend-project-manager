import { useEffect, useState } from 'react';

const THEME_KEY = 'preferred-theme';

export const ThemeToggleButton: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const current = document.documentElement.getAttribute('data-bs-theme');
        return current === 'light' || current === 'dark' ? current : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <button onClick={toggleTheme} className="btn btn-primary mt-2">
            Przełącz na {theme === 'light' ? 'ciemny' : 'jasny'} motyw
        </button>
    );
};
