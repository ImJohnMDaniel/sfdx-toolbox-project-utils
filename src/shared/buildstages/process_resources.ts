// import { FlagsConfig } from '@salesforce/command';
import { AbstractBuildStage } from '../../types/build_stage';
// import { IBuildStep } from '../../types/build_step';
// import BuildStepsFactory from '../build_steps_factory';
// import Utils from '../utils';
// import * as _ from 'lodash';

// export function getFlagsConfig(stageToken: string) {
//     // const buildStepsConfigurations = this.getBuildStepConfigurations(stageToken);
//     const projectJson = Utils.getSfdxProjectJson();
//     console.log('BLUEFISH');
//     console.log(projectJson);
//     const buildStepsConfigurations = _.get(projectJson['contents'], 'plugins.toolbox.project.builder.stages.' + stageToken, false);
//     console.log('1==========');
//     console.log(buildStepsConfigurations);
//     console.log('2==========');

//         // BLOCKONE BEGINS ************************************************************************************************
//         // const flagsConfigOutputPromise = new Promise((resolve, reject): any => {
//         //     let flagsConfigOutput: FlagsConfig = { };
//         //     const stepCreation = async (buildStepConfig) => {
//         //         try {
//         //             const step: IBuildStep = await bsf.create(buildStepConfig.buildStepType);

//         //             flagsConfigOutput = { ...flagsConfigOutput, ...step.getFlagsConfig() };
//         //             console.log(`flagsConfigOutput is now ${flagsConfigOutput}`);
//         //         } catch (e) {
//         //             throw e;
//         //         }
//         //     }
//         //     Utils.asyncForEach( buildStepsConfigurations, stepCreation );
//         //     resolve(flagsConfigOutput);
//         // });

//         // let flagsConfigOutput: FlagsConfig = { };
//         // flagsConfigOutputPromise
//         //     .then(configoutput => { flagsConfigOutput = configoutput as FlagsConfig })
//         //     .catch(error => {throw error;} );
//         // BLOCKONE ENDS ************************************************************************************************

//     let flagsConfigOutput: FlagsConfig = { };

//     if ( buildStepsConfigurations ) {

//         // const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();
//         let bsf: BuildStepsFactory;
        
//         console.log('3==========');

//         const stepCreation = async (buildStepConfig) => {
//             try {
//                 console.log('5==========');
//                 console.log(buildStepConfig.buildStepType);

// // the issue is that the "bsf" is not resolved at this point
// // The structure of this section of code needs to be wrapped inside the ".then" section 
// //      of the "BuildStepsFactory.getInstance()" promise resolution at line 23

//                 const step: IBuildStep = await bsf.create(buildStepConfig.buildStepType);
//                 console.log(step);
//                 flagsConfigOutput = { ...flagsConfigOutput, ...step.getFlagsConfig() };
//                 console.log(`flagsConfigOutput is now ...`);
//                 console.log(flagsConfigOutput);
//             } catch (e) {
//                 throw e;
//             }
//         }

//         const mainProcess = async () => {
//             BuildStepsFactory.getInstance()
//                 .then(bsfinstance => {
//                     bsf = bsfinstance;
//                     console.log('3A=========');
//                     console.log(bsf);
//                     console.log('3B=========');
//                     Utils.asyncForEach( buildStepsConfigurations, stepCreation );
//                     console.log('6==========');
//                     console.log(flagsConfigOutput);
//                     console.log('7==========');
//                 })
//                 .catch(error => {throw error;} );

//             console.log('4==========');

//         }

//         Utils.asyncExec(mainProcess);
//     }

//     console.log('6==========');
//     console.log(flagsConfigOutput);
//     console.log('7==========');

//     // while(!flagsConfigOutput) {

//     // }

//     // do {
        
//     // } while (flagsConfigOutput === {});

//     console.log('9==========');
//     console.log(flagsConfigOutput);
//     console.log('10==========');
//     return flagsConfigOutput;
// }

// export function processResourcessStageFlagsConfigOutput(): FlagsConfig {
//     return;
// }

export default class ProcessResourcessStage extends AbstractBuildStage {

    // public static flagsFromCommand: FlagsConfig = await ProcessResourcessStage.getFlagsConfig('processResources');
    // public static flagsFromCommand: FlagsConfig = await ProcessResourcessStage.getFlagsConfig('processResources');

    public getStageToken(): string {
        return 'processResources';
    }
}
