import { Router } from "express";
import * as express from 'express';
import * as fs from 'fs';
import { dataPath } from "../index";
import { generate } from 'shortid';

const router = Router();

router
    .get("/", (req: express.Request, res: express.Response) => {
        fs.readFile(dataPath, 'utf-8', (err, f) => {
            const fp = JSON.parse(f)
            res.json(fp);
        });
    })
    .post("/", (req: express.Request, res: express.Response) => {
        fs.readFile(dataPath, 'utf-8', (err, f) => {
            const fp = JSON.parse(f);
            const c = req.body;
            const id = generate();
            c.id = id;
            fp.push(c);
            fs.writeFile(dataPath, JSON.stringify(fp), (err) => {
                if (err) throw err;
                res.status(201).send(id).end();
            });
        });
    })
    .get("/:id", (req: express.Request, res: express.Response) => {
        fs.readFile(dataPath, 'utf-8', (err, f) => {
            const fp: Array<any> = JSON.parse(f);
            const found = fp.filter((chirp: any) => chirp.id === req.params.id);

            if (found.length !== 1) {
                res.status(404).end();
                return;
            }

            const chirp = JSON.stringify(found[0]);
            res.send(chirp).end();
        });
    })
    .delete("/:id", (req: express.Request, res: express.Response) => {
        fs.readFile(dataPath, 'utf-8', (err, f) => {
            const fp: Array<any> = JSON.parse(f);
            let foundIndex: number = -1;

            fp.map((chirp: any, i) => {
                if (chirp.id === req.params.id) {
                    foundIndex = i;
                }
            });

            if (foundIndex === -1) {
                res.status(404).end();
                return;
            }

            fp.splice(foundIndex, 1);

            fs.writeFile(dataPath, JSON.stringify(fp), 'utf-8', (err) => {
                if (err) throw err;

                console.error(err);
                res.status(202).end();
            });
        });
    });

export default router