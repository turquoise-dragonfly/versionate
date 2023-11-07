import { Handler } from "./handler.js";
import { PropertiesEditor } from "properties-file/editor";

export class PropertiesHandler extends Handler {
    properties: any;

    parse(): Handler {
        this.properties = new PropertiesEditor(this.input);
        return this;
    }

    version(): string {
        return this.properties.collection.find((property: any) => property.key === this.file.location).value;
    }
    
    set(version: string): Handler {
        this.properties.update(this.file.location, { newValue: version });
        this.output = this.properties.format();
        return this;
    }
}