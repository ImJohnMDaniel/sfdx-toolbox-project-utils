import { BuildStep } from "./build_step";
import { AnyJson } from '@salesforce/ts-types';
export interface BuildStage {
    run(): Promise<AnyJson>;
    getBuildSteps(): BuildStep[];
}