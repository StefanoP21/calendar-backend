const { response } = require('express');

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'POST - Register',
    name,
    email,
    password,
  });
};

const loginUser = (req, res = response) => {
  const { name, email } = req.body;

  res.status(200).json({
    ok: true,
    msg: 'POST - Login',
    name,
    email,
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
