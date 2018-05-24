import React, { Component } from 'react';
import './App.css';
import TextOutput from './TextOutput/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

    state = {
        charAmount: '0',
        typedChars: ''
    }

    updateCharsState = (event) => {
        const typedChars = event.target.value;
        const charAmount = typedChars.length;
        this.setState({
            charAmount:charAmount,
            typedChars:typedChars
        });
    }

    deleteCharComponent = (charIndex) => {
       let typedChars = this.state.typedChars.split('');
       typedChars.splice(charIndex,1);
       typedChars = typedChars.join('');
       const charAmount = typedChars.length;
        this.setState({
            charAmount:charAmount,
            typedChars:typedChars
        });
    }


  render() {


        let charComponents = null;
        const typedCharsArray = this.state.typedChars.split('');

        charComponents = (
            <div>
                {
                    typedCharsArray.map((charComp, index) => {
                        return <CharComponent key={index} click={(event) => this.deleteCharComponent(index)} charComponent={charComp}/>
                    })
                }
            </div>
        );

    return (
      <div className="App">
            <input onChange={(event) => this.updateCharsState(event)} value={this.state.typedChars}/>
            <TextOutput charAmount={this.state.charAmount}></TextOutput>
            {charComponents}

      </div>
    );
  }
}

export default App;
