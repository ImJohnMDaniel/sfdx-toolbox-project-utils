import { AbstractBuildStage } from '../../types/build_stage';

export default class InitizalizationStage extends AbstractBuildStage {
    public getStageToken(): string {
        return 'initialize';
    }
}
