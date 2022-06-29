import { Model, model, Schema } from 'mongoose';
import { jwtConfig } from '../config/jwtConfig';
import { v4 as uuidv4 } from 'uuid';
import { UserInterface } from './user.model'

interface IRefreshToken {
  token: string;
  user: UserInterface;
  expiryDate: Date;
}

interface RefreshTokenModel extends Model<IRefreshToken> {
  verifyExpiration(): boolean;
  createToken(user: UserInterface): Promise<string>;
}

const refreshTokenSchema = new Schema<IRefreshToken, RefreshTokenModel>({
  token: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  expiryDate: Date,
});

// prettier-ignore
refreshTokenSchema.static('createToken', async function (user): Promise<string> {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + jwtConfig.jwtRefreshExpiration
  );

  let _token = uuidv4();
  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await _object.save();

  return refreshToken.token;
});

// Verifies if the token is still valid according to the expiry date.
refreshTokenSchema.statics.verifyExpiration = (token): boolean => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = model<IRefreshToken, RefreshTokenModel>(
  'RefreshToken',
  refreshTokenSchema
);

export { RefreshToken };
