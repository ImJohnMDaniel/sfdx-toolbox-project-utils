import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';

export default class ForceOrgDelete implements BuildStep {
    public async run(): Promise<AnyJson> {
        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceOrgDelete';
    }
    setParams(params: any) {
        throw new Error("Method not implemented.");
    }

    getSFDXProjectConfigureExample(): string {
        return ''
    }

    validateParams(): boolean {
        throw new Error("Method not implemented.");
    }
}