import { FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { BuildStepScope } from '../../../shared/build_step_scopes';
import Utils from '../../../shared/utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-dataload');

export default class Dataload extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    protected static flagsConfig: FlagsConfig = {
        // prompt: flags.boolean({ char: 'p', default: false, required: false, description: messages.getMessage('flagPromptDescription') })
        ...Utils.flagsCommonConfig(),
        ...Utils.flagScope(BuildStepScope.DATALOAD)
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
        this.ux.log('TODO Need to implement toolbox:project:dataload command');

        return;
    }
}
