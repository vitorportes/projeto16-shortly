import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
