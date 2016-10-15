/// <reference path="../../_all.d.ts" />
"use strict";

import * as express from "express";
import * as db from "../services/database";

let database: db.Database;

let router: express.Router;
router = express.Router();
database = new db.Database();

router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
	console.log("Time: ", Date.now());
	next();
});

router.get("/", function(req: express.Request, res: express.Response) {
	var users = database.query("SELECT name FROM users WHERE admin=true;",
		(err: Error, result: any) => {
		if (err) {
			throw err;
		}

		console.log(result.rows);
		res.json(result.rows);
	});
});

router.get("/details/:userId", function(req: express.Request, res: express.Response) {
	var userId = req.params.userId;

	var users = database.query("SELECT name, address, country, email FROM user_details left join users on user_details.user_id = users.id WHERE user_id=" + userId + ";",
		(err: Error, result: any) => {
		if (err) {
			throw err;
		}

		console.log(result.rows);
		res.json(result.rows[0]);
	});
});

router.get("/dropIns/:userId", function(req: express.Request, res: express.Response) {
	var userId = req.params.userId;

	var users = database.query("SELECT date, boxes.name as name FROM drop_ins LEFT JOIN boxes ON drop_ins.box = boxes.id WHERE user_id=" + userId + ";",
		(err: Error, result: any) => {
		if (err) {
			throw err;
		}

		console.log(result.rows);
		res.json(result.rows);
	});
});

export = router;