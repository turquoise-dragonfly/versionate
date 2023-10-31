import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { string } from "yargs";

export interface VersionFile {
    path: string;
    type: string;
    location: string;
}

export class Project {
    file: string = '';
    files: VersionFile[] = [];

    constructor(dirPath: string) {
        this.file = path.resolve(dirPath ?? process.cwd(), '.versionate');
        if (existsSync(this.file)) {
            const content = JSON.parse(readFileSync(this.file, 'utf8'));
            this.files = content.files;
        }
    }

    init() {
        if (existsSync(this.file)) {
            throw Error('Ya existe un proyecto en esta ubicación');
        }
        this.save();
    }

    track(file: VersionFile) {
        file.path = path.resolve(file.path);
        if (!existsSync(file.path)) {
            throw Error('El fichero no existe');
        }
        if (this.files.find(f => f.path === file.path)) {
            throw Error('El fichero ya está siendo gestionado');
        }
        this.files.push(file);
        this.save();
        console.debug('Fichero de versión añadido al proyecto');
    }

    untrack(filePath: string) {
        this.files = this.files.filter(f => f.path !== path.resolve(filePath));
        this.save();
    }

    private save() {
        writeFileSync(this.file, JSON.stringify({
            "files": this.files
        }));
    }
}