/* 
  This file is used to define the routes for the events
  host + /api/events
*/

const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();

// All routes are protected by the JWT
router.use(validateJWT);

router.get('/', getEvents);
router.post('/new', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
