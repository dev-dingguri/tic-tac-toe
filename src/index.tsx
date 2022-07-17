import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './components/game/Game';

// =============================================

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Game />);
