import express from 'express';

const app = express();
const port: number = 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
