import { BuildStep } from "./build_step";
import { AnyJson } from '@salesforce/ts-types';
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import * as _ from 'lodash';
import BuildStepsFactory from "../shared/build_steps_factory";
import Utils from "../shared/utils";

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

    // TODO: Figure out how to check for a build marker and advance to that point in the process
    public async run(): Promise<AnyJson> {
        const buildStepsConfigurations = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.' + this.getStageToken(), false);

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        if ( buildStepsConfigurations ) {
            
            const stepCreateAndRun = async (buildStep) => {
                let step;

                try {
                    step = await bsf.create(buildStep.buildStepType);
                    step?.setParams(buildStep);
                    step?.setProjectJson(this.projectJson);
                    step?.setUx(this.ux);
                    step?.setJsonOutputActive();
                    step?.setOrgAlias(this.orgAlias);
                    await step?.run();
                }
                catch (e){
                    throw e;
                }
            };
            
            await Utils.asyncForEach( buildStepsConfigurations, stepCreateAndRun );
        }

        return;
    }
    public getBuildSteps(): BuildStep[] {
        throw new Error("Method not implemented.");
    }
}