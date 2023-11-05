import jsonpath from "jsonpath";
import { Handler } from "./handler";

export class JsonHandler extends Handler {
    json: any;

    parse(): Handler {
        this.json = JSON.parse(this.input);
        return this;
    }

    version(): string {
        return jsonpath.query(this.json, this.file.location).toString();
    }

    set(version: string): Handler{
        jsonpath.apply(this.json, this.file.location, () => version);
        this.output = JSON.stringify(this.json, null, 2);
        return this;
    }
}