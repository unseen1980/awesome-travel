import * as express from "express";
import * as fs from "fs";
import * as path from "path";

let filePath = path.join(__dirname, "../data/");
let airports = fs.readFileSync(filePath + "airports_by_IATA.json", "utf8");

export default class IndexRoute {
	constructor(app: express.Express) {
		IndexRoute.activate(app);
	}

	public static activate(app: express.Express): void {
		app.route("/api")
			.get((req: express.Request, res: express.Response, next: Function): void => {
				res.json(JSON.parse(airports));
			});
	};
}
