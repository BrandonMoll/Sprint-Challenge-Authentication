import React, { Component } from 'react';

class Register extends Component {
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
    

    submitHandler = (username, password) => {
        
    }

    render() {
        return (
            <div className='registerContainer'>
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

export default Register