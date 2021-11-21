import { IBuildStep } from "./build_step";
import { AnyJson } from '@salesforce/ts-types';
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import { OutputFlags } from '@oclif/parser';
import * as _ from 'lodash';
import BuildStepsFactory from "../shared/build_steps_factory";
import Utils from "../shared/utils";
import BuildStepMarker, { BuildMarking } from "../shared/build_step_marker";
import BuildStepExecutor from "../shared/build_step_executor";

export interface IBuildStage {
    getBuildSteps(): IBuildStep[];
    getFlags(): OutputFlags<any>;
    getProjectJson(): SfdxProjectJson;
    getStageToken(): string;
    getUX(): UX;
    run(): Promise<AnyJson>;
}

export interface ICarriesStageable {
    setCurrentStage(currentStage: IBuildStage): void;
}

export abstract class AbstractBuildStage implements IBuildStage {

    private readonly projectJson: SfdxProjectJson;
    private ux: UX;
    private orgAlias: string;
    private readonly flags: OutputFlags<any>;

    abstract getStageToken(): string;

    public constructor(projectJson: SfdxProjectJson, thisUx: UX, flags: OutputFlags<any>) {
        this.projectJson = projectJson;
        this.ux = thisUx;
        this.orgAlias = flags.setalias;
        this.flags = flags;
    }

    public async run(): Promise<AnyJson> {

        const buildStepsConfigurations = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.' + this.getStageToken(), false);

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        const bsm: BuildStepMarker = await BuildStepMarker.getInstance();

        if ( buildStepsConfigurations ) {
            
            const currentMarking: BuildMarking = await bsm.getMarkering(this.orgAlias);

            const stepCreateAndRun = async (buildStepConfig, index: number) => {

                if ( currentMarking 
                        && currentMarking.stage == this.getStageToken()
                        && currentMarking.stageIndex > index ) 
                {
                    return;
                }

                try {
                    // console.log(buildStepConfig);
                    const step = await bsf.create(buildStepConfig.buildStepType);

                    await bsm.mark(this, index, step, this.orgAlias);

                    await BuildStepExecutor.run(this, step, buildStepConfig);
                }
                catch (e){
                    throw e;
                }
            };
            
            await Utils.asyncForEach( buildStepsConfigurations, stepCreateAndRun );

            await bsm.removeMarking(this.orgAlias);
        }

        return;
    }
    public getBuildSteps(): IBuildStep[] {
        throw new Error("Method not implemented.");
    }

    public getProjectJson(): SfdxProjectJson {
        return this.projectJson;
    }

    public getUX(): UX {
        return this.ux;
    }

    public getFlags(): OutputFlags<any> {
        return this.flags;
    }
}