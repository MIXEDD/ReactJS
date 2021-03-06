import React from 'react';
import Transition from 'react-transition-group/Transition';
import './Modal.css';

const modal = (props) => {
    const cssClasses = ['Modal', props.show === 'entering' ? 'ModalOpen' : props.show === 'exiting' ? 'ModalClosed' : null];
    return(
        <Transition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={300}
        >
            {state => (
                return();
                <div className={cssClasses.join(' ')}>
                    <h1>A Modal</h1>
                    <button className="Button" onClick={props.closed}>Dismiss</button>
                </div>
            )}
        </Transition>
    );
};


export default modal;