import React from 'react';
import Logo from './Logo/Logo';
import NavigationItems from './Navigation/NavigationItems/NavigationItems';
import './Header.css';

// header part of the page
const header = () => (
    <div className="Header">
        <Logo/>
        <NavigationItems/>
    </div>
);


export default header;