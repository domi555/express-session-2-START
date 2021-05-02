const express = require('express');
const router = express.Router();
// enter your code here
let users = require('../model/users');

router.post('/login', (req, res) => {
  // enter your code here
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      (el) => el.email === email && el.password === password,
    );
    if (user) {
      req.session.userId = user.id;
      res.status(200).json({ id: user.id, name: user.name });
    } else res.status(401).send('Wrong email or password');
  } else res.status(400).send('Login failed');
});

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) res.status(400).send('You are not logged in!');
  else next();
};

router.get('/logout', redirectLogin, (req, res) => {
  // enter your code here
  req.session.destroy();
  res.clearCookie(process.env.SESSION_NAME);
});

router.post('/register', (req, res) => {
  // enter your code here
  const { email, name, password } = req.body;
  if (email && name && password) {
    const exists = users.find((el) => el.email == email) ? true : false;
    if (!exists) {
      const user = {
        id: Math.max(users.map((el) => el.id)),
        email,
        name,
        password,
      };
      users.push(user);
      res.status(200).send('OK');
    } else res.status(409).send('Email already registered');
  } else res.status(400).send('Registration failed');
});

router.get('/secretdata', (req, res) => {
  // enter your code here
  return res.status(200).end('the prime number is 2305843009213693951');
});

module.exports = router;
