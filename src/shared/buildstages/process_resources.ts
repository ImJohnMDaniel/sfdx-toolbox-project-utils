import { AbstractBuildStage } from "../../types/build_stage";

export default class ProcessResourcessStage extends AbstractBuildStage {
    public getStageToken(): string {
        return 'processResources';
    }
}
