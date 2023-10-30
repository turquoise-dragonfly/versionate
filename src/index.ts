import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Project } from './entity/project';

yargs(hideBin(process.argv))
.command('init', 'Init project', (yargs) => {
    return yargs;
}, async (argv) => {
    new Project(process.cwd());
})
.option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
})
.parse();