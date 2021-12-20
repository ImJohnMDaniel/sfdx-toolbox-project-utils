import { FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Utils from '../../../../shared/utils';
import Compilation from '../stage/compilation';
import Testing from '../stage/test';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-postpackage-deploy');

export default class Deploy extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    protected static flagsConfig: FlagsConfig = {
        ...Compilation.flagsConfig
        , ...Testing.flagsConfig
        , ...Utils.flagsCommonConfig()
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not require a hub org username
    protected static requiresDevhubUsername = false;

    // If true, then the command supported the parameter of specifying the hub org username
    protected static supportsDevhubUsername = false;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {

        // call the validation stage
        // const validationArgs = [];
        // Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Validation.flagsConfig, validationArgs);
        // await Validation.run(validationArgs);

        // call the Compilation stage
        const compilationArgs = [];
        compilationArgs.push('--targetusername');
        compilationArgs.push(`${this.flags.targetusername}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Compilation.flagsConfig, compilationArgs);
        await Compilation.run(compilationArgs);

        // call the Testing stage
        const testingStageArgs = [];
        testingStageArgs.push('--targetusername');
        testingStageArgs.push(`${this.flags.targetusername}`);
        Utils.filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(this.flags, Testing.flagsConfig, testingStageArgs);
        await Testing.run(testingStageArgs);

        return;
    }
}
