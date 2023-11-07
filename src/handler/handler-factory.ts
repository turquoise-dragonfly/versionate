import { VersionFile } from "../entity/project.js";
import { Handler } from "./handler.js";
import { JsonHandler } from "./json-handler.js";
import { PropertiesHandler } from "./properties-handler.js";
import { TsHandler } from "./ts-handler.js";
import { XmlHandler } from "./xml-handler.js";

export class HandlerFactory {
    static get(file: VersionFile): Handler {
        switch (file.type) {
            case 'json':
                return new JsonHandler(file);
            case 'xml':
                return new XmlHandler(file);
            case 'properties':
                return new PropertiesHandler(file);
            case 'ts':
                return new TsHandler(file);
            default:
                throw Error('Unable to dinf handler for this type of file');
        }
    }
}