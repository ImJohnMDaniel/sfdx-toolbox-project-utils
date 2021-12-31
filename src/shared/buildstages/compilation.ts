import { FlagsConfig } from '@salesforce/command';
import { AbstractBuildStage } from '../../types/build_stage';

export default class CompilationStage extends AbstractBuildStage {
    public static flagsConfig: FlagsConfig = {
        // ...new ForceSourcePush().getFlagsConfig(),
        // ...new ForceApexExecute().getFlagsConfig(),
        // ...new ForceMdapiDeploy().getFlagsConfig(),
        // ...new ForceCommunityPublish().getFlagsConfig()
    };

    public getStageToken(): string {
        return 'compilation';
    }
}
