"use strict";
const express = require("express");
const auth = require("../services/auth");
let authenticator;
let router;
router = express.Router();
authenticator = new auth.AuthService();
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});
router.get("/authenticate", (req, res) => {
    res.status(200);
});
router.post("/login", (req, res) => {
    authenticator.checkPassword(req.body.username, req.body.password, (valid) => {
        if (valid) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(401);
        }
    });
});
module.exports = router;
