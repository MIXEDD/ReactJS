import React, { Component } from 'react';
import { connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    // state = {
    //     counter: 0
    // };

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    };

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAdd5Counter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSub5Counter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ctr: state.ctr.counter,
        storedResults:state.res.results
    };
};

const mapDisptachToProps = disptach => {
    return{
        onIncrementCounter: () => disptach({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => disptach({type:actionTypes.DECREMENT}),
        onAdd5Counter: () => disptach({type:actionTypes.ADD5,value:10}),
        onSub5Counter: () => disptach({type:actionTypes.SUB5,value:15}),
        onStoreResult: (result) => disptach({type:actionTypes.STORE_RESULT,result: result}),
        onDeleteResult: (id) => disptach({type:actionTypes.DELETE_RESULT,resultElId:id})
    };
};

export default connect(mapStateToProps, mapDisptachToProps)(Counter);