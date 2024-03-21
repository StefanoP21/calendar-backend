const { response } = require('express');

const getEvents = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'GET - getEvents',
  });
};

const createEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'POST - createEvent',
  });
};

const updateEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'PUT - updateEvent',
  });
};

const deleteEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'DELETE - deleteEvent',
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
