"use strict";
const express = require("express");
const auth = require("../services/auth");
let authenticator;
let router;
router = express.Router();
authenticator = new auth.AuthService();
router.get("/authenticate", (req, res) => {
    authenticator.checkSession(req.cookies.mealPlannr, (userId) => {
        res.json({ "userId": userId });
        res.send();
    });
});
router.post("/login", (req, res) => {
    authenticator.checkPassword(req.body.username, req.body.password, (userId) => {
        if (userId) {
            authenticator.setSession(req.body.username, userId, (session) => {
                res.cookie("mealPlannr", session, { maxAge: 100000, httpOnly: true });
                res.sendStatus(200);
            });
        }
        else {
            res.sendStatus(401);
        }
    });
});
module.exports = router;
