import { FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Utils from '../../../shared/utils';
import Compilation from './stage/compilation';
import Initialization from './stage/initialization';
import Processresources from './stage/processresources';
import Testing from './stage/test';
import Validation from './stage/validation';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-build');

export default class Build extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    // protected static flagsConfig = {
    //     setdefaultusername: flags.boolean({ char: 's', default: false, required: true, description: messages.getMessage('flagSetDefaultUsernameDescription') }),
    //     setalias: flags.string({ char: 'a', required: true, description: messages.getMessage('flagSetAliasDescription') }),
    //     scope: flags.enum({ default: Utils.buildStepScopesDefault(), required: false, description: Utils.getCommonFlagMessages(), options: Utils.buildStepScopes() })
    // };

    protected static flagsConfig: FlagsConfig = {
        ...Validation.flagsConfig
        , ...Initialization.flagsConfig
        , ...Processresources.flagsConfig
        , ...Compilation.flagsConfig
        , ...Testing.flagsConfig
        , ...Utils.flagsCommonConfig()
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
        await Initialization.run(initializationStageArgs);

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

        // call the Testing stage
        const testingStageArgs = [];
        testingStageArgs.push('--targetusername');
        testingStageArgs.push(`${this.flags.setalias}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Testing.flagsConfig, testingStageArgs);
        await Testing.run(testingStageArgs);

        return;
    }
}
