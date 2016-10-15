"use strict";
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
var port = process.env.PORT || 3000;
const aboutRoute = require("./server/api/about");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    static bootstrap() {
        return new Server();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "client")));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    }
    routes() {
        let router;
        router = express.Router();
        router.use("/about", aboutRoute);
        this.app.use(router);
    }
}
var server = Server.bootstrap();
module.exports = server.app;
