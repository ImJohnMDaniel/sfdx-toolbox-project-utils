import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as _ from 'lodash';
import InitizalizationStage from '../../../../shared/buildstages/initialization';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-stage-initialization');
export default class Initialization extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    protected static flagsConfig = {
        // prompt: flags.boolean({ char: 'p', default: false, required: false, description: messages.getMessage('flagPromptDescription') })
        // targetusername: flags.string({ char: 'u', required: true, description: 'username or alias for the target org; overrides default target org'})
    };

    // Comment this out if your command does not require an org username
    protected static requiresUsername = false;
    protected static supportsUsername = true;

    // Comment this out if your command does not require a hub org username
    protected static requiresDevhubUsername = true;

    // If true, then the command supported the parameter of specifying the hub org username
    protected static supportsDevhubUsername = true;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {

        if ( ! this.flags.targetusername ) {
            throw Error('Flag targetusername is required.');
        }

        await new InitizalizationStage(await this.project.retrieveSfdxProjectJson(), this.flags.targetusername, this.ux).run();

        return;
    }
}
