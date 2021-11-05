import { AbstractBuildStep } from "../../types/build_step";
import { AnyJson } from '@salesforce/ts-types';
import { FlagsConfig } from "@salesforce/command";
import { rmdirSync } from "fs";
import { tmpdir } from "os";

/*
    
 */
export default class RemoveTempShapeDirectory extends AbstractBuildStep {

    protected static flagsConfig: FlagsConfig = {};

    public async run(): Promise<AnyJson> {

        try {
            rmdirSync( tmpdir() + '/shape' );
        }
        catch (e) {
            // noopt
        }
        
        return;
    }
    
    public getBuildStepTypeToken(): string {
        return 'RemoveTempShapeDirectory';
    }
    
    public getSFDXProjectConfigureExample(): string {
        return ''
    }
}