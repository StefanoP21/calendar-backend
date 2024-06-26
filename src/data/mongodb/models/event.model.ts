import { model, Schema } from 'mongoose';

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: [true, 'The start date is required'],
  },
  end: {
    type: Date,
    required: [true, 'The end date is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const EventModel = model('Event', eventSchema, 'events');
