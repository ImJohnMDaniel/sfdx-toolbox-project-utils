import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import Execute from "@salesforce/plugin-apex/lib/commands/force/apex/execute";
import { flags, FlagsConfig } from "@salesforce/command";

export default class ForceApexExecute extends AbstractBuildStep {

    // Since the current version of the force:apex:execute command has the flagsConfig variable
    //      as protected, we can't access it here like we can other classes.  So we will
    //      workaround it for now.
    // protected static flagsConfig: FlagsConfig = Execute.flagsConfig;
    protected static flagsConfig: FlagsConfig = { 
        // TODO: implement these flags
        // apexcodefile: flags.Discriminated<flags.Option<string>>;
        apexcodefile: flags.string({ char: 'f', required: false, description: 'path to a local file that contains Apex code' }),
        // loglevel: flags.Discriminated<flags.Enum<string>>;
        // apiversion: flags.Builtin;
    }

    public async run(): Promise<AnyJson> {

        const args = [];

        // ORG ALIAS
        if (this.orgAlias) {
            args.push('--targetusername');
            args.push(`${this.orgAlias}`);
        }

        if (this.params.apexcodefile) {
            args.push('--apexcodefile');
            args.push(`${this.params.apexcodefile}`);
        }
        else {
            throw Error(this.getBuildStepTypeToken() + " requires the 'apexcodefile' flag.");
        }
        
        const apexExecuteResultJson = await Execute.run(args);

        if ( apexExecuteResultJson == undefined ) {
            // there was a problem with the apex execute step
            throw Error('Apex Execute attempt was unsuccessful.');
        }

        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceApexExecute';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}