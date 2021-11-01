import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';

export default class ForceOrgDelete implements BuildStep {
    public async run(): Promise<AnyJson> {
        return;
    }
    getBuildStepTypeToken(): String {
        throw new Error("Method not implemented.");
    }
    setParams(params: any) {
        throw new Error("Method not implemented.");
    }

    getSFDXProjectConfigureExample(): String {
        return ''
    }

    validateParams(): boolean {
        throw new Error("Method not implemented.");
    }
}