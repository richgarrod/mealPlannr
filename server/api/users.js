"use strict";
const express = require("express");
const db = require("../services/database");
const auth = require("../services/auth");
let database;
let authenticator;
let router;
router = express.Router();
database = new db.Database();
authenticator = new auth.AuthService();
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
router.get("/", (req, res) => {
    database.query("select name from users", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.json(result.rows);
        res.send();
    });
});
router.get("/:username", (req, res) => {
    let username = req.params.username;
    database.query("select id from users where name = '" + username + "';", (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.json(result.rows);
        res.send();
    });
});
router.post("/create", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    authenticator.createHash(password, (hash) => {
        let sql = "INSERT INTO users(name, hash, admin) VALUES('" + username +
            "','" + hash + "',false);";
        console.log(sql);
        database.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
            res.json(result.rows);
            res.send();
        });
    });
});
module.exports = router;
