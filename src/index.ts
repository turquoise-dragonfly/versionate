import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Project } from './entity/project';

yargs(hideBin(process.argv))
.command('init', 'Init project', (yargs) => {
    return yargs;
}, async (argv) => {
    (new Project(process.cwd())).init();
})
.command('track path type location', 'Track a new file or update if currently tracked', (yargs) => {
    return yargs
    .positional('path', {
        describe: 'Ruta del fichero a añadir'
    })
    .positional('type', {
        describe: 'Tipo de fichero'
    })
    .positional('location', {
        describe: 'Localización de la versión'
    });
}, async (argv) => {
    (new Project(process.cwd())).track({
        path: String(argv.path),
        type: String(argv.type),
        location: String(argv.location)
    });
})

.command('untrack path', 'Track a new file or update if currently tracked', (yargs) => {
    return yargs
    .positional('path', {
        describe: 'Ruta del fichero a eliminar'
    });
}, async (argv) => {
    (new Project(process.cwd())).untrack(String(argv.path));
})
.option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
})
.parse();