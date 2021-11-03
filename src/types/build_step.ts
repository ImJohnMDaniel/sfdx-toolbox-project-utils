import { UX } from '@salesforce/command';
import { SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
export interface BuildStep {
    run(): Promise<AnyJson>;
    // setLogger({}): void;
    getBuildStepTypeToken(): string;
    setParams(params: any): void; 
    setUx(thisUx: UX): void;
    setProjectJson(projectJson: SfdxProjectJson): void;
    getSFDXProjectConfigureExample(): string;
    // validateParams(): boolean;
}

export abstract class AbstractBuildStep implements BuildStep {
    abstract run(): Promise<AnyJson>;
    abstract getBuildStepTypeToken(): string;
    abstract getSFDXProjectConfigureExample(): string;

    protected projectJson: SfdxProjectJson;
    protected ux: UX;
    protected params: any;
    setProjectJson(projectJson: SfdxProjectJson): void {
        this.projectJson = projectJson;
    }

    setUx(thisUx: UX): void {
        this.ux = thisUx;
    }

    setParams(params: any): void {
        this.params = params;
    }

}