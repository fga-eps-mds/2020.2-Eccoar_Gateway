import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { CaptureConsole } from '@sentry/integrations';
import routes from './routes';
import { reqHandler, traceHandler, errHandler } from './config/sentry';

const app = express();
const PORT = process.env.APP_PORT || 5000;

dotenv.config();
Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Tracing.Integrations.Express({ app }),
		new Tracing.Integrations.Mysql(),
		new CaptureConsole({
			levels: ['error'],
		}),
	],
	tracesSampleRate: 1.0,
	maxBreadcrumbs: 100,
});

app.use(reqHandler);
app.use(traceHandler);
app.use(express.json());
app.use(express.json({limit: '10mb'}));
app.use(morgan('combined'));
app.use(cors());
app.use(routes);
app.use(errHandler);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

export default app;
