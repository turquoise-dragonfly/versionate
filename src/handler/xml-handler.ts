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
    set(version: string): Handler {
        const xml = (new XMLParser(OPTIONS)).parse(this.input);
        jsonpath.apply(xml, this.file.location, () => version);
        this.output = (new XMLBuilder(OPTIONS)).build(xml);
        return this;
    }
}