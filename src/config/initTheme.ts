const THEME_KEY = 'preferred-theme';

export const initTheme = () => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-bs-theme', initialTheme);
};
