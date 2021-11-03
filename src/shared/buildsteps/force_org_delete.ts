import { BuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { OrgDeleteCommand } from 'salesforce-alm/dist/commands/force/org/delete';
import { FlagsConfig } from "@salesforce/command";

export default class ForceOrgDelete implements BuildStep {

    protected static flagsConfig: FlagsConfig = OrgDeleteCommand.flagsConfig;

    private params: any;

    public async run(): Promise<AnyJson> {

        const args = [];
        
        const orgCreationResultJson = await OrgDeleteCommand.run(args);

        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'ForceOrgDelete';
    }
    
    public setParams(params: any) {
        this.params = params;
    }

    public getSFDXProjectConfigureExample(): string {
        return ''
    }

    // validateParams(): boolean {
    //     throw new Error("Method not implemented.");
    // }
}