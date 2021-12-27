import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import Run from 'sfdmu/lib/commands/sfdmu/run';
// import Run from 'sfdmu/src/commands/sfdmu/run';
import { AbstractBuildStep } from '../../types/build_step';

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

        const args = [];

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        // SOURCEUSERNAME
        if (this.params.sourceusername) {
            args.push('--sourceusername');
            args.push(`${this.params.sourceusername}`);
        }

        // PATH
        if (this.params.path) {
            args.push('--path');
            args.push(`${this.params.path}`);
        }

        // CANMODIFY
        if (this.params.canmodify) {
            args.push('--canmodify');
            args.push(`${this.params.canmodify}`);
        }

        // CONCISE
        if (this.params.concise) {
            args.push('--concise');
        }

        // FILELOG
        if (this.params.filelog) {
            args.push('--filelog');
        }

        // NOPROMPT
        if (this.params.noprompt) {
            args.push('--noprompt');
        }

        // NOWARNINGS
        if (this.params.nowarnings) {
            args.push('--nowarnings');
        }

        // QUIET
        if (this.params.quiet) {
            args.push('--quiet');
        }

        // SILENT
        if (this.params.silent) {
            args.push('--silent');
        }

        // VERBOSE
        if (this.params.verbose) {
            args.push('--verbose');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);

        console.log(args);
        // console.log('~~~~~~~~~~~~~BEFORE');

        // disabled for now until I have time to work through issue seen when using
        console.log('         *********** THE "sfdmu.run" COMMAND WOULD NORMALLY EXECUTE HERE, BUT IT IS DISABLED FOR NOW. *********** ');
        // await Run.run(args);
        // await Run.run(args, config);

        // console.log('~~~~~~~~~~~~~AFTER');

        return;
    }

    public getBuildStepTypeToken(): string {
        return 'SfdmuRun';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Run.flagsConfig;
    }
}
