import React from 'react';

const withClass = (props) => (

    <div className = {props.styles}>
        {props.children}
    </div>
);

export default withClass;