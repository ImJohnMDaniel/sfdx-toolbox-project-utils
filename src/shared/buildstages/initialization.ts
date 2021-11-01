import { BuildStage } from "../../types/build_stage";
import { AnyJson } from '@salesforce/ts-types';
import { BuildStep } from "../../types/build_step";
import { SfdxProjectJson } from "@salesforce/core";
import { UX } from "@salesforce/command";
import * as _ from 'lodash';

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

    public async setSfdxProjectJson(projectJson: SfdxProjectJson): Promise<BuildStage> {
        this.projectJson = projectJson;
        return this;
    }

    public async run(): Promise<AnyJson> {
        const stageInitializeBuildSteps = _.get(this.projectJson['contents'], 'plugins.toolbox.project.builder.stages.initialize', false);

        this.ux.logJson(stageInitializeBuildSteps);

        return;
    }
    
    public getBuildSteps(): BuildStep[] {
        throw new Error("Method not implemented.");
    }
    
}