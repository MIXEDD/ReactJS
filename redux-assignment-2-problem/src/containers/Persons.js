import React, { Component } from 'react';
import * as actionTypes from '../store/actions';
import { connect} from 'react-redux';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {


    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDelPerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        persons: state.persons
    };
};

const mapDisptachToProps = disptach => {
    return{
        onAddPerson: (name,age) => disptach({type: actionTypes.ADD_PERSON,personData:{name:name,age:age}}),
        onDelPerson: (personId) => disptach({type:actionTypes.DEL_PERSON,personId:personId}),
    };
};

export default connect(mapStateToProps,mapDisptachToProps) (Persons);