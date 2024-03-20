const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  // Express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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

  // Express validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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

// Path: routes/auth.js
