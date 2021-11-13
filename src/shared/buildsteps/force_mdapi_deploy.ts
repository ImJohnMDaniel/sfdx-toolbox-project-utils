import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { MdapiDeployCommand } from 'salesforce-alm/dist/commands/force/mdapi/deploy';
import { FlagsConfig } from "@salesforce/command";

/*
    
 */
export default class ForceMdapiDeploy extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = MdapiDeployCommand.flagsConfig;

    public async run(): Promise<AnyJson> {

        this.ux.log('MDAPI deploy to scratch org ' + this.orgAlias);

        const args = [];

        // CHECKONLY
        if (this.params.checkonly) {
            args.push('--checkonly');
        }

        // DEPLOYDIR
        if (this.params.deploydir) {
            args.push('--deploydir');
            args.push(`${this.params.deploydir}`);
        }

        // ZIPFILE
        if (this.params.zipfile) {
            args.push('--zipfile');
            args.push(`${this.params.zipfile}`);
        }

        // IGNOREWARNINGS
        if (this.params.ignorewarnings) {
            args.push('--ignorewarnings');
        }

        // TESTLEVEL
        if (this.params.testlevel) {
            args.push('--testlevel');
            args.push(`${this.params.testlevel}`);
        }

        // IGNOREERRORS
        if (this.params.ignoreerrors) {
            args.push('--ignoreerrors');
        }

        // VALIDATEDDEPLOYREQUESTID
        if (this.params.validateddeployrequestid) {
            args.push('--validateddeployrequestid');
            args.push(`${this.params.validateddeployrequestid}`);
        }

        // RUNTESTS
        if (this.params.runtests) {
            args.push('--runtests');
            args.push(`${this.params.runtests}`);
        }

        // SINGLEPACKAGE
        if (this.params.singlepackage) {
            args.push('--singlepackage');
        }

        // WAIT
        args.push('--wait');
        if (this.params.wait) {
            args.push(`${this.params.wait}`);
        } else {
            args.push('10');
        }

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        const mdapiDeployResultJson = await MdapiDeployCommand.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceMdapiDeploy';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}