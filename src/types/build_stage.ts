import { BuildStep } from "./build_step";
import { AnyJson } from '@salesforce/ts-types';
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import * as _ from 'lodash';
import BuildStepsFactory from "../shared/build_steps_factory";
import Utils from "../shared/utils";
import BuildStepMarker, { BuildMarking } from "../shared/build_step_marker";

export interface BuildStage {
    run(): Promise<AnyJson>;
    getBuildSteps(): BuildStep[];
    getStageToken(): string;
}

export abstract class AbstractBuildStage implements BuildStage {

    private projectJson: SfdxProjectJson;
    private ux: UX;
    private orgAlias: string;

    abstract getStageToken(): string;

    public constructor(projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX) {
        this.projectJson = projectJson;
        this.ux = thisUx;
        this.orgAlias = orgAlias;
    }

    public async run(): Promise<AnyJson> {
        const buildStepsConfigurations = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.' + this.getStageToken(), false);

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        const bsm: BuildStepMarker = await BuildStepMarker.getInstance();

        if ( buildStepsConfigurations ) {
            
            const currentMarking: BuildMarking = await bsm.getMarkering(this.orgAlias);

            const stepCreateAndRun = async (buildStep, index: number) => {

                // this.ux.log('currentMarking.stage == ' + currentMarking?.stage);
                // this.ux.log('this.getStageToken() == ' + this.getStageToken());
                // this.ux.log('currentMarking.stageIndex == ' + currentMarking?.stageIndex);
                // this.ux.log('index == ' + index);
                if ( currentMarking 
                        && currentMarking.stage == this.getStageToken()
                        && currentMarking.stageIndex > index
                        ) {
                    return;
                }

                try {
                    const step = await bsf.create(buildStep.buildStepType);
                    step?.setParams(buildStep);
                    step?.setProjectJson(this.projectJson);
                    step?.setUx(this.ux);
                    step?.setJsonOutputActive();
                    step?.setOrgAlias(this.orgAlias);

                    await (bsm).mark(this, index, step, this.orgAlias);

                    await step?.run();
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
    public getBuildSteps(): BuildStep[] {
        throw new Error("Method not implemented.");
    }
}