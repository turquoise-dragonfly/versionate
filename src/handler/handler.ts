import { readFileSync, writeFileSync } from "fs";
import { VersionFile } from "../entity/project.js";
import path from "path";

export abstract class Handler {
    file: VersionFile;
    input: string;
    output: string;

    constructor(file: VersionFile) {
        this.file = file;
        this.output = this.input = readFileSync(path.resolve(this.file.path), 'utf8');
    }

    abstract parse(): Handler;

    abstract version(): string;

    abstract set(version: string): Handler;

    save(): void {
        writeFileSync(this.file.path, this.output);
    }
}