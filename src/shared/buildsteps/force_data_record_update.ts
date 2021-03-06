import { FlagsConfig } from '@salesforce/command';
import Update from '@salesforce/plugin-data/lib/commands/force/data/record/update';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    updates a single record

    USAGE
        $ sfdx force:data:record:update -s <string> -v <string> [-i <id> | -w <string>] [-t] [--perflog --json] [-u <string>] [--apiversion <string>] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -i, --sobjectid=sobjectid                                                         the ID of the record you’re updating
        -s, --sobjecttype=sobjecttype                                                     (required) the sObject type of the record you’re updating
        -t, --usetoolingapi                                                               update the record with Tooling API
        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org
        -v, --values=values                                                               (required) the <fieldName>=<value> pairs you’re updating
        -w, --where=where                                                                 a list of <fieldName>=<value> pairs to search for
        --apiversion=apiversion                                                           override the api version used for api requests made by this command
        --json                                                                            format output as json
        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation
        --perflog                                                                         get API performance data

    DESCRIPTION
        The format of a field-value pair is <fieldName>=<value>.
        Enclose all field-value pairs in one set of double quotation marks, delimited by spaces.
        Enclose values that contain spaces in single quotes.

        To get data on API performance metrics, specify both --perflog and --json.

    EXAMPLES
        sfdx force:data:record:update -s Account -i 001D000000Kv3dl -v "Name=NewAcme"
        sfdx force:data:record:update -s Account -w "Name='Old Acme'" -v "Name='New Acme'"
        sfdx force:data:record:update -s Account -i 001D000000Kv3dl -v "Name='Acme III' Website=www.example.com"
        sfdx force:data:record:update -t -s TraceFlag -i 7tf170000009cUBAAY -v "ExpirationDate=2017-12-01T00:58:04.000+0000"
        sfdx force:data:record:update -s Account -i 001D000000Kv3dl -v "Name=NewAcme" --perflog --json
 */

export default class ForceDataRecordUpdate extends AbstractBuildStep {
   public async run(): Promise<AnyJson> {

        this.ux.log('Performing data record update on ' + this.params.sobjecttype + ' SObject');

        if (this.params.sobjectid) {
            this.args.push('--sobjectid');
            this.args.push(`${this.params.sobjectid}`);
        }

        if (this.params.sobjecttype) {
            this.args.push('--sobjecttype');
            this.args.push(`${this.params.sobjecttype}`);
        }

        if (this.params.usetoolingapi) {
            this.args.push('--usetoolingapi');
        }

        if (this.params.values) {
            this.args.push('--values');
            this.args.push(`${this.params.values}`);
        }

        if (this.params.where) {
            this.args.push('--where');
            this.args.push(`${this.params.where}`);
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);

        const dataRecordUpdateResultJson = await Update.run(this.args);

        if (dataRecordUpdateResultJson === undefined) {
            // there was a problem
            throw Error('Data Record Update attempt was unsuccessful.');
        }

        return dataRecordUpdateResultJson;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceDataRecordUpdate';
    }
    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Update.flagsConfig;
    }
}
