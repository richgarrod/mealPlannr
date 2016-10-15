"use strict";
const express = require("express");
const db = require("../services/database");
let database;
let router;
router = express.Router();
database = new db.Database();
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
router.get("/", function (req, res) {
    var users = database.query("SELECT name FROM users WHERE admin=true;", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.json(result.rows);
    });
});
router.get("/details/:userId", function (req, res) {
    var userId = req.params.userId;
    var users = database.query("SELECT name, address, country, email FROM user_details left join users on user_details.user_id = users.id WHERE user_id=" + userId + ";", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.json(result.rows[0]);
    });
});
router.get("/dropIns/:userId", function (req, res) {
    var userId = req.params.userId;
    var users = database.query("SELECT date, boxes.name as name FROM drop_ins LEFT JOIN boxes ON drop_ins.box = boxes.id WHERE user_id=" + userId + ";", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.json(result.rows);
    });
});
module.exports = router;
