import { FlagsConfig } from '@salesforce/command';
import { AbstractBuildStage } from '../../types/build_stage';
import ForceOrgCreate from '../buildsteps/force_org_create';
import ForceOrgDelete from '../buildsteps/force_org_delete';

export default class InitizalizationStage extends AbstractBuildStage {

    public static flagsConfig: FlagsConfig = {
        ...new ForceOrgDelete().getFlagsConfig(),
        ...new ForceOrgCreate().getFlagsConfig()
        // ...new ForceApexExecute().getFlagsConfig(),
        // ...new ForceDataRecordUpdate().getFlagsConfig()
    };

    public getStageToken(): string {
        return 'initialize';
    }
}
