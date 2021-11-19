import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig } from "@salesforce/command";
import BuildStepsFactory from "../build_steps_factory";
import BuildStepExecutor from "../build_step_executor";
import { IBuildStage, ICarriesStageable } from "../../types/build_stage";

export default class ThreadedBuildStep extends AbstractBuildStep 
    implements ICarriesStageable
{
    private currentStage: IBuildStage;
    public setCurrentStage(currentStage: IBuildStage): void {
        this.currentStage = currentStage;
    }
    public async run(): Promise<AnyJson> {

        this.ux.log('Beginning execution of multiple threaded build steps against ' + this.orgAlias);

        // const apexExecuteResultJson = await Execute.run(args);

        // if ( apexExecuteResultJson == undefined ) {
        //     // there was a problem with the apex execute step
        //     throw Error('Apex Execute attempt was unsuccessful.');
        // }

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        // find the build steps within this build step
        if (this.params.buildSteps) {
            // build steps were found 
            // execute all of them at once
// TODO double check this is doing what I think it should -- I probably needs "await Promise.all()"
            this.params.buildsteps.forEach(async buildStepConfig => {
                const step = await bsf.create(buildStepConfig.buildStepType);
                BuildStepExecutor.run(this.currentStage, step, buildStepConfig);
            });
        }

        // wait for all of the substeps to complete and this finish this threaded step

        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ThreadedBuildStep';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }

    public getFlagsConfig(): FlagsConfig {
        return { };
    }
}