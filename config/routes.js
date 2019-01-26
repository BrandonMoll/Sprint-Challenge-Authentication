const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig')
require('dotenv').config();
const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', getUsers)
};

const secret = process.env.JWT_SECRET

function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: '1h',
    jwtid: '12345'
  };

  return jwt.sign(payload, secret, options)
}

function getUsers(req, res) {
  db('users')
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({message: 'error getting users'})
  })
}

function register(req, res) {
  const creds = req.body
  creds.password = bcrypt.hashSync(creds.password, 12);
  db('users').insert(creds)
  .then(ids => {
    const id = ids[0];
    db('users').where({ id }).first()
    .then(user => {
      const token = generateToken(user);
      console.log('second then:', token)
      res.status(201).json({id: user.id, token})
    })
    .catch(err => {
      res.status(500).send(err)
    })
  })
  .catch(err => {
    res.status(500).json({message: 'error creating user'})
  })

}

function login(req, res) {
  const creds = req.body;

  db('users').where('username', creds.username)
  .then(userInfo => {
    if(userInfo && bcrypt.compareSync(creds.password, userInfo[0].password)) {
      const token = generateToken(userInfo);
      res.status(200).json({ token })
    } else {
      res.status(400).json({ message: 'username or password incorrect' })
    }
  })
  .catch(err => {
    res.status(500).json({Message: 'error logging in'})
  })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
