"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs = require("fs");
var index_1 = require("../index");
var shortid_1 = require("shortid");
var router = express_1.Router();
router
    .get("/", function (req, res) {
    fs.readFile(index_1.dataPath, 'utf-8', function (err, f) {
        var fp = JSON.parse(f);
        res.json(fp);
    });
})
    .post("/", function (req, res) {
    fs.readFile(index_1.dataPath, 'utf-8', function (err, f) {
        var fp = JSON.parse(f);
        var c = req.body;
        var id = shortid_1.generate();
        c.id = id;
        fp.push(c);
        fs.writeFile(index_1.dataPath, JSON.stringify(fp), function (err) {
            if (err)
                throw err;
            res.status(201).send(id).end();
        });
    });
})
    .get("/:id", function (req, res) {
    fs.readFile(index_1.dataPath, 'utf-8', function (err, f) {
        var fp = JSON.parse(f);
        var found = fp.filter(function (chirp) { return chirp.id === req.params.id; });
        if (found.length !== 1) {
            res.status(404).end();
            return;
        }
        var chirp = JSON.stringify(found[0]);
        res.send(chirp).end();
    });
})
    .delete("/:id", function (req, res) {
    fs.readFile(index_1.dataPath, 'utf-8', function (err, f) {
        var fp = JSON.parse(f);
        var foundIndex = -1;
        fp.map(function (chirp, i) {
            if (chirp.id === req.params.id) {
                foundIndex = i;
            }
        });
        if (foundIndex === -1) {
            res.status(404).end();
            return;
        }
        fp.splice(foundIndex, 1);
        fs.writeFile(index_1.dataPath, JSON.stringify(fp), 'utf-8', function (err) {
            if (err)
                throw err;
            console.error(err);
            res.status(202).end();
        });
    });
});
exports.default = router;
