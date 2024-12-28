import * as config from './config.json';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRouter from "./src/routes/productRoutes";
import shopRouter from "./src/routes/shopRoutes";
const app = express();
const portHost = config.HOST;

app.use(bodyParser.json());
app.use(cors());
app.use(productRouter);
app.use(shopRouter);

app.post('/', (request: express.Request, response: express.Response) => {
  response.send(request.body);
});

app.get('/', (request: express.Request, response: express.Response) => {
  response.send('restaurant service');
});

const port = config.HOST;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});