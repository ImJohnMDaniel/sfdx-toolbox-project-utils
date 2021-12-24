
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

        if ( buildStepsConfigurations ) {

            const currentMarking: BuildMarking = await bsm.getMarkering(this.orgAlias);

            const stepCreateAndRun = async (buildStepConfig, index: number) => {

                if ( currentMarking
                        && currentMarking.stage === this.getStageToken()
                        && currentMarking.stageIndex > index ) {
                    return;
                }

                try {
                    // console.log(buildStepConfig);
                    const step = await bsf.create(buildStepConfig.buildStepType);

                    await bsm.mark(this, index, step, this.orgAlias);

                    await BuildStepExecutor.run(this, step, buildStepConfig, this.getFlagsSubmitted().scope);
                } catch (e) {
                    throw e;
                }
            };

            await Utils.asyncForEach( buildStepsConfigurations, stepCreateAndRun );

            await bsm.removeMarking(this.orgAlias);
        }

        return;
    }
    public getBuildSteps(): IBuildStep[] {
        throw new Error('Method not implemented.');
    }

    // public getProjectJson(): SfdxProjectJson {
    //     return this.projectJson;
    // }

    public getUX(): UX {
        return this.ux;
    }

    // TODO: What is the purpose of this command again?  Is this "the flags that were submitted" or is it "the flagsConfig"?
    // tslint:disable-next-line: no-any
    public getFlagsSubmitted(): OutputFlags<any> {
        return this.flagsSubmitted;
    }
}
