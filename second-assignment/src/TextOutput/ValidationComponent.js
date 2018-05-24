import React from 'react';


const validationComponent = (props) => {

    return (
        <div className="char-length">
            <p>Characters typed: {props.charAmount}</p>
            {
                    props.charAmount <= 5 && props.charAmount > 0 ?
                    <p>Text too short</p>
                    : props.charAmount > 5 ?
                    <p>Text long enough</p>
                    : null
            }
        </div>
    )
}

export default validationComponent;