import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import { GoogeApi } from './externalApis/google/google.api';
import { GoogleAnalytisApi } from './externalApis/google/google.analytics.api';

const port = 3030;
const app = express();

let token: any;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// add public as defualt static folder
app.use(express.static(path.join(__dirname, 'public')));

// Setup winston
winston.configure({
    transports: [
        new (winston.transports.File)({ filename: 'info.log' })
    ]
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/g', (req, res) => {
    const url = GoogeApi.AnalyticsUrl();
    return res.redirect(url);
});
app.get('/oauth2callback', async (req, res) => {
    try {
        winston.info('Callback called: ', req.params);
        token = await GoogeApi.GetToken(req.query['code']);
        return res.json(token);
    } catch (error) {
        return res.json(error);
    }
});

app.get('/g/accounts', async (req, res) => {
    try {
        const accounts = await GoogleAnalytisApi.getAccounts(token.access_token);
        return res.json(accounts);
    } catch (error) {
        return res.json(error);
    }
});

app.listen(port, () => console.log(`Tempalte app listening on port ${port}!`));