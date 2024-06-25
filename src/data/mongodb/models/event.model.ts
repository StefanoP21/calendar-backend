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

eventSchema.method('toJSON', function () {
  const { __v, _id, ...object }: { __v: number; _id: any; id: any } =
    this.toObject();
  object.id = _id;
  return object;
});

export const EventModel = model('User', eventSchema, 'users');
