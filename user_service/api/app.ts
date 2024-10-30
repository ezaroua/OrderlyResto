import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from "./src/routes/userRoutes";
const app = express();
const portHost = config.HOST;

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);

app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('user service');
});

app.listen(portHost);