import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { SourcePushCommand } from 'salesforce-alm/dist/commands/force/source/push';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    push source to a scratch org from the project

    USAGE
        $ sfdx force:source:push [-f] [-g] [-w <minutes>] [-u <string>] [--apiversion <string>] [--json] [--loglevel
            trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -f, --forceoverwrite                                                              ignore conflict warnings and overwrite changes to scratch org
        -g, --ignorewarnings                                                              deploy changes even if warnings are generated
        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org
        -w, --wait=wait                                                                   [default: 33 minutes] wait time for command to finish in minutes (default: 33)
        --apiversion=apiversion                                                           override the api version used for api requests made by this command
        --json                                                                            format output as json
        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation

    DESCRIPTION
        NOTE: This command must be run from within a project.

        If the command detects a conflict, it displays the conflicts but does not complete the process. After reviewing the conflict, rerun the command
        with the --forceoverwrite parameter.
 */
export default class ForceSourcePush extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Source push to scratch org ' + this.orgAlias);

        // FORCEOVERWRITE
        // if (this.params.forceoverwrite) {
        this.args.push('--forceoverwrite');
        // }

        // IGNOREWARNINGS
        if (this.params.ignorewarnings) {
            this.args.push('--ignorewarnings');
        }

        // WAIT
        if (this.params.wait) {
            this.args.push('--wait');
            this.args.push(`${this.params.wait}`);
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);

        const sourcePushResultJson = await SourcePushCommand.run(this.args);

        if (sourcePushResultJson === undefined) {
            // there was a problem
            throw Error('Source Push Command attempt was unsuccessful.');
        }

        return sourcePushResultJson;
    }

    public getBuildStepTypeToken(): string {
        return 'ForceSourcePush';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return SourcePushCommand.flagsConfig;
    }
}
