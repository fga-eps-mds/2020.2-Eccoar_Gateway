import * as express from 'express';
import * as cors from 'cors';

import routes from './routes';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(routes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

