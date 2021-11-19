import { BuildStep } from "../types/build_step";
import { IBuildStage, ICarriesStageable } from "../types/build_stage";

export default class BuildStepExecutor {

    public static async run(stage: IBuildStage, step: BuildStep, buildStepConfig: any) {

        // projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX, flags: OutputFlags<any>


        // console.log('++++++++++++++++++++++++');
        // console.log('       buildStepConfig');
        // console.log(buildStepConfig);
        // console.log('++++++++++++++++++++++++');
        // console.log('       flags');
        // console.log(stage.getFlags());
        // console.log(stage.getFlags().setdefaultusername);
        // console.log('++++++++++++++++++++++++');

        // if a BuildStep's flagsConfig is aware of the flag, add that flat to the buildStepConfig (overwrite if necessary)
        // loop through the flags

        // Object.keys(stage.getFlags()).forEach((key: string) => {
        //     console.log(key);
        // });
        
        // Object.keys(stage.getFlags()).find( flag => flag in step.getFlagsConfig())

        function instanceOfICarriesStageable(object: any): object is ICarriesStageable {
            // console.log('testing via instanceOfICarriesStageable');
            return 'setCurrentStage' in object;
        }

        try {
            step?.setParams(buildStepConfig);
            step?.setProjectJson(stage.getProjectJson());
            step?.setUx(stage.getUX());
            step?.setJsonOutputActive();
            step?.setOrgAlias(stage.getFlags().setalias ? stage.getFlags().setalias : stage.getFlags().targetusername);

            console.log(step.getBuildStepTypeToken());
            if (instanceOfICarriesStageable(step)) {
                // console.log('This step is an ICarriesStageable\n\n');
                step.setCurrentStage(stage);
            }

            await step?.run();
        }
        catch (e){
            throw e;
        }
    }

    private static mergeBuildStepConfigAndFlags() {

    }
}