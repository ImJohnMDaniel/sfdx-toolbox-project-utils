import { IBuildStep } from "../types/build_step";
import { IBuildStage, ICarriesStageable } from "../types/build_stage";
import Utils from "./utils";

export default class BuildStepExecutor {

    public static async run(stage: IBuildStage, step: IBuildStep, buildStepConfig: any) {

        // if a BuildStep's flagsConfig is aware of the flag, add that flag to the buildStepConfig (overwrite if necessary)
        Utils.filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(stage.getFlags(), step.getFlagsConfig(), buildStepConfig);
        
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

            // await step?.run();
        }
        catch (e){
            throw e;
        }
    }
}