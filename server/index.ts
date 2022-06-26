import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect, ConnectOptions } from 'mongoose';

import { itemRouter } from './routes/Item.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// prettier-ignore
connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
} as ConnectOptions).then(() => {
  console.log('Connected to database')
}).catch((error) => {
  console.log('Connection error: ', error)
  process.exit();
});

// routes
app.use(itemRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
