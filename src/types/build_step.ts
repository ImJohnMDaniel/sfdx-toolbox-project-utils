import { AnyJson } from '@salesforce/ts-types';
export interface BuildStep {
    run(): Promise<AnyJson>;
    // setLogger({}): void;
    getBuildStepTypeToken(): String;
    setParams(params: any): any; 
    getSFDXProjectConfigureExample(): String;
    validateParams(): boolean;
}