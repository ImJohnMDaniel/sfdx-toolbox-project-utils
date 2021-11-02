import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';

export default class ForceApexExecute implements BuildStep {
    public async run(): Promise<AnyJson> {
        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceApexExecute';
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