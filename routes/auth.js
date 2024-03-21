/* 
  This file is used to define the routes for the authentication.
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password',
      'La contraseña debe tener al menos 6 caracteres'
    ).isLength({ min: 6 }),
    validateFields,
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
    validateFields,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;
