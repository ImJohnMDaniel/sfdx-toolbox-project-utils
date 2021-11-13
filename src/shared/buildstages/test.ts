import { AbstractBuildStage } from "../../types/build_stage";

export default class TestStage extends AbstractBuildStage {
    public getStageToken(): string {
        return 'test';
    }
}
