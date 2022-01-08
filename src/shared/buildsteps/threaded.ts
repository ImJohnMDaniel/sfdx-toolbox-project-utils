import { FlagsConfig } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import { IBuildStage, ICarriesStageable } from '../../types/build_stage';
import { AbstractBuildStep } from '../../types/build_step';
import BuildStepExecutor from '../build_step_executor';
import BuildStepsFactory from '../build_steps_factory';
import { Constants } from '../constants';

export default class ThreadedBuildStep extends AbstractBuildStep
    implements ICarriesStageable {
    private currentStage: IBuildStage;
    public setCurrentStage(currentStage: IBuildStage): void {
        this.currentStage = currentStage;
    }
    public async run(): Promise<AnyJson> {

        this.ux.log('Beginning execution of multiple threaded build steps against ' + this.orgAlias);

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        // find the build steps within this build step
        if (this.params.buildSteps !== undefined) {
            // build steps were found
            // execute all of them at once
            // TODO double check this is doing what I think it should -- It may need "await Promise.all()" instead
            this.params.buildSteps.forEach(async buildStepConfig => {
                const step = await bsf.create(buildStepConfig.buildStepType);
                // tslint:disable-next-line: no-floating-promises
                BuildStepExecutor.run(this.currentStage, step, buildStepConfig, this.currentStage.getFlagsSubmitted().scope);
            });
        }

        // wait for all of the substeps to complete and this finish this threaded step

        // TODO: Figure out a way to combine all of the result JSONs 
        return { }
    }
    public getBuildStepTypeToken(): string {
        return Constants.THREADED_BUILD_STEP_TYPE_TOKEN;
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return { };
    }
}
