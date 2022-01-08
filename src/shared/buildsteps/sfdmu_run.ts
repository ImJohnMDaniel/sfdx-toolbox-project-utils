import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
// import Run from 'sfdmu/lib/commands/sfdmu/run';
// import Run from 'sfdmu/src/commands/sfdmu/run';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    The Salesforce DX data migration tool.

    USAGE
        $ sfdx sfdmu:run [-s <string>] [-p <directory>] [--silent] [--version] [--filelog] [--noprompt] [--nowarnings] [-c <string>] [-u <string>]
            [--apiversion <string>] [--verbose] [--concise] [--quiet] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -c, --canmodify=canmodify                                                         [Optional] Allows modification of target production environment without preliminary prompting the user about it.

        -p, --path=path                                                                   [Optional] Absolute/Relative path to package directory

        -s, --sourceusername=sourceusername                                               Source org username/alias or 'csvfile' for csv load

        -u, --targetusername=targetusername                                               username or alias for the target org; overrides default target org

        --apiversion=apiversion                                                           [Optional] Override the api version set in the package definition

        --concise                                                                         [Optional] Emit brief command output to stdout

        --filelog                                                                         [Optional] Enable additional logging into log file

        --json                                                                            [Optional] Format the command output as json

        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for this command invocation

        --noprompt                                                                        [Optional] Skip prompt inputs or confirmation

        --nowarnings                                                                      [Optional] Suppress all warning messages

        --quiet                                                                           [Optional] Disable logging - show only success/errors

        --silent                                                                          [Optional] Disable logging; same as --quiet flag

        --verbose                                                                         [Optional] Emit additional command output to stdout

        --version                                                                         [Optional] Output the current version of the plugin

    DESCRIPTION
        Populate your org (scratch/development/sandbox/production) with data imported from another org or CSV file.
        Refer https://github.com/forcedotcom/SFDX-Data-Move-Utility for the detailed help information.
 */
export default class SfdmuRun extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Data load to scratch org ' + this.orgAlias);

        // SOURCEUSERNAME
        if (this.params.sourceusername) {
            this.args.push('--sourceusername');
            this.args.push(`${this.params.sourceusername}`);
        }

        // PATH
        if (this.params.path) {
            this.args.push('--path');
            this.args.push(`${this.params.path}`);
        }

        // CANMODIFY
        if (this.params.canmodify) {
            this.args.push('--canmodify');
            this.args.push(`${this.params.canmodify}`);
        }

        // CONCISE
        if (this.params.concise) {
            this.args.push('--concise');
        }

        // FILELOG
        if (this.params.filelog) {
            this.args.push('--filelog');
        }

        // NOPROMPT
        if (this.params.noprompt) {
            this.args.push('--noprompt');
        }

        // NOWARNINGS
        if (this.params.nowarnings) {
            this.args.push('--nowarnings');
        }

        // QUIET
        if (this.params.quiet) {
            this.args.push('--quiet');
        }

        // SILENT
        if (this.params.silent) {
            this.args.push('--silent');
        }

        // VERBOSE
        if (this.params.verbose) {
            this.args.push('--verbose');
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);

        // console.log(this.args);
        // console.log('~~~~~~~~~~~~~BEFORE');

        // disabled for now until I have time to work through issue seen when using
        console.log('         *********** THE "sfdmu.run" COMMAND WOULD NORMALLY EXECUTE HERE, BUT IT IS DISABLED FOR NOW. *********** ');
        const runResultJson = { };
        // const runResultJson = await Run.run(this.args);
        // const runResultJson = await Run.run(this.args, config);

        // if (runResultJson === undefined) {
        //     // there was a problem
        //     throw Error('SFDMU Run Command attempt was unsuccessful.');
        // }
        // console.log('~~~~~~~~~~~~~AFTER');


        return runResultJson;
    }

    public getBuildStepTypeToken(): string {
        return 'SfdmuRun';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        // TODO: enable this method once SFDMU dependency issues are resolved.
        return { }; // Run.flagsConfig;
    }
}
