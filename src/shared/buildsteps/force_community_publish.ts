import { FlagsConfig } from '@salesforce/command';
import { CommunityPublishCommand } from '@salesforce/plugin-community/lib/commands/force/community/publish';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    publishes an Experience Builder site to make it live

    USAGE
        $ sfdx force:community:publish -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
                    trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -n, --name=name                                                                 (required) name of the Experience Builder site to
                                                                                            publish

        -u, --targetusername=targetusername                                               username or alias for the target org; overrides
                                                                                            default target org

        --apiversion=apiversion                                                           override the api version used for api requests
                                                                                            made by this command

        --json                                                                            format output as json

        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command
                                                                                            invocation

    DESCRIPTION
        When you publish an Experience Builder site for the first time, you make the site’s URL live and enable login access for site 
        members.

        Additionally, to send a welcome email to all site members, you must activate the site. (Activation is also required to successfully
        set up SEO for Experience Builder sites.) To activate a site, update the status field of the Network type in the Metadata API. 
        Alternatively, in Experience Workspaces, go to Administration | Settings, and click Activate.

        Subsequently, each time you publish the site, you update the live site with all changes made to the site since it was last 
        published.

        An email notification informs you when your changes are live.

    Example:
        $ sfdx force:community:publish --name "My Customer Site"
 */
export default class ForceCommunityPublish extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Publishing community to scratch org ' + this.orgAlias);

        const args = [];

        // NAME
        if (this.params.name) {
            args.push('--name');
            args.push(`${this.params.permsetname}`);
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, args);

        await CommunityPublishCommand.run(args);

        return;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceCommunityPublish';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return CommunityPublishCommand.flagsConfig;
    }
}
