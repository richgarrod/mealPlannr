"use strict";
const pg = require("pg");
const config = require("../../resources/config/dev.config");
var DB;
(function (DB) {
    class Database {
        constructor() {
            this.query = (queryString, callback) => {
                this.client.query(queryString, callback);
            };
            this.config = new config.Config();
            this.client = new pg.Client({
                user: this.config.user,
                database: this.config.database,
                host: this.config.host,
                password: this.config.password,
                port: this.config.port,
                ssl: true
            });
            this.client.connect((err) => {
                if (err) {
                    throw err;
                }
            });
        }
        ;
    }
    DB.Database = Database;
})(DB || (DB = {}));
module.exports = DB;
