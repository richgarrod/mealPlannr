/// <reference path="../../_all.d.ts" />
"use strict";

import * as express from "express";
import * as db from "../services/database";
import * as auth from "../services/auth";

let authenticator: auth.AuthService;
let router: express.Router;

router = express.Router();
authenticator = new auth.AuthService();

router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log("Time: ", Date.now());
	next();
});

// check if user is authenticated (via cookie)
router.get("/authenticate", (req: express.Request, res: express.Response) => {
	res.status(200);
});

// log the user in
router.post("/login", (req: express.Request, res: express.Response) => {
	authenticator.checkPassword(req.body.username, req.body.password, (valid) => {
		if (valid) {
			res.sendStatus(200);
		} else {
			res.sendStatus(401);
		}
	});
});

export = router;