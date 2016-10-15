/// <reference path="../../_all.d.ts" />
"use strict";

import * as pg from "pg";

import * as config from "../../resources/config/dev.config";

module DB {
  export class Database {
    private client: pg.Client;
    private config: config.Config;

    constructor() {
      this.config = new config.Config();

      this.client = new pg.Client({
        user: this.config.user,
        database: this.config.database,
        host: this.config.host,
        password: this.config.password,
        port: this.config.port,
        ssl: true
      });
    }

    query = (queryString: string, callback: any) => {
      this.client.connect((err: Error) => {
        if (err) {
          throw err;
        }
        // execute a query on our database
        this.client.query(queryString, callback);
      });
    }
  }
}

export = DB;
