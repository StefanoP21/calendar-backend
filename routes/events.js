/* 
  This file is used to define the routes for the events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJwt');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const router = Router();

// All routes are protected by the JWT
router.use(validateJWT);

router.get('/', getEvents);

router.post(
  '/new',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('La fecha de inicio debe ser una fecha válida')
      .custom((value, { req }) => {
        const { end } = req.body;

        if (value > end) {
          throw new Error(
            'La fecha de inicio debe ser menor a la fecha de fin'
          );
        }
        return true;
      }),
    check('end', 'La fecha de fin es obligatoria')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('La fecha de fin debe ser una fecha válida'),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('La fecha de inicio debe ser una fecha válida')
      .custom((value, { req }) => {
        const { end } = req.body;

        if (value > end) {
          throw new Error(
            'La fecha de inicio debe ser menor a la fecha de fin'
          );
        }
        return true;
      }),
    check('end', 'La fecha de fin es obligatoria')
      .not()
      .isEmpty()
      .isISO8601()
      .withMessage('La fecha de fin debe ser una fecha válida'),
    validateFields,
  ],
  updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;
