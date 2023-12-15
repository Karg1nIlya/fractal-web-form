import { App } from './App';
import ReactDOM from 'react-dom/client';

const root = document.getElementById('root')

if(!root) {
    throw new Error('root not found')
}

const container = ReactDOM.createRoot(root)

container.render(
    <App />
);
