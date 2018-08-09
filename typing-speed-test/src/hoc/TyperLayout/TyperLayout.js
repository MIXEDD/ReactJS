import React, {Component} from 'react';
import Dashboard from '../../containers/Dashboard/Dashboard';
import TextField from '../../containers/TextField/TextField';
import Auxillary from '../../hoc/Auxillary/Auxillary'

class TyperLayout extends Component {
    //Typer Layout
    render(){
        return(
            <Auxillary>
                <Dashboard/>
                <TextField/>
            </Auxillary>
        );
    }
}

export default TyperLayout;