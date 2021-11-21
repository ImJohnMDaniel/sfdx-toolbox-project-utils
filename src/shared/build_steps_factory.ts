import { IBuildStep } from '../types/build_step';
import buildsteps from './buildsteps';

export default class BuildStepsFactory {

    public static async getInstance() {
        if (BuildStepsFactory.theInstance == null ) {
            this.theInstance = new BuildStepsFactory();
        }
        return BuildStepsFactory.theInstance;
    }

    private static theInstance: BuildStepsFactory;

    // tslint:disable-next-line: no-any
    private availableBuildSteps: Map<string, any> = new Map<string, any>();

    private constructor() {
        buildsteps.map(buildstep => (
            this.availableBuildSteps.set(new buildstep().getBuildStepTypeToken(), buildstep)
        ));
    }

    public async create( token: string ): Promise<IBuildStep> {
        if ( ! this.availableBuildSteps.has(token) ) {
            throw new Error("Unable to create '" + token + "' as it is not a valid BuildStep.");
        }
        return new (this.availableBuildSteps.get(token))();
    }
}
