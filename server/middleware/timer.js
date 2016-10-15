"use strict";
var dateformat = require("dateformat");
const express = require("express");
let router;
router = express.Router();
router.use(function timeLog(req, res, next) {
    let date = Date.now();
    console.log("Time: ", dateformat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
    next();
});
module.exports = router;
