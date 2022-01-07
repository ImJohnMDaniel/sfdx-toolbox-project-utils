import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { MdapiDeployCommand } from 'salesforce-alm/dist/commands/force/mdapi/deploy';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*

 */
export default class ForceMdapiDeploy extends AbstractBuildStep {

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

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, args);
        
        const mdapiDeployResultJson = await MdapiDeployCommand.run(args);

        if (mdapiDeployResultJson === undefined) {
            // there was a problem
            throw Error('MDAPI Deploy Command attempt was unsuccessful.');
        }

        return mdapiDeployResultJson;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceMdapiDeploy';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return MdapiDeployCommand.flagsConfig;
    }
}
