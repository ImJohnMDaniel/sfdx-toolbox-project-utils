import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { SourcePushCommand } from 'salesforce-alm/dist/commands/force/source/push';
import { FlagsConfig } from "@salesforce/command";

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

        const args = [];

        // FORCEOVERWRITE
        // if (this.params.forceoverwrite) {
            args.push('--forceoverwrite');
        // }

        // IGNOREWARNINGS
        if (this.params.ignorewarnings) {
            args.push('--ignorewarnings');
        }

        // WAIT
        if (this.params.wait) {
            args.push('--wait');
            args.push(`${this.params.wait}`)
        }

        // JSON
        if (this.params.json) {
            args.push('--json');
        }

        args.push('--targetusername');
        args.push(`${this.orgAlias}`);
        
        const sourcePushResultJson = await SourcePushCommand.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceSourcePush';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }

    public getFlagsConfig(): FlagsConfig {
        return SourcePushCommand.flagsConfig; 
    }
}