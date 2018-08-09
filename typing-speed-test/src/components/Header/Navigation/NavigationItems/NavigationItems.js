import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

// all navigation is combined in this component
const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/">Test</NavigationItem>
        <NavigationItem link="/scores">Scores</NavigationItem>
    </ul>
);

export default NavigationItems;