import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
// import { OrgDeleteCommand } from 'salesforce-alm/dist/commands/force/org/delete';
import { FlagsConfig } from "@salesforce/command";

/*
    
 */
export default class ForceSourcePush extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = OrgDeleteCommand.flagsConfig;

    public async run(): Promise<AnyJson> {

        this.ux.log('Source push to scratch org ' + this.orgAlias);

        const args = [];

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        const orgCreationResultJson = await OrgDeleteCommand.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceSourcePush';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}