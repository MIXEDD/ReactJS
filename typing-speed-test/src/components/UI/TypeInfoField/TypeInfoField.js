import React from 'react';
import './TypeInfoField.css';

// single component of the information displayed on the dashboard
// INFORMATION SUCH AS: WPM/CPM/Accuracy
const typeInfoField = (props) => (
    <div className="typeInfoField">
        <p className="value">{props.value}</p>
        <p className="label">{props.label}</p>
    </div>
);

export default typeInfoField;