import React, { Component } from 'react';

class Jokes extends Component {

    componentDidMount() {
        this.props.getJokes();
    };



    render() {
        if (this.props.loggedIn) {
        return (
            <div className='jokesContainer'>
                <ul>
                    {this.props.jokes.map(joke => (
                        <li key={joke.id}>{joke.joke}</li>
                    ))}
                </ul>
            </div>
        )
        } else {
            return (
                <div>
                    Please log in
                </div>
            )
        }   
    }
};

export default Jokes