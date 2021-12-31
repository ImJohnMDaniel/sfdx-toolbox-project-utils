import { FlagsConfig } from '@salesforce/command';
import { AbstractBuildStage } from '../../types/build_stage';

export default class TestStage extends AbstractBuildStage {
    public static flagsConfig: FlagsConfig = {
        // ...new ForceUserPermsetAssign().getFlagsConfig(),
        // ...new SfdmuRun().getFlagsConfig(),
        // ...new ForceApexTestRun().getFlagsConfig()
    };

    public getStageToken(): string {
        return 'test';
    }
}
