/*
 * These are the available Scopes allowed for each build step.
 */
export enum BuildStepScope {
    BASIC, // Build step only executed during the developer scope.
    COMPLETE, // Build step run in all execution scopes
    DATALOAD, // Build steps only executed during the DATALOAD scope
    POSTPACKAGEDEPLOY // Build steps executed during the Post Package Deployment scope
}

export type BuildStepScopeStrings = keyof typeof BuildStepScope;

export default class BuildStepScopes {
  public static buildStepScopesDefault(): BuildStepScope {
    return BuildStepScope.BASIC;
  }

  public static get(buildStepAsString: BuildStepScopeStrings): BuildStepScope {
    return BuildStepScope[buildStepAsString as keyof typeof BuildStepScope];
  }

  public static buildStepScopesAsStrings(): string[] {
    const stringIsNumber = value => isNaN(Number(value)) === false;

    // Turn enum into array
    function toArray(enumme): string[] {
      return Object.keys(enumme)
        .filter(stringIsNumber)
        .map(key => enumme[key]);
    }

    return toArray(BuildStepScope);
  }

} 
