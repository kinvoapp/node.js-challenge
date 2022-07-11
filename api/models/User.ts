import { Schema, model } from 'mongoose';

interface IUser {
  name: string,
  password: string
  email: string,
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

const User = model<IUser>('User', UserSchema);

// cria usuário "admin" caso ele não exista
(async () => {
  if (!await User.findOne({ name: 'admin' })) {
    await User.create({ name: 'admin', password: 'admin', email: 'admin@admin.com' })
      .catch((err) => console.log(err));
  }
}) ();

export default User;
