import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { OrgDeleteCommand } from 'salesforce-alm/dist/commands/force/org/delete';
import { FlagsConfig } from "@salesforce/command";

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

    protected static flagsConfig: FlagsConfig = OrgDeleteCommand.flagsConfig;

    public async run(): Promise<AnyJson> {

        this.ux.log('Deleting existing scratch org ' + this.orgAlias);

        const args = [];

        args.push('--noprompt');

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        try {
            const orgCreationResultJson = await OrgDeleteCommand.run(args);
        }
        catch (e) {
            // noopt
        }

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceOrgDelete';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}