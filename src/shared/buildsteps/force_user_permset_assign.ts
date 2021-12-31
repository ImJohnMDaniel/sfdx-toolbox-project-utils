import { FlagsConfig } from '@salesforce/command';
import { UserPermsetAssignCommand } from '@salesforce/plugin-user/lib/commands/force/user/permset/assign';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    assign a permission set to one or more users of an org

    USAGE
        $ sfdx force:user:permset:assign -n <array> [-o <array>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
            trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -n, --permsetname=permsetname                                                       (required) comma-separated list of permission sets to assign

        -o, --onbehalfof=onbehalfof                                                         comma-separated list of usernames or aliases to assign the permission set to

        -u, --targetusername=targetusername                                                 username or alias for the target org; overrides default target org

        --apiversion=apiversion                                                             override the api version used for api requests made by this command

        --json                                                                              format output as json

        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)    [default: warn] logging level for this command invocation

    DESCRIPTION
        To specify an alias for the -u or -o parameter, use the username alias you set with the "alias:set" CLI command, not the User.Alias value of the
        org user.

    EXAMPLES
        sfdx force:user:permset:assign -n "DreamHouse, LargeDreamHouse"
        sfdx force:user:permset:assign -n DreamHouse -u me@my.org
        sfdx force:user:permset:assign -n DreamHouse -o "user1@my.org,user2,user3"
 */
export default class ForceUserPermsetAssign extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Permset assignment to scratch org ' + this.orgAlias);

        const args = [];

        // PERMSETNAME
        if (this.params.permsetname) {
            args.push('--permsetname');
            args.push(`${this.params.permsetname}`);
        }

        // ONBEHALFOF
        if (this.params.onbehalfof) {
            args.push('--onbehalfof');
            args.push(`${this.params.onbehalfof}`);
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, args);

        await UserPermsetAssignCommand.run(args);

        return;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceUserPermsetAssign';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return UserPermsetAssignCommand.flagsConfig;
    }
}
