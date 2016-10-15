/// <reference path="../../_all.d.ts" />
"use strict";

import * as crypto from "crypto";
import * as db from "./database";

module Auth {
  export class AuthService {

    db: db.Database;

    constructor () {
        this.db = new db.Database();
    };

    public createHash = (password, callback) => {
        let salt = crypto.randomBytes(20).toString("hex");
        crypto.pbkdf2(password, salt, 500, 50, "sha512", (err, derivedKey) => {
            if (err) {
                throw err;
            }
            callback(salt + "." + derivedKey.toString("hex"));
        });
    };

    public checkPassword = (username, password, callback) => {
        this.db.query("SELECT hash FROM users WHERE name = '" + username + "';", (err, result) => {
            if (err) {
                throw err;
            }

            let salt = result.rows[0].hash.split(".")[0];
            let hash = result.rows[0].hash.split(".")[1].trim();
            let newHash = crypto.pbkdf2Sync(password, salt, 500, 50, "sha512").toString("hex").trim();
            let valid = hash === newHash;
            callback(valid);
        });
    };

  }
}

export = Auth;
