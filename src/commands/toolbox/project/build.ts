import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import Initialization from '../project/stage/initialization';
import Processresources from './stage/processresources';
import Compilation from './stage/compilation';
import Testing from './stage/test';
import Validation from './stage/validation';
import { string } from '@oclif/parser/lib/flags';

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

    // May bring this back as the "build" command's flags become more apparent
    // private prepareArgs(): any {
    //     const args = [];

    //     targetusername needs to be either the value supplied on the 
    //          targetusername flag or the value supplied on the
    //          config:list for defaultusername
    //     args.push('--targetusername');
    //     args.push(`${this.flags.setalias}`);

    //     args.push('--setalias');
    //     args.push(`${this.flags.setalias}`);
    //     args.push(`${this.org.getUsername()}`);

    //     return args;
    // }

    public async run(): Promise<AnyJson> {

        // call the validation stage
        const validationStageArgs = [];
        await Validation.run(validationStageArgs);

        // call the initialization stage
        const initializationStageArgs = [];
        initializationStageArgs.push('--setalias');
        initializationStageArgs.push(`${this.flags.setalias}`);

        if ( this.flags.setdefaultusername )
        {
            initializationStageArgs.push('--setdefaultusername');
            initializationStageArgs.push(`${this.flags.setdefaultusername}`);
        }
        await Initialization.run(initializationStageArgs);

        // // call the Processresources stage
        const processresourcesStageArgs = [];
        processresourcesStageArgs.push('--targetusername');
        processresourcesStageArgs.push(`${this.flags.setalias}`);
        await Processresources.run(processresourcesStageArgs);

        // call the Compilation stage
        const compilationArgs = [];
        compilationArgs.push('--targetusername');
        compilationArgs.push(`${this.flags.setalias}`);
        await Compilation.run(compilationArgs);

        // // TODO: Would the "testing" stage get called during a regular "project build"?  It would get called directly in a CI context, but what about a developer context?

        // call the Testing stage
        const testingStageArgs = [];
        testingStageArgs.push('--targetusername');
        testingStageArgs.push(`${this.flags.setalias}`);
        await Testing.run(testingStageArgs);

        return;
    }
}
