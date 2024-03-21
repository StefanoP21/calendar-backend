const { response } = require('express');
const Event = require('../models/Event');

const getEvents = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'GET - getEvents',
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventDb = await event.save();

    res.status(200).json({
      ok: true,
      event: eventDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Talk to the administrator',
    });
  }
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
