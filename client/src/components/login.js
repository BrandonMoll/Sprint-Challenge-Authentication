import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    };

    inputHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
      };
    

    submitHandler = (e) => {
        e.preventDefault();
        const creds = this.state;
        const endpoint = 'http://localhost:3300/api/login'
        axios.post(endpoint, creds)
        .then(res => {
            console.log(res)
            localStorage.setItem('jwt', res.data.token)
            alert('Successfully Logged in!')
        })
        .catch(err => {
            console.log(err)
            alert('Error logging in')
        })
    }
    render() {
        return (
            <div className='loginContainer'>
            <h2>Login Page</h2>
                <form className='form' onSubmit={this.submitHandler}>
                    <input 
                        type='text' 
                        name='username'
                        value={this.state.username} 
                        placeholder='Username'
                        onChange={this.inputHandler} />
                    <input 
                        type='text' 
                        name='password'
                        value={this.state.password} 
                        placeholder='Password'
                        onChange={this.inputHandler} />
                    <input
                        type='submit'
                        value='Submit' />
                </form>
            </div>
        )
    }
};

export default Login