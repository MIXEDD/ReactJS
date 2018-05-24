import React from 'react';
import './UserInput.css';

const userinput = (props) => {
    return (
        <div className="userinput">
            <input type="text" onChange={props.eventHandler} value={props.username}/>
        </div>
    )
}


export default userinput;