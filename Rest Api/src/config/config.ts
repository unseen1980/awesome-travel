import { sync } from "glob";
import { union } from "lodash";

export default class Config {
	public static port : number = 3000;
	public static routes : string = "./src/routes/**/*.ts";

	public static globFiles(location : string) : Array<string> {
		return union([], sync(location));
	}
}