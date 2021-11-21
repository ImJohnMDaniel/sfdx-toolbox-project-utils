import { IBuildStage, ICarriesStageable } from '../types/build_stage';
import { IBuildStep } from '../types/build_step';
import Utils from './utils';

export default class BuildStepExecutor {

    // tslint:disable-next-line: no-any
    public static async run(stage: IBuildStage, step: IBuildStep, buildStepConfig: any) {

        // if a BuildStep's flagsConfig is aware of the flag, add that flag to the buildStepConfig (overwrite if necessary)
        Utils.filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(stage.getFlags(), step.getFlagsConfig(), buildStepConfig);

        // tslint:disable-next-line: no-any
        function instanceOfICarriesStageable(object: any): object is ICarriesStageable {
            return 'setCurrentStage' in object;
        }

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
