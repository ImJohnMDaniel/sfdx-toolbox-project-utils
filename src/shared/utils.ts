import { OutputFlags } from '@oclif/parser';
import { flags, FlagsConfig, SfdxCommand } from '@salesforce/command';
import { ConfigFile, Messages, SfdxProjectJson } from '@salesforce/core';
import BuildStepScopes, { BuildStepScope } from './build_step_scopes';
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
    if (theInputflags !== undefined) {
      Object.keys(theInputflags).forEach((flagSubmitted: string) => {
        // Is this flagSubmitted a flag included the currentFlagsConfig?
        if (currentFlagsConfig[flagSubmitted]
          || flagSubmitted === 'targetdevhubusername'
          || flagSubmitted === 'targetusername'
          || flagSubmitted === 'loglevel') {
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
    if (theInputflags !== undefined) {
      Object.keys(theInputflags).forEach((flagSubmitted: string) => {
        // console.log('   flagSubmitted: ' + flagSubmitted);
        // Is this flagSubmitted a flag included the currentFlagsConfig?
        if (currentFlagsConfig[flagSubmitted]
          && flagSubmitted !== 'env') 
        {
          if (typeof theInputflags[flagSubmitted] !== "boolean") {
            // console.log('   adding flagSubmitted to args');
            // then add the flagSubmittedToStage to the list of step params
            args.push('--' + flagSubmitted);
            if (theInputflags[flagSubmitted] !== undefined ) 
            {
              args.push((theInputflags[flagSubmitted]).toString());
            }  
          } else {
            // if the flag is true then the flag should simply be pushed on the stack
            //  if the value were false, then simply don't push the flag on the stack
            if ( theInputflags[flagSubmitted] === true ) {
              args.push('--' + flagSubmitted);
            }
          }
        }
      });
    }
    // console.log('\nargs : ');
    // console.log(args);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }

  /*
  {
    durationdays: 1,
    env: 'sandbox',
    loglevel: 'warn',
    retry: 0
    scope: 'COMPLETE',
    setalias: 'foobarjenkins',
    setdefaultusername: false,
    targetdevhubusername: 'steampunkAsDevHubPipeline',
    type: 'scratch',
    wait: Duration { quantity: 6, unit: 0 },
  }

  loglevel
  targetdevhubusername
  */
  public static pushCommonFlagsConfigToArgs(params: any, orgAlias: string, args: any[], includeTargetDevHubUsernameValue?: boolean) {

    // TARGETDEVHUBUSERNAME
    if (params.targetdevhubusername && includeTargetDevHubUsernameValue) {
      args.push('--targetdevhubusername');
      args.push(`${params.targetdevhubusername}`);
    }

    // TARGETUSERNAME
    if (orgAlias) {
      args.push('--targetusername');
      args.push(`${orgAlias}`);
    }

    // LOGLEVEL
    if (params.loglevel) {
      args.push('--loglevel');
      args.push(`${params.loglevel}`);
    }

    // JSON
    if (params.json) {
      args.push('--json');
    }

  }

  public static getCommonFlagMessages(): Messages {
    return Messages.loadMessages('@dx-cli-toolbox/sfdx-toolbox-project-utils', 'toolbox-project-flags-common');
  }

  public static flagScope(theBuildStepScope: BuildStepScope, isHidden?: boolean): FlagsConfig {
    return {
      scope: flags.enum({
        default: BuildStepScope[theBuildStepScope]
        , hidden: isHidden !== undefined ? isHidden : true
        , required: false
        , description: Utils.getCommonFlagMessages().getMessage('flagBuildStepScopeDescription')
        , options: BuildStepScopes.buildStepScopesAsStrings()
      })
    };
  }

  public static flagScopeDefault(isHidden?: boolean): FlagsConfig {
    return Utils.flagScope(BuildStepScopes.buildStepScopesDefault(), isHidden !== undefined ? isHidden : false);
  }

  public static flagsCommonConfig(): FlagsConfig {
    return {
      ...Utils.flagScopeDefault(true)
      , ...{
        resetfromstart: flags.boolean({ default: false, required: false, description: Utils.getCommonFlagMessages().getMessage('flagResetFromStart') })
      }
    };
  }

  public static async controlConsoleMessages( sfdxcmd: any, args: any ): Promise<any>
  {
    console.log('Just before the intercept call');
    let capturedText = 'not yet set';
    const intercept = require('intercept-stdout');
    console.log('BLUEFISH on the menu today');
    // setup the intercept function to silence the output of SfdxCommand call
    // tslint:disable-next-line: only-arrow-functions
    const unhookIntercept = intercept(function(text) {
      // In a "--json" scenario, the output does not need to be captured.  It just needs to be silenced.
      capturedText = text;
      console.log('text ========');
      console.log(text);
      console.log('text ========');
      return '';
    });
    const responseJson = await sfdxcmd.run(args);

    // reactivate the output to console.
    unhookIntercept();
    console.log('Just after the intercept call');
    console.log('capturedText ========');
    console.log(capturedText);
    console.log('capturedText ========');
    return responseJson;
  }
}
