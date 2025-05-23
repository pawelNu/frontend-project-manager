import { createRoot } from 'react-dom/client';
import { AppWrapper } from './App';

const container = document.getElementById('root');
if (!container) {
    throw new Error('No container found');
}
const root = createRoot(container);

root.render(<AppWrapper />);
