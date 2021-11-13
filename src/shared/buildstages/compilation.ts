import { AbstractBuildStage } from "../../types/build_stage";

export default class CompilationStage extends AbstractBuildStage {
    public getStageToken(): string {
        return 'compilation';
    }
}
