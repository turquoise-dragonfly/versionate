import { Handler } from "./handler";
import { PropertiesEditor } from "properties-file/editor";

export class PropertiesHandler extends Handler {
    set(version: string): Handler {
        const properties = new PropertiesEditor(this.input);
        properties.update(this.file.location, { newValue: version });
        this.output = properties.format();
        return this;
    }
}