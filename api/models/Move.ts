import { Schema, model } from 'mongoose';

interface IMove {
  user: string,
  name: string,
  type: string,
  value: number,
  date: Date,
  desc: string
}

const MoveSchema = new Schema<IMove>({
  user: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  desc: { type: String }
});

const Move = model<IMove>('Move', MoveSchema);

// run().catch(err => console.log(err));

export default Move;
