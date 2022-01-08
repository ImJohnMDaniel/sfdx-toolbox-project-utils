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

        // CHECKONLY
        if (this.params.checkonly) {
            this.args.push('--checkonly');
        }

        // DEPLOYDIR
        if (this.params.deploydir) {
            this.args.push('--deploydir');
            this.args.push(`${this.params.deploydir}`);
        }

        // ZIPFILE
        if (this.params.zipfile) {
            this.args.push('--zipfile');
            this.args.push(`${this.params.zipfile}`);
        }

        // IGNOREWARNINGS
        if (this.params.ignorewarnings) {
            this.args.push('--ignorewarnings');
        }

        // TESTLEVEL
        if (this.params.testlevel) {
            this.args.push('--testlevel');
            this.args.push(`${this.params.testlevel}`);
        }

        // IGNOREERRORS
        if (this.params.ignoreerrors) {
            this.args.push('--ignoreerrors');
        }

        // VALIDATEDDEPLOYREQUESTID
        if (this.params.validateddeployrequestid) {
            this.args.push('--validateddeployrequestid');
            this.args.push(`${this.params.validateddeployrequestid}`);
        }

        // RUNTESTS
        if (this.params.runtests) {
            this.args.push('--runtests');
            this.args.push(`${this.params.runtests}`);
        }

        // SINGLEPACKAGE
        if (this.params.singlepackage) {
            this.args.push('--singlepackage');
        }

        // WAIT
        this.args.push('--wait');
        if (this.params.wait) {
            this.args.push(`${this.params.wait}`);
        } else {
            this.args.push('10');
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);
        
        const mdapiDeployResultJson = await MdapiDeployCommand.run(this.args);

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
