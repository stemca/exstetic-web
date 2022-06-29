require('dotenv').config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  jwtExpiration: 3600,
  jwtRefreshExpiration: 86400,
};
