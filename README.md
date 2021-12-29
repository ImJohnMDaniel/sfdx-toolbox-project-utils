@dx-cli-toolbox/sfdx-toolbox-project-utils
==========================================

Various commands to aid with building of SFDX projects

[![Version](https://img.shields.io/npm/v/@dx-cli-toolbox/sfdx-toolbox-project-utils.svg)](https://npmjs.org/package/@dx-cli-toolbox/sfdx-toolbox-project-utils)
[![CircleCI](https://circleci.com/gh/ImJohnMDaniel/sfdx-toolbox-project-utils/tree/master.svg?style=shield)](https://circleci.com/gh/ImJohnMDaniel/sfdx-toolbox-project-utils/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/ImJohnMDaniel/sfdx-toolbox-project-utils?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-toolbox-project-utils/branch/master)
[![Codecov](https://codecov.io/gh/ImJohnMDaniel/sfdx-toolbox-project-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/ImJohnMDaniel/sfdx-toolbox-project-utils)
[![Greenkeeper](https://badges.greenkeeper.io/ImJohnMDaniel/sfdx-toolbox-project-utils.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/ImJohnMDaniel/sfdx-toolbox-project-utils/badge.svg)](https://snyk.io/test/github/ImJohnMDaniel/sfdx-toolbox-project-utils)
[![Downloads/week](https://img.shields.io/npm/dw/@dx-cli-toolbox/sfdx-toolbox-project-utils.svg)](https://npmjs.org/package/@dx-cli-toolbox/sfdx-toolbox-project-utils)
[![License](https://img.shields.io/npm/l/@dx-cli-toolbox/sfdx-toolbox-project-utils.svg)](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g @dx-cli-toolbox/sfdx-toolbox-project-utils
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
@dx-cli-toolbox/sfdx-toolbox-project-utils/0.0.7 darwin-x64 node-v17.0.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx toolbox:project:build -s -a <string> [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectbuild--s--a-string--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:build:configure [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectbuildconfigure---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:dataload [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectdataload--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:postpackage:deploy [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectpostpackagedeploy--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagecompilation---scope-basiccompletedataloadpostpackagedeploy--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:initialization -s -a <string> [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstageinitialization--s--a-string---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:processresources [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstageprocessresources---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagetest---scope-basiccompletedataloadpostpackagedeploy--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:validation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagevalidation---scope-basiccompletedataloadpostpackagedeploy---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx toolbox:project:build -s -a <string> [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project build command description

```
USAGE
  $ sfdx toolbox:project:build -s -a <string> [-v <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --setalias=setalias                                                           (required) alias for the created org

  -s, --setdefaultusername                                                          (required) set the created org as
                                                                                    the default username

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  TODO toolbox project build examples description
```

_See code: [src/commands/toolbox/project/build.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/build.ts)_

## `sfdx toolbox:project:build:configure [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project build configure command description

```
USAGE
  $ sfdx toolbox:project:build:configure [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  TODO toolbox project build configure examples description
```

_See code: [src/commands/toolbox/project/build/configure.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/build/configure.ts)_

## `sfdx toolbox:project:dataload [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project dataload command description

```
USAGE
  $ sfdx toolbox:project:dataload [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  TODO toolbox project dataload examples description
```

_See code: [src/commands/toolbox/project/dataload.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/dataload.ts)_

## `sfdx toolbox:project:postpackage:deploy [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project postpackage deploy command description

```
USAGE
  $ sfdx toolbox:project:postpackage:deploy [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  TODO toolbox project postpackage deploy examples description
```

_See code: [src/commands/toolbox/project/postpackage/deploy.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/postpackage/deploy.ts)_

## `sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage compilation command description

```
USAGE
  $ sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)                               [default: BASIC] Which scope the
                                                                                    command will execute under.

EXAMPLE
  TODO toolbox project stage compilation examples description
```

_See code: [src/commands/toolbox/project/stage/compilation.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/stage/compilation.ts)_

## `sfdx toolbox:project:stage:initialization -s -a <string> [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage initialization command description

```
USAGE
  $ sfdx toolbox:project:stage:initialization -s -a <string> [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v 
  <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --setalias=setalias                                                           (required) alias for the created org

  -s, --setdefaultusername                                                          (required) set the created org as
                                                                                    the default username

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)                               [default: BASIC] Which scope the
                                                                                    command will execute under.

EXAMPLE
  TODO toolbox project stage initialization examples description
```

_See code: [src/commands/toolbox/project/stage/initialization.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/stage/initialization.ts)_

## `sfdx toolbox:project:stage:processresources [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage processresources command description

```
USAGE
  $ sfdx toolbox:project:stage:processresources [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u 
  <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)                               [default: BASIC] Which scope the
                                                                                    command will execute under.

EXAMPLE
  TODO toolbox project stage processresources examples description
```

_See code: [src/commands/toolbox/project/stage/processresources.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/stage/processresources.ts)_

## `sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage testing command description

```
USAGE
  $ sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)                               [default: BASIC] Which scope the
                                                                                    command will execute under.

EXAMPLE
  TODO toolbox project stage testing examples description
```

_See code: [src/commands/toolbox/project/stage/test.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/stage/test.ts)_

## `sfdx toolbox:project:stage:validation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage validation command description

```
USAGE
  $ sfdx toolbox:project:stage:validation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)                               [default: BASIC] Which scope the
                                                                                    command will execute under.

EXAMPLE
  TODO toolbox project stage validation examples description
```

_See code: [src/commands/toolbox/project/stage/validation.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.7/src/commands/toolbox/project/stage/validation.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
