import React from 'react';
import styles from './Cockpit.css';
import Auxillary from '../../hoc/Auxillary.js';



const cockpit = (props) => {

    let btnClass = styles.Button;
    const classes = [];
    if(props.showPersons){
        btnClass = [styles.Button,styles.Red].join(' ');
    }

    if(props.persons.length <= 2){
        classes.push(styles.red); // classes = ['red]
    }
    if(props.persons.length <= 1) {
        classes.push(styles.bold); // classes = ['red, 'bold']
    }

    return(
        <Auxillary>
                <h1>{props.appTitle}</h1>
                <p className={classes.join(' ')}>this is really working</p>
                <button
                    className={btnClass}
                    onClick={props.click}>Toggle persons</button>
            <button onClick={props.login} >Log in</button>
        </Auxillary>
    );
};

export default cockpit;