import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
      userinputs: [
          {username:'username1'},
          {username:'username2'},
          {username:'username3'}
      ]
  }

  usernameStateHandler = (event) => {
    this.setState({
        userinputs: [
            {username:event.target.value},
            {username:'username2 changed'},
            {username:'username3 changed'}
        ]
    })
  }

  render() {

      const style = {
          margin: '30px'
      };

      return (
      <div className="App">
          <UserInput
              style={style}
              eventHandler={this.usernameStateHandler}
              username={this.state.userinputs[0].username}
          />
          <UserOutput username={this.state.userinputs[0].username}></UserOutput>
          <UserOutput username={this.state.userinputs[1].username}></UserOutput>
          <UserOutput username={this.state.userinputs[2].username}></UserOutput>
      </div>
    );
  }
}

export default App;
