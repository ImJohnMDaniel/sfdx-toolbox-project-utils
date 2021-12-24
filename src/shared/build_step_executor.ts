import { IBuildStage, instanceOfICarriesStageable } from '../types/build_stage';
import { IBuildStep } from '../types/build_step';
import { BuildStepScope } from './constants';
import Utils from './utils';

export default class BuildStepExecutor {

    // tslint:disable-next-line: no-any
    public static async run(stage: IBuildStage, step: IBuildStep, buildStepConfig: any, currentScope: BuildStepScope) {

        // console.log('\n\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // console.log(step.getBuildStepTypeToken());
        // console.log(stage.getFlags().scope);
        // console.log(currentScope);
        // console.log(buildStepConfig.scope)
        // console.log(BuildStepScope[currentScope]);
        // console.log(BuildStepScope[BuildStepScope[currentScope]]);
        // console.log(BuildStepScope[BuildStepScope.ALL]);
        // console.log(Utils.buildStepScopesDefault());
        console.log(BuildStepScope[Utils.buildStepScopesDefault()]);
        // console.log(stage.getFlags().scope === BuildStepScope[BuildStepScope.ALL]);
        // console.log(stage.getFlags().scope === BuildStepScope[BuildStepScope[currentScope]]);
        // console.log(buildStepConfig?.scope === stage.getFlags().scope);
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n');

        /* 
            if the stage.getFlags().scope == ALL
                or ( stage.getFlags().scope != ALL
                      and buildStepConfig.scope
                      and buildStepConfig.scope == stage.getFlags().scope 
                    )
        */
        // if (stage.getFlags().scope
        //     && ( stage.getFlags().scope === BuildStepScope[BuildStepScope.ALL]
        //         || stage.getFlags().scope === BuildStepScope[BuildStepScope[currentScope]])) {
        if (stage.getFlagsSubmitted().scope
            && ( stage.getFlagsSubmitted().scope === BuildStepScope[Utils.buildStepScopesDefault()]
                || (buildStepConfig.scope 
                    && buildStepConfig.scope === stage.getFlagsSubmitted().scope
                    ) 
                )
            ) 
        {
            console.log(`executing ${step.getBuildStepTypeToken()} under scope: ${buildStepConfig.scope ? buildStepConfig.scope : stage.getFlagsSubmitted().scope}`);
            // if a BuildStep's flagsConfig is aware of the flag, add that flag to the buildStepConfig (overwrite if necessary)
            Utils.filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(stage.getFlagsSubmitted(), step.getFlagsConfig(), buildStepConfig);

            try {
                step?.setParams(buildStepConfig);
                // step?.setProjectJson(stage.getProjectJson());
                step?.setProjectJson(Utils.getSfdxProjectJson());
                step?.setUx(stage.getUX());
                step?.setJsonOutputActive();
                step?.setOrgAlias(stage.getFlagsSubmitted().setalias ? stage.getFlagsSubmitted().setalias : stage.getFlagsSubmitted().targetusername);

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
