import { flags, FlagsConfig } from '@salesforce/command';
import Execute from '@salesforce/plugin-apex/lib/commands/force/apex/execute';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';

export default class ForceApexExecute extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Apex execution on scratch org ' + this.orgAlias);
        const args = [];

        // ORG ALIAS
        if (this.orgAlias) {
            args.push('--targetusername');
            args.push(`${this.orgAlias}`);
        }

        // APEXCODEFILE
        if (this.params.apexcodefile) {
            args.push('--apexcodefile');
            args.push(`${this.params.apexcodefile}`);
        } else {
            throw Error(this.getBuildStepTypeToken() + " requires the 'apexcodefile' flag.");
        }

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        const apexExecuteResultJson = await Execute.run(args);

        if ( apexExecuteResultJson === undefined ) {
            // there was a problem with the apex execute step
            throw Error('Apex Execute attempt was unsuccessful.');
        }

        return;
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
