import jsonpath from "jsonpath";
import { Handler } from "./handler";

export class JsonHandler extends Handler {
    set(version: string): Handler{
        const json = JSON.parse(this.input);
        jsonpath.apply(json, this.file.location, () => version);
        this.output = JSON.stringify(json, null, 2);
        return this;
    }
}