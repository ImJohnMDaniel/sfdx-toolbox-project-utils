import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Initialization from '../project/stage/initialization';
import Processresources from './stage/processresources';
import Compilation from './stage/compilation';
import Testing from './stage/testing';
import Validation from './stage/validation';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-build');

export default class Build extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    protected static flagsConfig = {
        // prompt: flags.boolean({ char: 'p', default: false, required: false, description: messages.getMessage('flagPromptDescription') })
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = false;

    // Comment this out if your command does not require a hub org username
    protected static requiresDevhubUsername = true;

    // If true, then the command supported the parameter of specifying the hub org username
    protected static supportsDevhubUsername = true;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {
        this.ux.log('TODO Need to implement toolbox:project:build command');

        // TODO: Figure out how to check for a build marker and advance to that point in the process

        // call the validation stage
        const validationStageArgs = [];
        await Validation.run(validationStageArgs);

        // call the initialization stage
        const initializationStageArgs = [];
        await Initialization.run(initializationStageArgs);

        // call the Processresources stage
        const processresourcesStageArgs = [];
        await Processresources.run(processresourcesStageArgs);

        // call the Compilation stage
        const compilationArgs = [];
        await Compilation.run(compilationArgs);

        // call the Testing stage
        const testingStageArgs = [];
        await Testing.run(testingStageArgs);

        return;
    }
}
