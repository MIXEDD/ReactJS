import React from 'react';
import './CharComponent.css';


const charComponent = (props) => {

    return (
            <p onClick={props.click} className="char-component">{props.charComponent}</p>
    )
}

export default charComponent;