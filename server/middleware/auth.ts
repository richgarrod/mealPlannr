/// <reference path="../../_all.d.ts" />
"use strict";

import * as express from "express";
import * as auth from "../services/auth";

let authenticator: auth.AuthService;
let router: express.Router;

router = express.Router();
authenticator = new auth.AuthService();

router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
	authenticator.checkSession(req.cookies.mealPlannr, (userId) => {
        if (userId === null) {
            res.sendStatus(401);
        } else {
            req.body.userId = userId;
            next();
        }
    });
});

export = router;