const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = 'secret';

function generateToken(user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1h',
    jwtid: Date.now()
  }

  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  const creds = req.body
  creds.password = bcrypt.hashSync(creds.password, 12)
}

function login(req, res) {
  // implement user login
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
