import { OutputFlags } from '@oclif/parser';
import { FlagsConfig } from '@salesforce/command';
export default class Utils {
  public static async asyncForEach(array, callback): Promise<void> {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
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
  public static filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(flags: OutputFlags<any>, currentFlagsConfig: FlagsConfig, buildStepConfig: any) {

    if (buildStepConfig == undefined) {
      buildStepConfig = {};
    }
    // loop through the flags
    Object.keys(flags).forEach((flagSubmitted: string) => {
      // Is this flagSubmitted a flag included the currentFlagsConfig?
      if (currentFlagsConfig[flagSubmitted]) {
        // then add the flagSubmittedToStage to the list of step params
        buildStepConfig[flagSubmitted] = flags[flagSubmitted];
      }
    });
  }

  // TODO: Research if @oclif/parser/lib/Parser class would be better for this task
  public static filterAndPrepareArgsFromFlagsBasedOnFlagsConfig(flags: OutputFlags<any>, currentFlagsConfig: FlagsConfig, args: string[]) {

    // console.log('\n\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    // console.log('currentFlagsConfig_________________________');
    // console.log(currentFlagsConfig);
    // console.log('\n');
    if (args == undefined) {
      args = [];
    }
    // loop through the flags
    Object.keys(flags).forEach((flagSubmitted: string) => {
      // console.log('   flagSubmitted: ' + flagSubmitted);
      // Is this flagSubmitted a flag included the currentFlagsConfig?
      if (currentFlagsConfig[flagSubmitted]) {
        // console.log('   adding flagSubmitted to args');
        // then add the flagSubmittedToStage to the list of step params
        args.push('--' + flagSubmitted);
        if (flags[flagSubmitted] !== undefined && flags[flagSubmitted] !== true) {
          args.push(flags[flagSubmitted]);
        }
      }
    });
    // console.log('\nargs : ');
    // console.log(args);
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  }
}