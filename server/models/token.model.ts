import { Document, Model, Schema, model } from 'mongoose';

interface TokenInterface extends Document {
  userId: string;
  token: string;
  createdAt: Date;
}

const tokenSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token: Model<TokenInterface> = model<TokenInterface>(
  'Token',
  tokenSchema
);

export { Token };
