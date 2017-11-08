"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var bp = require("body-parser");
var api_1 = require("./router/api");
var client = path.join(__dirname, '..', 'client', 'dist');
exports.dataPath = path.join(__dirname, 'data.json');
var app = express();
app
    .disable('x-powered-by')
    .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})
    .use(bp.json())
    .use(bp.urlencoded({ extended: true }))
    .use("/api", api_1.default)
    .use('/', express.static(client, { redirect: false }))
    .get('/*', function (req, res) {
    res.sendFile(path.join(client, 'index.html'));
});
app
    .listen(3000, function () {
    console.log("Your Server Is Just Straight Up Working At This Very Moment In Time");
});
