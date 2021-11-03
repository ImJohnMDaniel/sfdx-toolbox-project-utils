import { BuildStage } from "../../types/build_stage";
import { AnyJson } from '@salesforce/ts-types';
import { BuildStep } from "../../types/build_step";
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import * as _ from 'lodash';
import BuildStepsFactory from "../build_steps_factory";

// TODO: Figure out how to check for a build marker and advance to that point in the process
export default class InitizalizationStage implements BuildStage {

    public static async getInstance(projectJson: SfdxProjectJson, thisUx: UX) {
        return new InitizalizationStage(projectJson, thisUx);
    }

    private projectJson: SfdxProjectJson;
    private ux: UX;

    private constructor(projectJson: SfdxProjectJson, thisUx: UX) {
        this.projectJson = projectJson;
        this.ux = thisUx;
    }

    public async run(): Promise<AnyJson> {
        const buildStepsConfigurations = [];

        // Add the mandatory build step of the actual org create 
        buildStepsConfigurations.push({
            "buildStepType": "ForceOrgCreate",
            "setalias": "foobar"
        });

        const buildStepsConfigurationsFromSFDXProjectJson = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.initialize', false);

        if ( buildStepsConfigurationsFromSFDXProjectJson ) {
            buildStepsConfigurationsFromSFDXProjectJson.forEach(buildStep => {
                buildStepsConfigurations.push(buildStep);
            });
        }

        this.ux.logJson(buildStepsConfigurations);

        const bsf: BuildStepsFactory = await BuildStepsFactory.getInstance();

        buildStepsConfigurations.forEach(async buildStep => {
            this.ux.log(buildStep.buildStepType);
            const step: BuildStep = bsf.create(buildStep.buildStepType);
            // this.ux.log(step.getBuildStepTypeToken());
            step.setParams(buildStep);
            step.setProjectJson(this.projectJson);
            step.setUx(this.ux);
            await step.run();
        });

        return;
    }

    public getBuildSteps(): BuildStep[] {
        throw new Error("Method not implemented.");
    }

}
