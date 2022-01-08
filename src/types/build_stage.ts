
import { OutputFlags } from '@oclif/parser';
import { FlagsConfig, UX } from '@salesforce/command';
import { AnyJson } from '@salesforce/ts-types';
import * as _ from 'lodash';
import BuildStepExecutor from '../shared/build_step_executor';
import BuildStepMarker, { BuildMarking } from '../shared/build_step_marker';
import BuildStepsFactory from '../shared/build_steps_factory';
import Utils from '../shared/utils';
import { IBuildStep } from './build_step';

export interface IBuildStage {
    getBuildSteps(): IBuildStep[];
    // tslint:disable-next-line: no-any
    getFlagsSubmitted(): OutputFlags<any>;
    // getProjectJson(): SfdxProjectJson;
    getStageToken(): string;
    getUX(): UX;
    getFlagsConfig(): Promise<FlagsConfig>;
    run(): Promise<AnyJson>;
}

export interface ICarriesStageable {
    setCurrentStage(currentStage: IBuildStage): void;
}

// tslint:disable-next-line: no-any
export function instanceOfICarriesStageable(object: any): object is ICarriesStageable {
    return 'setCurrentStage' in object;
}

export abstract class AbstractBuildStage implements IBuildStage {

    // private readonly projectJson: SfdxProjectJson;
    private ux: UX;
    private orgAlias: string;
    // tslint:disable-next-line: no-any
    private readonly flagsSubmitted: OutputFlags<any>;
    private currentMarking: BuildMarking;

    // public static flagsFromCommand: FlagsConfig = { };

    // tslint:disable-next-line: no-any
    public constructor(thisUx?: UX, flagsSubmitted?: OutputFlags<any>) {
        if ( thisUx ) {
            this.ux = thisUx;
        }
        
        if ( flagsSubmitted ) {
            this.orgAlias = flagsSubmitted.targetusername ? flagsSubmitted.targetusername : flagsSubmitted.setalias;
            this.flagsSubmitted = flagsSubmitted;    
        }
    }

    public abstract getStageToken(): string;


    private getBuildStepConfigurations( stageToken: string ): any {
        return _.get(Utils.getSfdxProjectJson()['contents'], 'plugins.toolbox.project.builder.stages.' + stageToken, false);
    }

    private async shouldBuildMarkerBeRemoved( ) {
        const output = this.getFlagsSubmitted().resetfromstart
                && this.currentMarking
                && ( this.currentMarking.stage !== this.getStageToken()
                    || (this.currentMarking.stage === this.getStageToken()
                        && this.currentMarking.stageIndex > 0
                        )
                    );
        // console.log('\n==========================');
        // console.log(this.getFlagsSubmitted().resetfromstart);
        // console.log(this.currentMarking);
        // console.log(this.getStageToken());
        // console.log(`output == ${output}`);
        // console.log('==========================\n');            
        return output;
    }
    private shouldBuildStepExecute( index: number ): boolean {
        // console.log('TRACKING 1=============================');
        // console.log(this.currentMarking);
        // console.log(this.getStageToken());
        // console.log(index);
        // console.log(this.getFlagsSubmitted().resetfromstart);
        // console.log('TRACKING 2=============================\n');

        return (( this.currentMarking                                       // there is a currentMarking file
                  && (( this.currentMarking.stage === this.getStageToken()  // and the currentMarking.stage === the current stage
                            && this.currentMarking.stageIndex <= index )    // and the currentMarking.stageIndex <= current index
                        && !this.getFlagsSubmitted().resetfromstart         // resetfromstart flag was not set
                      ))
                || ( !this.currentMarking                                   // there is no currentMarking file
                        && index === 0                                      // and the index is 0
                    ));
    }

    public async getFlagsConfig(): Promise<FlagsConfig> {
        
        /*
         * const project = await SfdxProject.resolve();
         * const projectJson = await project.resolveProjectConfig();
         * const myPluginProperties = projectJson.get('myplugin') || {};
         * myPluginProperties.myprop = 'someValue';
         * projectJson.set('myplugin', myPluginProperties);
         * await projectJson.write();
         */

        // const buildStepsConfigurations = this.getBuildStepConfigurations(projectJson, stageToken);
        const buildStepsConfigurations = this.getBuildStepConfigurations(this.getStageToken());
        
        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        let flagsConfigOutput: FlagsConfig = { };

        if ( buildStepsConfigurations ) {
            const stepCreation = async (buildStepConfig) => {
                try {
                    const step: IBuildStep = await bsf.create(buildStepConfig.buildStepType);

                    flagsConfigOutput = { ...flagsConfigOutput, ...step.getFlagsConfig() };

                } catch (e) {
                    throw e;
                }
            }

            await Utils.asyncForEach( buildStepsConfigurations, stepCreation );
        }

        return flagsConfigOutput;
    }

    public async run(): Promise<AnyJson> {

        // const buildStepsConfigurations = AbstractBuildStage.getBuildStepConfigurations(this.projectJson, this.getStageToken());
        const buildStepsConfigurations = this.getBuildStepConfigurations(this.getStageToken());

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        const bsm: BuildStepMarker = await BuildStepMarker.getInstance();

        let buildStepExecutionResponseJson;

        if ( buildStepsConfigurations ) {

            this.currentMarking = await bsm.getMarking(this.orgAlias);

            if (await this.shouldBuildMarkerBeRemoved()) {
                await bsm.removeMarking(this.orgAlias);
            }
            
            const stepCreateAndRun = async (buildStepConfig, index: number) => {
            
                if ( !this.shouldBuildStepExecute(index) ) {
                    return;
                }

                try {
                    const step = await bsf.create(buildStepConfig.buildStepType);

                    this.currentMarking = await bsm.mark(this, index, step, this.orgAlias);

                    buildStepExecutionResponseJson = await BuildStepExecutor.run(this, step, buildStepConfig, this.getFlagsSubmitted().scope);
                } catch (e) {
                    throw e;
                }
            };

            await Utils.asyncForEach( buildStepsConfigurations, stepCreateAndRun );

            // remove the build marker if the current stage is completed.
            //      The currentMarking.stage may not be the current stage's token
            //      when the previous build did not complete and the builder is 
            //      cycling through the various build stages and steps until it 
            //      gets to the build step specified in the build marker.  In that
            //      scenario, the current stage could be a previous stage from the
            //      currentMarking.stage.
            if ( this.currentMarking.stage === this.getStageToken() ) {
                await bsm.removeMarking(this.orgAlias);
            }
        }

        return buildStepExecutionResponseJson;
    }
    public getBuildSteps(): IBuildStep[] {
        throw new Error('Method not implemented.');
    }

    public getUX(): UX {
        return this.ux;
    }

    // TODO: What is the purpose of this command again?  Is this "the flags that were submitted" or is it "the flagsConfig"?
    // tslint:disable-next-line: no-any
    public getFlagsSubmitted(): OutputFlags<any> {
        return this.flagsSubmitted;
    }
}
