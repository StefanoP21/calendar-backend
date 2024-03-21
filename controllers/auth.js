const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'A user already exists with that email',
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'User created successfully',
      uid: user.id,
      name: user.name,
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
