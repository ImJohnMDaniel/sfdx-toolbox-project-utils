import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { OrgCreateCommand } from 'salesforce-alm/dist/commands/force/org/create';
import { FlagsConfig } from "@salesforce/command";
import * as _ from 'lodash';
import { rmdirSync } from "fs";
import { tmpdir } from "os";

/*
    create a scratch or sandbox org

    USAGE
        $ sfdx force:org:create [name=value...] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-s] [-a <string>] [-w <minutes>] [-d <integer>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -a, --setalias=setalias                                                           alias for the created org
        -c, --noancestors                                                                 do not include second-generation package ancestors in the scratch org
        -d, --durationdays=durationdays                                                   duration of the scratch org (in days) (default:7, min:1, max:30)
        -f, --definitionfile=definitionfile                                               path to an org definition file
        -i, --clientid=clientid                                                           connected app consumer key; not supported for sandbox org creation
        -n, --nonamespace                                                                 create the scratch org with no namespace
        -s, --setdefaultusername                                                          set the created org as the default username
        -t, --type=(scratch|sandbox)                                                      [default: scratch] type of org to create
        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org
        -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub org; overrides default dev hub org
        -w, --wait=wait                                                                   [default: 6 minutes] the streaming client socket timeout (in minutes)
        --apiversion=apiversion                                                           override the api version used for api requests made by this command
        --json                                                                            format output as json
        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation

    DESCRIPTION
        Specify a configuration file or provide key=value pairs while creating a scratch org or a sandbox. When creating scratch orgs, —targetdevhubusername (-v) must be a Dev Hub org. When creating sandboxes, the --targetusername (-u) must be a production org with sandbox licenses. The —type (-t) is required 
        if creating a sandbox.

    Examples:
        $ sfdx force:org:create -f config/enterprise-scratch-def.json -a MyScratchOrg
        $ sfdx force:org:create edition=Developer -a MyScratchOrg -s -v devHub
        $ sfdx force:org:create -f config/enterprise-scratch-def.json -a ScratchOrgWithOverrides username=testuser1@mycompany.org
        $ sfdx force:org:create -t sandbox -f config/dev-sandbox-def.json -a MyDevSandbox -u prodOrg
 */

export default class ForceOrgCreate extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Creating new scratch org ' + this.orgAlias);

        // clean up the temp directory "shape" folder
        // see ForceDotCom CLI Issue #753 for details
        //      https://github.com/forcedotcom/cli/issues/753
        try {
            rmdirSync( tmpdir() + '/shape' );
        }
        catch (e) {
            // noopt
        }

        const args = [];

        // this.ux.log(this.params);

        // ORG ALIAS
        if (this.orgAlias) {
            args.push('--setalias');
            args.push(`${this.orgAlias}`);
        }
        
        if (this.params.durationdays) {
            args.push('--durationdays');
            args.push(`${this.params.durationdays}`);
        }

        // DEFINITIONFILE
        if (this.params.definitionfile) {
            args.push('--definitionfile');
            args.push(`${this.params.definitionfile}`);
        } else {
            // this.ux.log('hello');
            // const definitionfile = _.get(this.projectJson['contents'], 'packageDirectories.definitionFile', false);
            // const definitionfile = _.find(this.projectJson['contents.packageDirectories'], function(o) { return o.age < 40; });
            // this.ux.log(this.projectJson['contents']['packageDirectories']);
            const definitionfile = _.find(this.projectJson['contents']['packageDirectories'], function(o) { return o.definitionFile != null; });
            // this.ux.log('hello');
            // this.ux.log(definitionfile['definitionFile']);
            args.push('--definitionfile');
            args.push(`${definitionfile['definitionFile']}`);
        }

        if (this.params.setalias) {
            args.push('--setalias');
            args.push(`${this.params.setalias}`);
        }

        // JSON
        // force the inclusion of the JSON flag
        // args.push('--json');

        const orgCreationResultJson = await OrgCreateCommand.run(args);
        // this.ux.log('breadcrumb A');
        // this.ux.log(orgCreationResultJson?.orgId);
        // this.ux.log(orgCreationResultJson?.username);
        // this.ux.log('breadcrumb B');
        if (orgCreationResultJson === undefined) {
            // there was a problem with the org creation step
            throw Error('Org Create Command attempt was unsuccessful.');
        }

        return;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceOrgCreate';
    }

    public getSFDXProjectConfigureExample(): string {
        return ''
    }

    public getFlagsConfig(): FlagsConfig {
        return OrgCreateCommand.flagsConfig;
    }
}