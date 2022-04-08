import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');

const root = createRoot(container as Element);
root.render(<App />);
