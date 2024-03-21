const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
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
      msg: 'Hable con el administrador',
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no encontrado por ese id',
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    }).populate('user', 'name');

    res.status(200).json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
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
