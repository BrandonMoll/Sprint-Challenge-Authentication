import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';
import Jokes from './components/jokes';
import Login from './components/login';
import Register from './components/register';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      jokes: [],
      loggedIn: false
    }
  };

  getJokes = () => {
    const token = localStorage.getItem('jwt');
    const endpoint = 'http://localhost:3300/api/jokes';
    const options = {
      headers: {
        Authorization: token
      }
    }

    axios.get(endpoint, options)
    .then(res => {
      this.setState({jokes: res.data, loggedIn: true})
    })
    .catch(err => {
      console.log(err)
    })

  }

  logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt')
    this.setState({jokes: [], loggedIn: false})
    alert('Logged out')
  }

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

          <Route path='/jokes' exact render={(props) => 
            <Jokes {...props} jokes={this.state.jokes} getJokes={this.getJokes} loggedIn={this.state.loggedIn} /> } />
          <p>
            <form onSubmit={this.logoutHandler}>
              <input type='submit' value='Log out' />
            </form>
          </p>
      </div>
    );
  }
}

export default App;
