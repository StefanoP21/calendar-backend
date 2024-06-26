import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The password is required'],
  },
});

export const UserModel = model('User', userSchema, 'users');
