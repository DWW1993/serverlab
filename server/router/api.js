"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chirps_1 = require("./chirps");
var router = express_1.Router();
router
    .use("/chirps", chirps_1.default);
exports.default = router;
