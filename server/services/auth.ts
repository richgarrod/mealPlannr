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

    public createHash = (password: string, callback: Function) => {
        let salt = crypto.randomBytes(20).toString("hex");
        crypto.pbkdf2(password, salt, 500, 50, "sha512", (err, derivedKey) => {
            if (err) {
                throw err;
            }
            callback(salt + "." + derivedKey.toString("hex"));
        });
    };

    public checkPassword = (username: string, password: string, callback: Function) => {
        this.db.query("SELECT id, hash FROM users WHERE name = '" + username + "';", (err, result) => {
            if (err) {
                throw err;
            }

            let salt = result.rows[0].hash.split(".")[0];
            let hash = result.rows[0].hash.split(".")[1].trim();
            let newHash = crypto.pbkdf2Sync(password, salt, 500, 50, "sha512").toString("hex").trim();
            let id = hash === newHash ? result.rows[0].id : null;
            callback(id);
        });
    };

    public checkSession = (sessionId: string, callback: Function) => {
        console.log(sessionId);
        this.db.query("SELECT id FROM user_sessions WHERE session = '" + sessionId + "'", (err, result) => {
            if (err) {
                throw err;
            }
            console.log(result.rows);
            let userId = result.rows.length > 0 ? result.rows[0].id : null;
            callback(userId);
        });
    };

    public setSession = (username: string, userId: number, callback: Function) => {
        let session = crypto.randomBytes(30).toString("hex");
        this.db.query("DELETE FROM user_sessions WHERE id = " + userId + ";",
            (err, result) => {
                if (err) {
                    throw err;
                }
                this.db.query("INSERT INTO user_sessions(id, session) VALUES (" + userId + ",'" + session + "');",
                    (err, result) => {
                        if (err) {
                            throw err;
                        }
                        callback(session);
                });
        });
    }

  }
}

export = Auth;
