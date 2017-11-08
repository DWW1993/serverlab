import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as bp from 'body-parser';
import { generate } from 'shortid';
import api from "./router/api";

const client = path.join(__dirname, '..', 'client', 'dist');
export const dataPath = path.join(__dirname, 'data.json');

const app = express();

app
    .disable('x-powered-by')
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        next();
    })
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))
    .use("/api", api)
    .use('/', express.static(client, { redirect: false }))
    .get('/*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(client, 'index.html'));
    });

app
    .listen(3000, () => {
        console.log("Your Server Is Just Straight Up Working At This Very Moment In Time")
    });