import React, {Component} from 'react';
import styles from './Person.css';
import WithClass from '../../../hoc/WithClass';
import Auxillary from '../../../hoc/Auxillary';
import withClassSecond from "../../../hoc/WithClassSecond";
import PropTypes from 'prop-types';

class Person extends Component{

    constructor(props){
        super(props);
        console.log('[Person.js] inside Constructor ', props)
        this.inputElement = React.createRef();
    }

    componentWillMount(){
        console.log('[Person.js] inside componentWillMount() ')
    }

    componentDidMount() {
        console.log('[Person.js] inside DidMount()');
        if(this.props.position === 0)
            this.inputElement.current.focus();
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {

        console.log('[Person.js] inside render()')
        return (
            <Auxillary>
                <p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} !</p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name}
                />
            </Auxillary>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed:PropTypes.func
};

export default withClassSecond(Person,styles.Person);