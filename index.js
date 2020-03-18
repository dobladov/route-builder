import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import './styles/globalStyles.css';
import App from './components/App';
render(React.createElement(App, null), document.getElementById('root'));
