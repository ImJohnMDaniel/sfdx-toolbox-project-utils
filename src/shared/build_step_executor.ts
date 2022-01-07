import { IBuildStage, instanceOfICarriesStageable } from '../types/build_stage';
import { IBuildStep } from '../types/build_step';
import BuildStepScopes, { BuildStepScope } from './build_step_scopes';
import { Constants } from './constants';
import Utils from './utils';

export default class BuildStepExecutor {

    // tslint:disable-next-line: no-any
    public static async run(stage: IBuildStage, step: IBuildStep, buildStepConfig: any, currentScope: BuildStepScope) {
        
        let buildStepExecutionResponseJson;

        // if the build type token is threaded, in which case, automatically let that pass.
        if (Constants.THREADED_BUILD_STEP_TYPE_TOKEN === step.getBuildStepTypeToken()
            // otherwise, check to see if the build step should be executed
            || BuildStepExecutor.buildStepShouldBeExecuted( BuildStepScopes.get(stage.getFlagsSubmitted().scope), BuildStepScopes.get(buildStepConfig.scope))
            )
        {
            // console.log(`executing ${step.getBuildStepTypeToken()} under scope: ${buildStepConfig.scope ? buildStepConfig.scope : stage.getFlagsSubmitted().scope}`);
            // if a BuildStep's flagsConfig is aware of the flag, add that flag to the buildStepConfig (overwrite if necessary)
            Utils.filterAndPrepareBuildStepConfigFromFlagsBasedOnFlagsConfig(stage.getFlagsSubmitted(), step.getFlagsConfig(), buildStepConfig);

            try {
                step?.setParams(buildStepConfig);
                step?.setProjectJson(Utils.getSfdxProjectJson());
                step?.setUx(stage.getUX());
                step?.setJsonOutputActive();
                step?.setOrgAlias(stage.getFlagsSubmitted().setalias ? stage.getFlagsSubmitted().setalias : stage.getFlagsSubmitted().targetusername);

                if (instanceOfICarriesStageable(step)) {
                    step.setCurrentStage(stage);
                }

                buildStepExecutionResponseJson = await step?.run();
                console.log(`buildStepExecutionResponseJson for build step ${step.getBuildStepTypeToken()} ===============`);
                console.log(buildStepExecutionResponseJson);
                console.log(`buildStepExecutionResponseJson for build step ${step.getBuildStepTypeToken()} ===============`);
            } catch (e) {
                console.error(`there was an error executing build step ${step.getBuildStepTypeToken()}`);
                console.error(e);
                throw e;
            }
        }

        return buildStepExecutionResponseJson;
    }

    private static buildStepShouldBeExecuted(scopeRequested: BuildStepScope, buildStepConfigScope: BuildStepScope): boolean {

        let response = false;

        // - Determine working stage scope 
        //     - if scope flag not specified, use default 
        if (!scopeRequested) {
            scopeRequested = BuildStepScopes.buildStepScopesDefault();
        }
        // - Determine working build step config scope
        //     - if scope attribute not specified, use default
        if (!buildStepConfigScope) {
            buildStepConfigScope = BuildStepScopes.buildStepScopesDefault();
        }

        // - If scope requested === COMPLETE then execute every build step 
        if ( BuildStepScope.COMPLETE === scopeRequested 
            // - if scope requested === BASIC then execute every build step except those 
            //      with scope of COMPLETE
            || ( BuildStepScope.BASIC === scopeRequested 
                && BuildStepScope.COMPLETE !== buildStepConfigScope
                )
            // - if scope requested === {{EXCLUSIVE}} then execute every build step 
            //      where the build step scope matches the {{EXCLUSIVE}} scope specified
            || ( scopeRequested === buildStepConfigScope)
            ) {
                response = true;
        }

        return response;
    }
}
