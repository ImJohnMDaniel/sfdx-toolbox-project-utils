import { BuildStage } from "../../types/build_stage";
import { AnyJson } from '@salesforce/ts-types';
import { BuildStep } from "../../types/build_step";
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import * as _ from 'lodash';
import BuildStepsFactory from "../build_steps_factory";
import Utils from "../utils";

// TODO: Figure out how to check for a build marker and advance to that point in the process
export default class InitizalizationStage implements BuildStage {

    public static async getInstance(projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX) {
        return new InitizalizationStage(projectJson, orgAlias, thisUx);
    }

    private projectJson: SfdxProjectJson;
    private ux: UX;
    private orgAlias: string;

    private constructor(projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX) {
        this.projectJson = projectJson;
        this.ux = thisUx;
        this.orgAlias = orgAlias;
    }

    public async run(): Promise<AnyJson> {
        const buildStepsConfigurations = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.initialize', false);

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
