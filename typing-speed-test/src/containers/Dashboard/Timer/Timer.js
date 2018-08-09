import React, {Component} from 'react';
import {connect} from 'react-redux'
import './Timer.css';
import * as actions from "../../../store/actions";

class Timer extends Component {

    constructor(props){
        super(props);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }

    state = {
        initialTimerVal:60,
        timer: 60,
        intervalID: ""
    };

    componentWillReceiveProps(nextProps) {
        //Initiates timer once timerStarted state change took effect
        if(nextProps.timerStarted && !nextProps.timerFinished){
            this.startTimer();
        }
        //Resets timer value to it's default value
        if(!nextProps.timerStarted && !nextProps.timerFinished ){
            this.setState({timer:this.state.initialTimerVal});
        }
    }

    componentWillUnmount(){
        //In case of an early component unmount timer is stopped to prevent memory leak and error
        if(this.state.intervalID !== "")
            this.stopTimer();
    };

    // starts the timer
    startTimer = () => {
        const self = this;
        let timerReset = false;
        if(this.state.timer === 0) {
            console.log("timerState");
            this.setState({timer:this.state.initialTimerVal});
            timerReset = true;
        }
         const intervalID = setInterval(function(){
               const reductionValue = self.state.timer - 1;
               if(reductionValue <= 0){
                   self.setState({timer:reductionValue});
                   self.stopTimer();
                   return;
               } else if(timerReset){
                   timerReset = false;
                   self.setState({timer:self.state.initialTimerVal - 1});
               } else self.setState({timer:reductionValue});
            }, 1000);
        if(this.state.intervalID === "")
            this.setState({intervalID:intervalID});
    };

    // stops the timer
    stopTimer = () => {
        clearInterval(this.state.intervalID);
        this.setState({timer:0,intervalID:""});
        this.props.stopTimer();
    };

    render(){
        return(
            <div className="Timer">
                <p className="value">{this.state.timer}</p>
                <p className="label">SEC</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        timerStarted:state.timerStarted,
        timerFinished:state.timerFinished
    };
};

const mapDispatchToProps = dispatch => {
    return {
        stopTimer: () => dispatch(actions.stopTimer())
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (Timer);