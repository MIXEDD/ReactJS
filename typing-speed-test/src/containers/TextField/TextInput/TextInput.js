import React,{Component} from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import './TextInput.css';

class TextInput extends Component {
    //Text input field where user enters words
    // it holds the key={} value so that it could be rerendered when needed
    render(){
        return(
            <Auxillary>
                <input
                    key={this.props.toggleInput ? "rerender" : "rerender-again"}
                    className="TextInput"
                    placeholder={this.props.disableInput ? "Input disabled." : "Type your word here." }
                    defaultValue={this.props.disableInput ? "" : this.props.previousWord }
                    autoFocus
                    onKeyDown={(e) => this.props.onKeyDown(e)}
                    disabled={this.props.disableInput}
                />
            </Auxillary>
        );
    }
}

export default TextInput;