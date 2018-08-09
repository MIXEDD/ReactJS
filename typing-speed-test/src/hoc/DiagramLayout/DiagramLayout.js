import React, {Component} from 'react';
import Diagram from './Diagram/Diagram';
import Auxillary from '../Auxillary/Auxillary';


class DiagramLayout extends Component{
    //Diagram Layout
    render(){
        return(
            <Auxillary>
                <Diagram/>
            </Auxillary>
        );
    }
}

export default DiagramLayout;