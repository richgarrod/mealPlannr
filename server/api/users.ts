/// <reference path="../../_all.d.ts" />
"use strict";

import * as express from "express";
import * as db from "../services/database";
import * as auth from "../services/auth";

let database: db.Database;
let authenticator: auth.AuthService;
let router: express.Router;

router = express.Router();
database = new db.Database();
authenticator = new auth.AuthService();

// get all users 
router.get("/", (req: express.Request, res: express.Response) => {
	database.query("select name from users", (err: Error, result: any) => {
			if (err) {
				throw err;
			}

			console.log(result.rows);
			res.json(result.rows);
			res.send();
		}
	);
});

// get specific userid
router.get("/:username", (req: express.Request, res: express.Response) => {
	let username = req.params.username;
	database.query("select id from users where name = '" + username + "';", (err: Error, result: any) => {
			if (err) {
				throw err;
			}
			console.log(result.rows);
			res.json(result.rows);
			res.send();
		}
	);
});

// create a user with password
router.post("/create", (req: express.Request, res: express.Response) => {
	let username = req.body.username;
	let password = req.body.password;

	authenticator.createHash(password, (hash) => {
		let sql = "INSERT INTO users(name, hash, admin) VALUES('" + username +
		"','" + hash + "',false);";
		console.log(sql);
		database.query(sql, (err: Error, result: any) => {
			if (err) {
				throw err;
			}
			res.json(result.rows);
			res.send();
		});
	});
});

export = router;