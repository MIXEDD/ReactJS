import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import TyperLayout from './hoc/TyperLayout/TyperLayout';
import DiagramLayout from './hoc/DiagramLayout/DiagramLayout';
import './App.css';

class App extends Component {
  render() {
    let routes = (
        <Switch>
            <Route path="/scores" component={DiagramLayout} />
            <Route path="/" component={TyperLayout} />
        </Switch>
    );
    return (
      <div className="App">
          <Header/>
          {routes}
      </div>
    );
  }
}

export default App;
