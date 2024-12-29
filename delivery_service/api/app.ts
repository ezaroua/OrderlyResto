require('dotenv').config();
//import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from "./src/routes/deliveryRoutes";
const app = express();
const portHost = process.env.PORT;
import config from 'config.json';

console.log(portHost)
app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('delivery service');
});

app.listen(portHost);

