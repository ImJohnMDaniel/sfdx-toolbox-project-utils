import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { MetadataApiDeploy } from '@salesforce/source-deploy-retrieve/lib/src/index';
import { FlagsConfig } from "@salesforce/command";

/*
    
 */
export default class ForceMdapiDeploy extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = {}; // MetadataApiDeploy.flagsConfig;

    public async run(): Promise<AnyJson> {

        this.ux.log('MDAPI deploy to scratch org ' + this.orgAlias);

        const args = [];

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        // const metadataApiDeployResultJson = await MetadataApiDeploy.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceMdapiDeploy';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}