"use strict";
const crypto = require("crypto");
const db = require("./database");
var Auth;
(function (Auth) {
    class AuthService {
        constructor() {
            this.createHash = (password, callback) => {
                let salt = crypto.randomBytes(20).toString("hex");
                crypto.pbkdf2(password, salt, 500, 50, "sha512", (err, derivedKey) => {
                    if (err) {
                        throw err;
                    }
                    callback(salt + "." + derivedKey.toString("hex"));
                });
            };
            this.checkPassword = (username, password, callback) => {
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
            this.checkSession = (sessionId, callback) => {
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
            this.setSession = (username, userId, callback) => {
                let session = crypto.randomBytes(30).toString("hex");
                this.db.query("DELETE FROM user_sessions WHERE id = " + userId + ";", (err, result) => {
                    if (err) {
                        throw err;
                    }
                    this.db.query("INSERT INTO user_sessions(id, session) VALUES (" + userId + ",'" + session + "');", (err, result) => {
                        if (err) {
                            throw err;
                        }
                        callback(session);
                    });
                });
            };
            this.db = new db.Database();
        }
        ;
    }
    Auth.AuthService = AuthService;
})(Auth || (Auth = {}));
module.exports = Auth;
