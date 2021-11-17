import { UX } from "@salesforce/command";
import { SfdxProjectJson } from "@salesforce/core";
import { BuildStep } from "../types/build_step";

export default class BuildStepExecutor {

    public static async run(step: BuildStep, buildStepConfig: any, projectJson: SfdxProjectJson, orgAlias: string, thisUx: UX) {

        try {
            step?.setParams(buildStepConfig);
            step?.setProjectJson(projectJson);
            step?.setUx(thisUx);
            step?.setJsonOutputActive();
            step?.setOrgAlias(orgAlias);

            await step?.run();
        }
        catch (e){
            throw e;
        }
    }
}