import React from 'react';
import {NavLink} from 'react-router-dom';
import './Logo.css';

// left header logo component
const logo = () => (
    <div className="Logo">
        <NavLink to="/">Typing Test</NavLink>
    </div>
);

export default logo;