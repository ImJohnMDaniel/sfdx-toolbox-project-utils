import Install from '@dx-cli-toolbox/sfdx-toolbox-package-utils/lib/commands/toolbox/package/dependencies/install';
import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    Install dependent packages for a sfdx project

    USAGE
        $ sfdx toolbox:package:dependencies:install [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s AllUsers|AdminsOnly] [-t
            DeprecateOnly|Mixed|Delete] [-w <number>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
            trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -a, --apexcompile=(all|package)                                                   [default: all] compile all Apex in the org and package, or only Apex in the
                                                                                          package

        -b, --branch=branch                                                               For dependencies specified by package/versionNumber combination, you can specify
                                                                                          the branch group of builds to work from by entering the branch build name.  If not
                                                                                          specified, the builds from NULL branch will be considered.

        -k, --installationkeys=installationkeys                                           Installation key for key-protected packages (format is 1:MyPackage1Key 2:
                                                                                          3:MyPackage3Key... to allow some packages without installation key)

        -p, --prompt                                                                      Require approval to allow Remote Site Settings and Content Security Policy
                                                                                          websites to send or receive data

        -s, --securitytype=(AllUsers|AdminsOnly)                                          [default: AdminsOnly] security access type for the installed package

        -t, --upgradetype=(DeprecateOnly|Mixed|Delete)                                    [default: Mixed] the upgrade type for the package installation; available only for
                                                                                          unlocked packages

        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org

        -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub org; overrides default dev hub org

        -w, --wait=wait                                                                   Number of minutes to wait for installation status (also used for publishwait).
                                                                                          Default is 10

        --apiversion=apiversion                                                           override the api version used for api requests made by this command

        --dryrun                                                                          Allows the command to execute and display result information without actually
                                                                                          performing the package installations.  Useful if debugging.

        --json                                                                            format output as json

        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation

        --noprecheck                                                                      Allows the command to bypass the pre-check of the target org and force install all
                                                                                          packages even if they are already installed.

    EXAMPLE
        $ toolbox:package:dependencies:install -u MyScratchOrg -v MyDevHub -k "1:MyPackage1Key 2: 3:MyPackage3Key" -b "DEV"
 */

export default class ToolboxPackageDependenciesInstall extends AbstractBuildStep {
    public async run(): Promise<AnyJson> {

        this.ux.log('deployment of all package dependencies to scratch org ' + this.orgAlias);

        // APEXCOMPILE
        if (this.params.apexcompile) {
            this.args.push('--apexcompile');
            this.args.push(`${this.params.apexcompile}`);
        }

        // BRANCH
        if (this.params.branch) {
            this.args.push('--branch');
            this.args.push(`${this.params.branch}`);
        }

        // INSTALLATIONKEYS
        if (this.params.installationkeys) {
            this.args.push('--installationkeys');
            this.args.push(`${this.params.installationkeys}`);
        }

        // PROMPT
        if (this.params.prompt) {
            this.args.push('--prompt');
        }

        // SECURITYTYPE
        if (this.params.securitytype) {
            this.args.push('--securitytype');
            this.args.push(`${this.params.securitytype}`);
        }

        // UPGRADETYPE
        if (this.params.upgradetype) {
            this.args.push('--upgradetype');
            this.args.push(`${this.params.upgradetype}`);
        }

        // DRYRUN
        if (this.params.dryrun) {
            this.args.push('--dryrun');
        }

        // NOPRECHECK
        if (this.params.noprecheck) {
            this.args.push('--noprecheck');
        }

        // WAIT
        if (this.params.wait) {
            this.args.push('--wait');
            this.args.push(`${this.params.wait}`);
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args, true);

        const toolboxPackageDependenciesInstallResultJson = await Install.run(this.args);

        if ( toolboxPackageDependenciesInstallResultJson === undefined ) {
            // there was a problem
            throw Error('Package dependencies install attempt was unsuccessful.');
        }

        return toolboxPackageDependenciesInstallResultJson;
    }
    public getBuildStepTypeToken(): string {
        return 'ToolboxPackageDependenciesInstall';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Install.flagsConfig;
    }
}
