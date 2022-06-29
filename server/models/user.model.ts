import { Document, Schema, Model, model } from 'mongoose';
import { hash } from 'bcrypt';

export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber?: string;
  orderHistory: []; // referenced to an Order object
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true }, // name of user
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 4, max: 15 },
  isAdmin: { type: Boolean, default: false },
  address: {
    street: { type: String, required: true },
    apartment: { type: String, default: null },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  phoneNumber: { type: String, default: null },
  orderHistory: [{ type: Schema.Types.ObjectId, ref: '' }], // array of prior orders
});

// on initial user registration, encrypts the password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 8);
  }
  next();
});

const User: Model<UserInterface> = model<UserInterface>('User', userSchema);

export { User };
