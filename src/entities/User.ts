import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<IUser>('User', UserSchema);