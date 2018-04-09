import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';

const port = 3030;
const app = express();

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

app.get('/', (req, res) => res.send('Welcome to Express template in TypeScript!'));
app.get('/oauth2callback', (req, res) => {
    winston.info("welcome!");
    return res.json("callbacked");
});

app.listen(port, () => console.log(`Tempalte app listening on port ${port}!`));