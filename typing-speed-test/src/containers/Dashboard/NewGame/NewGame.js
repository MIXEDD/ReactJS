import React,{Component} from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import './NewGame.css';

class NewGame extends Component {
    //used to reset all state values to default and to set up new random text
    startNewGame = () => {
        this.props.setRandomTextToNull();
        this.props.SetUp();
    };

    render(){
            if(this.props.timerFinished){
                return(
                    <Auxillary>
                        <a className="NewGame" onClick={this.startNewGame}>New Game</a>
                    </Auxillary>
                );
            } else return null;
    }
};

const mapStateToProps = state => {
    return {
        timerFinished:state.timerFinished
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetUp: () => dispatch(actions.SetUp()),
        setRandomTextToNull: () => dispatch(actions.setRandomTextToNull())
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (NewGame);