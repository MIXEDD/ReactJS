import React, {Component} from 'react';
import TypeInfoField from '../../../components/UI/TypeInfoField/TypeInfoField';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";

let isIE = /*@cc_on!@*/false || !!document.documentMode;
let isEdge = !isIE && !!window.StyleMedia;

if(isIE || isEdge)require('./TypingInfoMS.css');
else require('./TypingInfo.css');


class TypingInfo extends Component{

    //Dashboard live information elements are displayed here
    render(){
        return(
            <div className="TypingInfo">
                <TypeInfoField value={this.props.WPM} label="WORDS / MIN" />
                <TypeInfoField value={this.props.CPM} label="CHARS / MIN" />
                <TypeInfoField value={this.props.Accuracy} label="Accuracy %" />
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        WPM: state.WPM,
        CPM: state.CPM,
        Accuracy: state.Accuracy
    };
};

const mapDispatchToProps = dispatch => {
    return {
        SetUp: () => dispatch(actions.SetUp())
    };
};

export default connect(mapStateToProps,mapDispatchToProps) (TypingInfo);