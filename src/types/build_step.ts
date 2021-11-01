export interface BuildStep {
    run(): void;
    // setLogger({}): void;
    getBuildStepTypeToken(): String;
    setParams(params: any): any; 
    getSFDXProjectInitializeExample(): String;
    validateParams(): boolean;
}