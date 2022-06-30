import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';

import { userRouter } from './routes/user.routes';
import { productRouter } from './routes/product.routes';

config();

const app: Express = express();

app.use(cors());
app.use(express.json());

// prettier-ignore
connect(<string>process.env.MONGO_URI, {
  useNewUrlParser: true,
} as ConnectOptions).then(() => {
  console.log('Connected to database')
}).catch((error) => {
  console.log('Connection error: ', error)
  process.exit();
});

// routes
app.use(userRouter);
app.use(productRouter);

app.listen(<string>process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
