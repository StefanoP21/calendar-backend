const { response } = require('express');

const createUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'POST - Register',
  });
};

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'POST - Login',
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'GET - Renew',
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

// Path: routes/auth.js
