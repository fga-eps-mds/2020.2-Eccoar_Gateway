import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import routes from './routes';
import handleErrors from './utils/ErrorHandler';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(routes);
app.use(handleErrors);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

export default app;
