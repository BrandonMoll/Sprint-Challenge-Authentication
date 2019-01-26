import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Jokes from './components/jokes';
import Login from './components/login';
import Register from './components/register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={

    }
  };

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/register' exact>Register</NavLink>&nbsp;|&nbsp;
          <NavLink to='/login' exact>Login</NavLink>&nbsp;|&nbsp;
          <NavLink to='/jokes' exact>Jokes</NavLink>
        </nav>
          <Route path='/register' exact render={(props) => 
            <Register {...props} inputHandler={this.inputHandler} /> } />

          <Route path='/login' exact render={(props) => 
            <Login {...props} inputHandler={this.inputHandler} /> } />

          <Route path='/jokes' exact component={Jokes} />
      </div>
    );
  }
}

export default App;
