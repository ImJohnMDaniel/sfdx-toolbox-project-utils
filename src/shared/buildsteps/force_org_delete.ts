import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { Delete } from '@salesforce/plugin-org/lib/commands/force/org/delete'
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    mark a scratch or sandbox org for deletion

    USAGE
        $ sfdx force:org:delete [-p] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -p, --noprompt                                                                    no prompt to confirm deletion
        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org
        -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub org; overrides default dev hub org
        --apiversion=apiversion                                                           override the api version used for api requests made by this command
        --json                                                                            format output as json
        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation

    DESCRIPTION
        To mark the org for deletion without being prompted to confirm, specify --noprompt.

    Examples:
        $ sfdx force:org:delete -u me@my.org
        $ sfdx force:org:delete -u MyOrgAlias -p
 */
export default class ForceOrgDelete extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Deleting existing scratch org ' + this.orgAlias);

        const args = [];

        args.push('--noprompt');

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, args, true);
        
        await Delete.run(args);

        return;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceOrgDelete';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Delete.flagsConfig;
    }
}
