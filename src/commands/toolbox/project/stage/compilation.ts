import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import CompilationStage from '../../../../shared/buildstages/compilation';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-stage-compilation');

export default class Compilation extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    //   public static args = [{name: 'file'}];

    protected static flagsConfig = {
        // prompt: flags.boolean({ char: 'p', default: false, required: false, description: messages.getMessage('flagPromptDescription') })
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
        await new CompilationStage(await this.project.retrieveSfdxProjectJson(), this.ux, this.flags).run();

        return;
    }
}
