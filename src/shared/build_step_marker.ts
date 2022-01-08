import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { IBuildStage } from '../types/build_stage';
import { IBuildStep } from '../types/build_step';

export interface BuildMarking {
    stage: string;
    stageIndex: number;
    step: string;
}

export default class BuildStepMarker {

    public static async getInstance() {
        if (BuildStepMarker.theInstance == null ) {
            this.theInstance = new BuildStepMarker();
        }
        return BuildStepMarker.theInstance;
    }

    private static theInstance: BuildStepMarker;

    private markerFilePrefixName: string = 'project-build-marker-';
    private markerDirectoryName: string = 'temp';

    private constructor() {

    }

    public async mark( stage: IBuildStage, stageIndex: number, step: IBuildStep, orgAlias: string): Promise<BuildMarking> {
        const markerInfo: BuildMarking = {
            stage: stage.getStageToken(),
            // tslint:disable-next-line: object-literal-shorthand
            stageIndex: stageIndex,
            step: step.getBuildStepTypeToken()
        };

        // console.log('BuildStepMarker.mark called for ' + markerInfo.stage + ':' + markerInfo.stageIndex + ' -- ' + markerInfo.step );

        if (!existsSync(this.markerDirectoryName)) {
            mkdirSync(this.markerDirectoryName);
        }

        await writeFileSync( this.getMarkerFilename(orgAlias), JSON.stringify(markerInfo));

        return markerInfo;
    }

    public async getMarking(orgAlias: string): Promise<BuildMarking> {
        if ( !existsSync(this.getMarkerFilename(orgAlias)) ) {
            return null;
        }
        try {
            return JSON.parse(readFileSync(this.getMarkerFilename(orgAlias), 'utf8')) as BuildMarking;
        } catch (e) {
            return null;
        }
    }

    public async removeMarking(orgAlias: string) {
        unlinkSync(this.getMarkerFilename(orgAlias));
    }

    private getMarkerFilename(orgAlias: string): string {
        return this.markerDirectoryName + '/' + this.markerFilePrefixName + orgAlias;
    }
}
