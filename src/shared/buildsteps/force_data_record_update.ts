import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig } from "@salesforce/command";
import Update from "@salesforce/plugin-data/lib/commands/force/data/record/update"

export default class ForceDataRecordUpdate implements BuildStep {

    protected static flagsConfig: FlagsConfig = Update.flagsConfig;
    
    private params: any;
    
    public async run(): Promise<AnyJson> {

        const args = [];

        const dataRecordUpdateResultJson = await Update.run(args);

        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceDataRecordUpdate';
    }
    setParams(params: any) {
        this.params = params;
    }

    getSFDXProjectConfigureExample(): string {
        return ''
    }

    validateParams(): boolean {
        throw new Error("Method not implemented.");
    }
}