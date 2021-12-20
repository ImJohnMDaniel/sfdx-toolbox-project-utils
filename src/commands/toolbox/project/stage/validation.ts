import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Utils from '../../../../shared/utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-stage-validation');

export default class Validation extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    public static flagsConfig: FlagsConfig = {
        ...Utils.flagsCommonConfig()
    };

    // Command doesn't required username
    protected static requiresUsername = false;

    // Command doesn't support username
    protected static supportsUsername = false;

    // Comment this out if your command does not require a hub org username
    protected static requiresDevhubUsername = false;

    // If true, then the command supported the parameter of specifying the hub org username
    protected static supportsDevhubUsername = false;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {
        this.ux.log('TODO Need to implement toolbox:project:stage:validation command');

        return;
    }
}
