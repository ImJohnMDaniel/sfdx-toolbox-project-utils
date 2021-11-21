import { FlagsConfig, UX } from '@salesforce/command';
import { SfdxProjectJson } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
export interface IBuildStep {
    run(): Promise<AnyJson>;
    // setLogger({}): void;
    getBuildStepTypeToken(): string;
    // tslint:disable-next-line: no-any
    setParams(params: any): void;
    setUx(thisUx: UX): void;
    setProjectJson(projectJson: SfdxProjectJson): void;
    getSFDXProjectConfigureExample(): string;
    // validateParams(): boolean;
    setJsonOutputActive(): void;
    setOrgAlias(orgAlias: string): void;
    getFlagsConfig(): FlagsConfig;
}

export abstract class AbstractBuildStep implements IBuildStep {
    protected projectJson: SfdxProjectJson;
    protected ux: UX;
    // tslint:disable-next-line: no-any
    protected params: any;
    protected orgAlias: string;
    protected jsonOutput: boolean;
    public abstract run(): Promise<AnyJson>;
    public abstract getBuildStepTypeToken(): string;
    public abstract getSFDXProjectConfigureExample(): string;
    public abstract getFlagsConfig(): FlagsConfig;

    public setProjectJson(projectJson: SfdxProjectJson): void {
        this.projectJson = projectJson;
    }

    public setUx(thisUx: UX): void {
        this.ux = thisUx;
    }

    // tslint:disable-next-line: no-any
    public setParams(params: any): void {
        this.params = params;
    }

    public setJsonOutputActive(): void {
        this.jsonOutput = true;
    }

    public setOrgAlias(orgAlias: string): void {
        this.orgAlias = orgAlias;
    }
}
