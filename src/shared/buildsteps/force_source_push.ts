import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { SourcePushCommand } from 'salesforce-alm/dist/commands/force/source/push';
import { FlagsConfig } from "@salesforce/command";

/*
    
 */
export default class ForceSourcePush extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = SourcePushCommand.flagsConfig;

    public async run(): Promise<AnyJson> {

        this.ux.log('Source push to scratch org ' + this.orgAlias);

        const args = [];

        // FORCEOVERWRITE
        if (this.params.forceoverwrite) {
            args.push('--forceoverwrite');
        }

        // IGNOREWARNINGS
        if (this.params.ignorewarnings) {
            args.push('--ignorewarnings');
        }

        // WAIT
        if (this.params.wait) {
            args.push('--wait');
            args.push(`${this.params.wait}`)
        }

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        const sourcePushResultJson = await SourcePushCommand.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceSourcePush';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}