import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { HandlerFactory } from "../handler/handler-factory.js";
import { Versioner } from "../tool/versioner.js";

export interface VersionFile {
    path: string;
    type: string;
    location: string;
    version?: string;
}

export class Project {
    file: string = '';
    files: VersionFile[] = [];
    currentVersion: Map<string, number> = new Map();

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
        this.files = this.files.filter(f => f.path !== filePath);
        this.save();
    }

    setVersion(version: string) {
        this.files.forEach(file => {
            console.log(`Updating version in file ${file.path}`);
            HandlerFactory.get(file).parse().set(version).save();
        });
    }

    incrementVersion(fragment: string) {
        // Refresca las versiones de cada fichero.
        this.getVersion();
        // Si hay varias versiones, muestra un error.
        if (this.currentVersion.size > 1) {
            throw Error('Multiple versions found!!');
        }
        const versioner = new Versioner(this.currentVersion.entries().next().value[0]);
        this.setVersion(versioner.bump(fragment).get());
    }

    getVersion() {
        this.files.forEach(file => {
            file.version = HandlerFactory.get(file).parse().version();
            const version = this.currentVersion.get(file.version);
            if (version) {
                this.currentVersion.set(file.version, version + 1);
            }
            else {
                this.currentVersion.set(file.version, 1);
            }
        });
    }

    showVersion(verbose: boolean = false) {
        // Refresca las versiones de cada fichero.
        this.getVersion();
        // Comprueba si son todas iguales.
        if (this.currentVersion.size === 1) {
            console.info(`Current version: ${this.currentVersion.entries().next().value[0]}`);

            if (verbose) {
                console.info('Synchronized files::');
                this.files.forEach(file => {
                    console.info(`  * ${file.version} (${file.path})`);
                });
            }
        }
        // Si no, muestra un error.
        else {
            console.error('Files do not have the version number synchronized!!');
            console.info('Consider using the set command to synchronize versions across all files.');
            console.error('Versions found:');
            this.currentVersion.forEach((count, version) => {
                console.error(`  * ${version} (${count} files)`);
            });

            if (verbose) {
                console.error('Details:');
                this.files.forEach(file => {
                    console.error(`  * ${file.version} (${file.path})`);
                });
            }
        }
    }

    private save() {
        writeFileSync(this.file, JSON.stringify({
            "files": this.files
        }));
    }
}