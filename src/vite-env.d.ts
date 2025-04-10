/// <reference types="vite/client" />

declare global {
    interface Window {
        bootstrap: {
            Offcanvas: {
                getInstance: (element: Element) => { hide: () => void } | null;
            };
        };
    }
}

export {};
