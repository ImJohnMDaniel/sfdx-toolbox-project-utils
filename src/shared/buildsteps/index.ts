import ForceApexExecute from './force_apex_execute';
import ForceApexTestRun from './force_apex_test_run';
import ForceDataRecordUpdate from './force_data_record_update';
import ForceMdapiDeploy from './force_mdapi_deploy';
import ForceOrgCreate from './force_org_create';
import ForceOrgDelete from './force_org_delete';
import ForceSourcePush from './force_source_push';
import ForceUserPermsetAssign from './force_user_permset_assign';
import SfdmuRun from './sfdmu_run';
import ThreadedBuildStep from './threaded';
import ToolboxPackageDependenciesInstall from './toolbox_package_dependencies_install';

export default [
    ForceApexExecute,
    ForceApexTestRun,
    ForceDataRecordUpdate,
    ForceMdapiDeploy,
    ForceOrgCreate,
    ForceOrgDelete,
    ForceSourcePush,
    ForceUserPermsetAssign,
    SfdmuRun,
    ThreadedBuildStep,
    ToolboxPackageDependenciesInstall
];
