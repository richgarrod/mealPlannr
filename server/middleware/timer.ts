/// <reference path="../../_all.d.ts" />
"use strict";

var dateformat = require("dateformat");

import * as express from "express";

let router: express.Router;

router = express.Router();

router.use(function timeLog(req: express.Request, res: express.Response, next: express.NextFunction) {
	let date = Date.now();
    console.log("Time: ", dateformat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
	next();
});

export = router;