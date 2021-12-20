import { OutputFlags } from '@oclif/parser';
import { flags, FlagsConfig } from '@salesforce/command';
import { ConfigFile, Messages, SfdxProjectJson } from '@salesforce/core';
import { BuildStepScope } from './constants';
export default class Utils {
  public static async asyncForEach(array, callback): Promise<void> {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  // public static async getSfdxProjectJson(): Promise<JsonMap> {
  //   const project = await SfdxProject.resolve();
  //   const projectJson = await project.resolveProjectConfig();

  // }

  public static getSfdxProjectJson(): SfdxProjectJson {
    // const projectJson = new SfdxProjectJson({} as ConfigFile.Options);
    // console.log('HELLO -- getSfdxProjectJson() ');
    // console.log(projectJson.getContents());
    // console.log('GOODBYE -- getSfdxProjectJson() ');
    let projectJson = new SfdxProjectJson({} as ConfigFile.Options)
    projectJson.readSync();
    return projectJson;
  }

  // TODO: Research if @oclif/parser/lib/Parser class would be better for this task
  // public static convertFlagsToArgs(flags: OutputFlags<any>): string[] {
  //   const args: string[] = [];
  //   Object.keys(flags).forEach((flagSubmitted: string) => {
  //     args.push('--' + flagSubmitted);
  //     if (flags[flagSubmitted] !== undefined && flags[flagSubmitted] !== true) {
  //       args.push(flags[flagSubmitted]);
  //     }
  //   });
  //   console.log(args);
  //   return args;
  // }

  // if a current flagsConfig is aware of the flag submitted, add that flag to the buildStepConfig (overwrite if necessary)
  // tslint:disable-next-line: no-any
  public static filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(theInputflags: OutputFlags<any>, currentFlagsConfig: FlagsConfig, buildStepConfig: any) {

    if (buildStepConfig === undefined) {
      buildStepConfig = {};
    }
    // loop through the flags
    if ( theInputflags !== undefined ) {
      Object.keys(theInputflags).forEach((flagSubmitted: string) => {
        // Is this flagSubmitted a flag included the currentFlagsConfig?
        if (currentFlagsConfig[flagSubmitted]) {
          // then add the flagSubmittedToStage to the list of step params
          buildStepConfig[flagSubmitted] = theInputflags[flagSubmitted];
        }
      });
    }
  }

  // TODO: Research if @oclif/parser/lib/Parser class would be better for this task
  // tslint:disable-next-line: no-any
  public static filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(theInputflags: OutputFlags<any>, currentFlagsConfig: FlagsConfig, args: string[]) {

    // console.log('\n\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log('currentFlagsConfig_________________________');
    // console.log(currentFlagsConfig);
    // console.log('\n');
    // console.log('theInputflags_________________________');
    // console.log(theInputflags);
    // console.log('\n');
    if (args === undefined) {
      args = [];
    }
    // loop through the flags
    if ( theInputflags !== undefined ) {
      Object.keys(theInputflags).forEach((flagSubmitted: string) => {
        // console.log('   flagSubmitted: ' + flagSubmitted);
        // Is this flagSubmitted a flag included the currentFlagsConfig?
        if (currentFlagsConfig[flagSubmitted]) {
          // console.log('   adding flagSubmitted to args');
          // then add the flagSubmittedToStage to the list of step params
          args.push('--' + flagSubmitted);
          if (theInputflags[flagSubmitted] !== undefined && theInputflags[flagSubmitted] !== true) {
            args.push(theInputflags[flagSubmitted]);
          }
        }
      });
    }
    // console.log('\nargs : ');
    // console.log(args);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }

  public static buildStepScopesDefault(): string {
    return BuildStepScope[BuildStepScope.ALL];
  }

  public static buildStepScopes(): string[] {

    const stringIsNumber = value => isNaN(Number(value)) === false;

    // Turn enum into array
    function toArray(enumme): string[] {
      return Object.keys(enumme)
        .filter(stringIsNumber)
        .map(key => enumme[key]);
    }

    return toArray(BuildStepScope);
  }

  public static getCommonFlagMessages(): string {
    return Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-flags-common').getMessage('flagBuildStepScopeDescription');
  }

  public static getCommonFlags(): any {
    return {
      scope: flags.enum({ default: this.buildStepScopesDefault(), required: false, description: this.getCommonFlagMessages(), options: this.buildStepScopes() })
    };
  }

  public static flagScopeDefault(): FlagsConfig {
    return { scope: flags.enum({ default: Utils.buildStepScopesDefault(), required: false, description: Utils.getCommonFlagMessages(), options: Utils.buildStepScopes()}) };
  }

  public static flagsCommonConfig(): FlagsConfig {
    return { ...Utils.flagScopeDefault()
            , ...{ } };
  }
}
