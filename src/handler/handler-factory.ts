import { VersionFile } from "../entity/project";
import { Handler } from "./handler";
import { JsonHandler } from "./json-handler";
import { PropertiesHandler } from "./properties-handler";
import { TsHandler } from "./ts-handler";
import { XmlHandler } from "./xml-handler";

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