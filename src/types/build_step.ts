import { AnyJson } from '@salesforce/ts-types';
export interface BuildStep {
    run(): Promise<AnyJson>;
    // setLogger({}): void;
    getBuildStepTypeToken(): string;
    setParams(params: any): any; 
    getSFDXProjectConfigureExample(): string;
    // validateParams(): boolean;
}