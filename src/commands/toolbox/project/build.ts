import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Initialization from '../project/stage/initialization';
import Processresources from './stage/processresources';
import Compilation from './stage/compilation';
import Testing from './stage/test';
import Validation from './stage/validation';
import { string } from '@oclif/parser/lib/flags';
import Utils from '../../../shared/utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-build');

export default class Build extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    protected static flagsConfig = {
        setalias: flags.string({ char: 'a', required: true, description: messages.getMessage('flagSetAliasDescription') }),
        setdefaultusername: flags.boolean({ char: 's', default: false, required: false, description: messages.getMessage('flagSetDefaultUsernameDescription') })
    };

    protected static requiresUsername = false;
    // The "toolbox:project:build" command would not support a username because it will be creating it in the initialization stage
    protected static supportsUsername = false;

    protected static requiresDevhubUsername = true;

    protected static supportsDevhubUsername = true;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {

        // call the validation stage
        const validationArgs = [];
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Validation.flagsConfig, validationArgs);
        await Validation.run(validationArgs);

        // call the initialization stage
        const initializationStageArgs = [];
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Initialization.flagsConfig, initializationStageArgs);
        await Initialization.run( initializationStageArgs );
        // const initializationResponse = await Initialization.run(initializationStageArgs);
        // console.log(initializationResponse);

        // call the Processresources stage
        const processresourcesStageArgs = [];
        processresourcesStageArgs.push('--targetusername');
        processresourcesStageArgs.push(`${this.flags.setalias}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Processresources.flagsConfig, processresourcesStageArgs);
        await Processresources.run(processresourcesStageArgs);

        // call the Compilation stage
        const compilationArgs = [];
        compilationArgs.push('--targetusername');
        compilationArgs.push(`${this.flags.setalias}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Compilation.flagsConfig, compilationArgs);
        await Compilation.run(compilationArgs);

        // TODO: Would the "testing" stage get called during a regular "project build"?  It would get called directly in a CI context, but what about a developer context?
        // call the Testing stage
        const testingStageArgs = [];
        testingStageArgs.push('--targetusername');
        testingStageArgs.push(`${this.flags.setalias}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Testing.flagsConfig, compilationArgs);
        await Testing.run(testingStageArgs);

        return;
    }
}
