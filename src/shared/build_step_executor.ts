import { UX } from "@salesforce/command";
import { SfdxProjectJson } from "@salesforce/core";
import { BuildStep } from "../types/build_step";
import { OutputFlags } from '@oclif/parser';
import { BuildStage } from "../types/build_stage";

export default class BuildStepExecutor {

    public static async run(stage: BuildStage, step: BuildStep, buildStepConfig: any) {

        // projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX, flags: OutputFlags<any>


        console.log('++++++++++++++++++++++++');
        console.log('       buildStepConfig');
        console.log(buildStepConfig);
        console.log('++++++++++++++++++++++++');
        console.log('       flags');
        console.log(stage.getFlags());
        console.log('++++++++++++++++++++++++');

        try {
            step?.setParams(buildStepConfig);
            // step?.setProjectJson(projectJson);
            step?.setProjectJson(stage.getProjectJson());
            step?.setUx(stage.getUX());
            step?.setJsonOutputActive();
            step?.setOrgAlias(stage.getFlags().setalias);

            // await step?.run();
        }
        catch (e){
            throw e;
        }
    }

    private static mergeBuildStepConfigAndFlags() {

    }
}