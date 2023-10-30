import { existsSync, writeFileSync } from "fs";
import path from "path";

export class Project {
    file: string = '';

    constructor(dirPath: string) {
        this.file = path.resolve(dirPath ?? process.cwd(), '.versionate');

        if (existsSync(this.file)) {
            throw Error('Ya existe un proyecto en esta ubicación');
        }

        writeFileSync(this.file, '{}');
    }
}