import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { IBuildStage } from "../types/build_stage";
import { BuildStep } from "../types/build_step";

export interface BuildMarking {
    stage: string;
    stageIndex: number;
    step: string;
}

export default class BuildStepMarker {

    private markerFilePrefixName: string = 'project-build-marker-';
    private markerDirectoryName: string = 'temp';
    private static theInstance: BuildStepMarker;

    public static async getInstance() {
        if (BuildStepMarker.theInstance == null ) {
            this.theInstance = new BuildStepMarker();
        }
        return BuildStepMarker.theInstance;
    }

    private constructor() {

    }

    private getMarkerFilename(orgAlias: string): string {
        return this.markerDirectoryName + '/' + this.markerFilePrefixName + orgAlias;
    }

    public async mark( stage: IBuildStage, stageIndex: number, step: BuildStep, orgAlias: string) {
        const markerInfo: BuildMarking = {
            stage: stage.getStageToken(),
            stageIndex: stageIndex,
            step: step.getBuildStepTypeToken()
        };

        // console.log('BuildStepMarker.mark called for ' + markerInfo.stage + ':' + markerInfo.stageIndex + ' -- ' + markerInfo.step );

        if (!existsSync(this.markerDirectoryName)) {
            mkdirSync(this.markerDirectoryName);
        }
        
        await writeFileSync( this.getMarkerFilename(orgAlias), JSON.stringify(markerInfo));
    }

    public async getMarkering(orgAlias: string): Promise<BuildMarking> {
        if ( !existsSync(this.getMarkerFilename(orgAlias)) ) {
            return null;
        }

        const marking: BuildMarking = JSON.parse(readFileSync(this.getMarkerFilename(orgAlias), 'utf8'));
        return marking;
    }

    public async removeMarking(orgAlias: string) {
        unlinkSync(this.getMarkerFilename(orgAlias));
    }
}