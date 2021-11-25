/*
 * These are the available Scopes allowed for each build step.
 */
export enum BuildStepScope {
    ALL, // Build step run in all execution scopes
    CI, // Build step only executed during CI scope
    DEV, // Build step only executed during the DEVeloper scope
    DATALOAD, // Build steps only executed during the DATALOAD scope
    POSTPACKAGEDEPLOY // Build steps executed during the Post Package Deployment scope
}
