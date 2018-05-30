import React, { PureComponent } from 'react';
import styles from './App.css';
import Person from '../components/Persons/Person/Person';
import Persons from "../components/Persons/Persons";
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import Auxillary from '../hoc/Auxillary';
import WithClassSecond from '../hoc/WithClassSecond';

class App extends PureComponent {

    constructor(props){
         super(props);
         console.log('[App.js] Inside Constructor', props)
        this.state = {
            persons: [
                {id: '1', name:'Max', age:28},
                {id: '2', name:'Manu', age:29},
                {id: '3',name:'Stephanie', age:25}
            ],
            otherState: 'some other value',
            showPersons: false,
            toggleClicked: 0
        }

    }

    componentWillMount(){
        console.log('[App.js] inside componentWillMount() ')
    }

    componentDidMount() {
        console.log('[App.js] inside DidMount()');
    }


    componentWillUpdate(nextProps, nextState){
        console.log('[Update App.js] Inside componentWillUpdate ', nextProps,nextState);
    }

    componentDidUpdate() {
        console.log('[Update App.js] Inside componentDidUpdate ');
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        }

        //const person = Object.assign({}, this.state.persons[personIndex]);

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons })
    }

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.splice();
        const persons = [...this.state.persons];
        persons.splice(personIndex,1);
        this.setState({persons: persons})
    }


    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState( (prevState,props) => {
            return {
                showPersons: !doesShow,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    }




    render() {
        console.log('[App.js] inside render()')
        let persons = null;


        if(this.state.showPersons){
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        click={this.deletePersonHandler}
                        changed={this.nameChangedHandler}
                    />
                </div>
            );

        }



    return (
            <Auxillary>
                  <button onClick={() => {this.setState({showPersons: true})}} >Show Persons</button>
                  <Cockpit
                      appTitle={this.props.title}
                      showPersons={this.state.showPersons}
                      persons={this.state.persons}
                      click={this.togglePersonsHandler}
                  />
                  {persons}
            </Auxillary>
    );
  }
}

export default WithClassSecond(App, styles.App);
