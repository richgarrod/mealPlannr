/// <reference path="../../_all.d.ts" />
"use strict";

import * as express from "express";
import * as db from "../services/database";
import * as auth from "../services/auth";

let authenticator: auth.AuthService;
let router: express.Router;

router = express.Router();
authenticator = new auth.AuthService();

// check if user is authenticated (via cookie)
router.get("/authenticate", (req: express.Request, res: express.Response) => {
	authenticator.checkSession(req.cookies.mealPlannr, (userId) => {
		res.json({"userId": userId});
		res.send();
	});
});

// log the user in
router.post("/login", (req: express.Request, res: express.Response) => {
	authenticator.checkPassword(req.body.username, req.body.password, (userId) => {
		if (userId) {
			authenticator.setSession(req.body.username, userId, (session) => {
				res.cookie("mealPlannr", session, { maxAge: 100000, httpOnly: true });
				res.sendStatus(200);
			});
		} else {
			res.sendStatus(401);
		}
	});
});

export = router;