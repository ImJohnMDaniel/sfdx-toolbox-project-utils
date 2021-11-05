import { BuildStep } from '../types/build_step';
import buildsteps from './buildsteps';

export default class BuildStepsFactory {
    private availableBuildSteps: Map<String, any> = new Map<String, any>();

    private static theInstance: BuildStepsFactory;
    
    public static async getInstance() {
        if (BuildStepsFactory.theInstance == null ) {
            this.theInstance = new BuildStepsFactory();
        }
        return BuildStepsFactory.theInstance;
    }
    
    private constructor() {
        buildsteps.map(buildstep => (
            this.availableBuildSteps.set(new buildstep().getBuildStepTypeToken(), buildstep)
        ));
    }

    public async create( token: String ): Promise<BuildStep> {

        if ( ! this.availableBuildSteps.has(token) ) {
            throw new Error("Unable to create '" + token + "' as it is not a valid BuildStep.");
        }
        return new (this.availableBuildSteps.get(token))();
    }
}