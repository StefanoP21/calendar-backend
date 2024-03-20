/* 
  This file is used to define the routes for the authentication.
  host + /api/auth
*/

const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'GET - Auth',
  });
});

module.exports = router;
