import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { Handler } from "./handler";
import jsonpath from "jsonpath";

const OPTIONS = {
    format: true,
    ignoreAttributes : false,
    allowBooleanAttributes: true,
    commentPropName: "#comment",
    // preserveOrder: true
};

export class XmlHandler extends Handler {
    xml: any;

    parse(): Handler {
        this.xml = (new XMLParser(OPTIONS)).parse(this.input);
        return this;
    }

    version(): string {
        return jsonpath.query(this.xml, this.file.location).toString(); 
    }

    set(version: string): Handler {
        jsonpath.apply(this.xml, this.file.location, () => version);
        this.output = (new XMLBuilder(OPTIONS)).build(this.xml);
        return this;
    }
}