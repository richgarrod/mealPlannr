/// <reference path="../../_all.d.ts" />
"use strict";

module Config {
	export class Config {
		public host: string;
		public database: string;
		public user: string;
		public port: number;
		public password: string;

		constructor()
		{
			this.host = 'ec2-54-228-219-2.eu-west-1.compute.amazonaws.com',
			this.database = 'dakueprvkrm577',
			this.user = 'sprfsncbokndzj',
			this.port = 5432,
			this.password = '5UiwGMtJ5TL7EC8i2f5FvA2S0h'
		}
	}
}

export = Config