require('dotenv').config();
//import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from "./src/routes/deliveryRoutes";
const app = express();
import * as config from './config.json';

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('delivery service');
});

const port = config.HOST ;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
