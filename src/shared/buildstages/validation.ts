import { FlagsConfig } from '@salesforce/command';
import { AbstractBuildStage } from '../../types/build_stage';

export default class ValidationStage extends AbstractBuildStage {
    public static flagsConfig: FlagsConfig = {
        // ...new ForceUserPermsetAssign().getFlagsConfig(),
        // ...new SfdmuRun().getFlagsConfig(),
        // ...new ForceApexTestRun().getFlagsConfig()
    };

    public getStageToken(): string {
        return 'validation';
    }
}
// TODO - Need to implement validation of "toolbox.project.*" JSON section of sfdx-project.json
