import { IBuildStage, instanceOfICarriesStageable } from '../types/build_stage';
import { IBuildStep } from '../types/build_step';
import { BuildStepScope } from './constants';
import Utils from './utils';

export default class BuildStepExecutor {

    // tslint:disable-next-line: no-any
    public static async run(stage: IBuildStage, step: IBuildStep, buildStepConfig: any, currentScope: BuildStepScope) {

        // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // console.log(step.getBuildStepTypeToken());
        // console.log(stage.getFlags().scope);
        // console.log(currentScope);
        // console.log(BuildStepScope[currentScope]);
        // console.log(BuildStepScope[BuildStepScope[currentScope]]);
        // console.log(BuildStepScope[BuildStepScope.ALL]);
        // console.log(stage.getFlags().scope === BuildStepScope[BuildStepScope[currentScope]]);
        // console.log(stage.getFlags().scope === BuildStepScope[BuildStepScope.ALL]);

        if (stage.getFlags().scope
            && ( stage.getFlags().scope === BuildStepScope[BuildStepScope.ALL]
                || stage.getFlags().scope === BuildStepScope[BuildStepScope[currentScope]])) {
            // console.log(`executing ${step.getBuildStepTypeToken()} under scope: ${stage.getFlags().scope}`);
            // if a BuildStep's flagsConfig is aware of the flag, add that flag to the buildStepConfig (overwrite if necessary)
            Utils.filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(stage.getFlags(), step.getFlagsConfig(), buildStepConfig);

            try {
                step?.setParams(buildStepConfig);
                step?.setProjectJson(stage.getProjectJson());
                step?.setUx(stage.getUX());
                step?.setJsonOutputActive();
                step?.setOrgAlias(stage.getFlags().setalias ? stage.getFlags().setalias : stage.getFlags().targetusername);

                if (instanceOfICarriesStageable(step)) {
                    step.setCurrentStage(stage);
                }

                await step?.run();
            } catch (e) {
                throw e;
            }
        }
    }
}
