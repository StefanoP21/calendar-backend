/* 
  This file is used to define the routes for the authentication.
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password',
      'La contraseña debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check(
      'password',
      'La contraseña debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
  ],
  loginUser
);

router.get('/renew', renewToken);

module.exports = router;
