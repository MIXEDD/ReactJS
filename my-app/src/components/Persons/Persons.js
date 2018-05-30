import React, {PureComponent} from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {

    constructor(props){
        super(props);
        console.log('[Persons.js] inside Constructor ', props)
        this.lastPersonRef = React.createRef();
    }

    componentWillMount(){
        console.log('[Persons.js] inside componentWillMount() ')
    }

    componentDidMount() {
        console.log('[Persons.js] inside DidMount()');
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps){
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate ',nextProps,nextState);
    //     return nextProps.persons !== this.props.persons ||
    //         nextProps.changef !== this.props.changef ||
    //         nextProps.click !== this.props.click;
    // }

    componentWillUpdate(nextProps, nextState){
        console.log('[Update Persons.js] Inside componentWillUpdate ', nextProps,nextState);
    }

    componentDidUpdate() {
        console.log('[Update Persons.js] Inside componentDidUpdate ');
    }


    render() {
        console.log('[Persons.js] inside render()')

        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.click(index)}
                name={person.name}
                position={index}
                age={person.age}
                forwardedRef={this.lastPersonRef}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
            />
        });
    }
}

export default Persons;


