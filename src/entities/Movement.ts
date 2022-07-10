import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import { IMovement } from '../interfaces/IMovement';
import { getDecimal } from '../utils/helper';

const MovementSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
  },
  description: {
    type: String,
    required: false,
    maxlength: 200,
  },
  formOfPayment: {
    type: Number,
    required: false,
  },
  type: {
    type: Number,
    required: true,
  },
  value: {
    type: Schema.Types.Decimal128,
    get: getDecimal,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  deletedAt: {
    type: Date,
    default: null,
  }
}, { toJSON: { getters: true }, timestamps: true });

export default model<IMovement>('Movement', MovementSchema);