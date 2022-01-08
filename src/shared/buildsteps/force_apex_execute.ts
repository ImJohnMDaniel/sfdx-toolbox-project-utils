import { FlagsConfig } from '@salesforce/command';
import Execute from '@salesforce/plugin-apex/lib/commands/force/apex/execute';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

export default class ForceApexExecute extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Apex execution on scratch org ' + this.orgAlias);

        // APEXCODEFILE
        if (this.params.apexcodefile) {
            this.args.push('--apexcodefile');
            this.args.push(`${this.params.apexcodefile}`);
        } else {
            throw Error(this.getBuildStepTypeToken() + " requires the 'apexcodefile' flag.");
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);

        const apexExecuteResultJson = await Execute.run(this.args);

        if ( apexExecuteResultJson === undefined ) {
            // there was a problem
            throw Error('Apex Execute attempt was unsuccessful.');
        }

        return apexExecuteResultJson;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceApexExecute';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Execute.flagsConfig;
    }
}
