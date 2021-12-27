import { FlagsConfig, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import ProcessResourcessStage from '../../../../shared/buildstages/process_resources';
import Utils from '../../../../shared/utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-stage-processresources');

export default class Processresources extends SfdxCommand {

    public static description = messages.getMessage('commandDescription');

    public static examples = [messages.getMessage('examplesDescription')];

    public static flagsConfig: FlagsConfig = {
        // prompt: flags.boolean({ char: 'p', default: false, required: false, description: messages.getMessage('flagPromptDescription') })

        ...ProcessResourcessStage.flagsFromCommand(),
        ...Utils.flagsCommonConfig(),
        ...Utils.flagScopeDefault(false),
        ...{ }
        /*
            this is simply the corresponding ProcessResourcessStage class quickly accessing all of the build steps in that 
            stage and then finding those build step classes to add the contents from the getFlagsConfig() method.
        */
    };

    /*
    protected static flagsConfig: FlagsConfig = {
            ...Validation.flagsConfig
            , ...Initialization.flagsConfig
            , ...Processresources.flagsConfig
            , ...Compilation.flagsConfig
            , ...Testing.flagsConfig
            , ...{ scope: flags.enum({ default: Utils.buildStepScopesDefault(), required: false, description: Utils.getCommonFlagMessages(), options: Utils.buildStepScopes() })}
        };
    */

    // Comment this out if your command does not require an org username
    protected static requiresUsername = true;

    // Comment this out if your command does not require a hub org username
    protected static requiresDevhubUsername = true;

    // If true, then the command supported the parameter of specifying the hub org username
    protected static supportsDevhubUsername = true;

    // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
    protected static requiresProject = true;

    public async run(): Promise<AnyJson> {
        await new ProcessResourcessStage(this.ux, this.flags).run();

        return;
    }
}
