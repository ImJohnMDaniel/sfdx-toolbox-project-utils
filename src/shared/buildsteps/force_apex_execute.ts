import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import Execute from "@salesforce/plugin-apex/lib/commands/force/apex/execute";
import { flags, FlagsConfig } from "@salesforce/command";

export default class ForceApexExecute implements BuildStep {

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

    private params: any;
    public async run(): Promise<AnyJson> {

        const args = [];
        
        const apexExecuteResultJson = await Execute.run(args);

        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceApexExecute';
    }
    
    public setParams(params: any) {
        this.params = params;
    }

    public getSFDXProjectConfigureExample(): string {
        return ''
    }

    // validateParams(): boolean {
    //     throw new Error("Method not implemented.");
    // }
}