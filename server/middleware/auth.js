"use strict";
const express = require("express");
const auth = require("../services/auth");
let authenticator;
let router;
router = express.Router();
authenticator = new auth.AuthService();
router.use(function timeLog(req, res, next) {
    authenticator.checkSession(req.cookies.mealPlannr, (userId) => {
        if (userId === null) {
            res.sendStatus(401);
        }
        else {
            req.body.userId = userId;
            next();
        }
    });
});
module.exports = router;
