import React, { Component } from 'react';
import {Route,BrowserRouter, Redirect,Switch} from 'react-router-dom';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';
import Navigation from '../src/navigation';
import Course from './containers/Course/Course';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
            <Navigation/>
            <Switch>
                <Route path="/users" exact component={Users} />
                <Route path="/courses" exact component={Courses} />
                <Route path="/course/:id" exact component={Course} />
                <Redirect from="/all-courses" to="/courses" />
                <Route render={() => <h1>Not found</h1>} />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
