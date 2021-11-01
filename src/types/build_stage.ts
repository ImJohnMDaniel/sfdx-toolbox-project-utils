import { BuildStep } from "./build_step";

export interface BuildStage {
    run(): void;
    getBuildSteps(): BuildStep[];
}