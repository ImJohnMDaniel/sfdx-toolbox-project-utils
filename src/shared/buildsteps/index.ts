import ForceApexExecute from "./force_apex_execute";
import ForceDataRecordUpdate from "./force_data_record_update";
import ForceOrgCreate from "./force_org_create";
import ForceOrgDelete from "./force_org_delete";

export default [
    ForceApexExecute,
    ForceDataRecordUpdate,
    ForceOrgDelete,
    ForceOrgCreate
];

/*
{
    token: new buildstep().getBuildStepTypeToken(),
    stepType: () => new buildstep()
  }
*/