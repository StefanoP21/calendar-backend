const { response } = require('express');
const User = require('../models/User');

const createUser = async (req, res = response) => {
  // const { name, email, password } = req.body;
  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'POST - Register',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator',
    });
  }
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
