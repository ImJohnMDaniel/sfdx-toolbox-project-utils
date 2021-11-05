import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig } from "@salesforce/command";
import Update from "@salesforce/plugin-data/lib/commands/force/data/record/update"

export default class ForceDataRecordUpdate extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = Update.flagsConfig;
    
    public async run(): Promise<AnyJson> {

        const args = [];

        const dataRecordUpdateResultJson = await Update.run(args);

        return;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceDataRecordUpdate';
    }
    getSFDXProjectConfigureExample(): string {
        return ''
    }
}