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
@dx-cli-toolbox/sfdx-toolbox-project-utils/0.0.9 darwin-x64 node-v17.0.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx toolbox:project:build -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-w <number>] [-d <integer>] [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectbuild--s--a-string--p--t-scratchsandbox--f-filepath--n--c--i-string--w-number--d-integer--a-allpackage--b-string---dryrun--k-string---noprecheck--p--s-allusersadminsonly--t-deprecateonlymixeddelete--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:build:configure [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectbuildconfigure---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:dataload [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectdataload--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:postpackage:deploy [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectpostpackagedeploy--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagecompilation---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:initialization -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-w <minutes>] [-d <integer>] [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstageinitialization--s--a-string--p--t-scratchsandbox--f-filepath--n--c--i-string--w-minutes--d-integer---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:processresources [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-w <number>] [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstageprocessresources--a-allpackage--b-string---dryrun--k-string---noprecheck--p--s-allusersadminsonly--t-deprecateonlymixeddelete--w-number---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagetest---scope-basiccompletedataloadpostpackagedeploy--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx toolbox:project:stage:validation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-toolboxprojectstagevalidation---scope-basiccompletedataloadpostpackagedeploy---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx toolbox:project:build -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-w <number>] [-d <integer>] [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project build command description

```
USAGE
  $ sfdx toolbox:project:build -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-w 
  <number>] [-d <integer>] [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s 
  AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-v <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --apexcompile=(all|package)
      [default: all] compile all Apex in the org and package, or only Apex in the package

  -a, --setalias=setalias
      (required) alias for the created org

  -b, --branch=branch
      For dependencies specified by package/versionNumber combination, you can specify the branch group of builds to work
      from by entering the branch build name.  If not specified, the builds from NULL branch will be considered.

  -c, --noancestors
      do not include second-generation package ancestors in the scratch org

  -d, --durationdays=durationdays
      duration of the scratch org (in days) (default:7, min:1, max:30)

  -f, --definitionfile=definitionfile
      path to an org definition file

  -i, --clientid=clientid
      connected app consumer key; not supported for sandbox org creation

  -k, --installationkeys=installationkeys
      Installation key for key-protected packages (format is 1:MyPackage1Key 2: 3:MyPackage3Key... to allow some packages
      without installation key)

  -n, --nonamespace
      create the scratch org with no namespace

  -p, --noprompt
      no prompt to confirm deletion

  -p, --prompt
      Require approval to allow Remote Site Settings and Content Security Policy websites to send or receive data

  -s, --securitytype=(AllUsers|AdminsOnly)
      [default: AdminsOnly] security access type for the installed package

  -s, --setdefaultusername
      (required) set the created org as the default username

  -t, --type=(scratch|sandbox)
      [default: scratch] type of org to create

  -t, --upgradetype=(DeprecateOnly|Mixed|Delete)
      [default: Mixed] the upgrade type for the package installation; available only for unlocked packages

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  -w, --wait=wait
      Number of minutes to wait for installation status (also used for publishwait). Default is 10

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --dryrun
      Allows the command to execute and display result information without actually performing the package installations.
      Useful if debugging.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --noprecheck
      Allows the command to bypass the pre-check of the target org and force install all packages even if they are already
      installed.

EXAMPLE
  TODO toolbox project build examples description
```

_See code: [src/commands/toolbox/project/build.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/build.ts)_

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

_See code: [src/commands/toolbox/project/build/configure.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/build/configure.ts)_

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

_See code: [src/commands/toolbox/project/dataload.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/dataload.ts)_

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

_See code: [src/commands/toolbox/project/postpackage/deploy.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/postpackage/deploy.ts)_

## `sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage compilation command description

```
USAGE
  $ sfdx toolbox:project:stage:compilation [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u 
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
  TODO toolbox project stage compilation examples description
```

_See code: [src/commands/toolbox/project/stage/compilation.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/stage/compilation.ts)_

## `sfdx toolbox:project:stage:initialization -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i <string>] [-w <minutes>] [-d <integer>] [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage initialization command description

```
USAGE
  $ sfdx toolbox:project:stage:initialization -s -a <string> [-p] [-t scratch|sandbox] [-f <filepath>] [-n] [-c] [-i 
  <string>] [-w <minutes>] [-d <integer>] [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u 
  <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --setalias=setalias                                                           (required) alias for the created org

  -c, --noancestors                                                                 do not include second-generation
                                                                                    package ancestors in the scratch org

  -d, --durationdays=durationdays                                                   duration of the scratch org (in
                                                                                    days) (default:7, min:1, max:30)

  -f, --definitionfile=definitionfile                                               path to an org definition file

  -i, --clientid=clientid                                                           connected app consumer key; not
                                                                                    supported for sandbox org creation

  -n, --nonamespace                                                                 create the scratch org with no
                                                                                    namespace

  -p, --noprompt                                                                    no prompt to confirm deletion

  -s, --setdefaultusername                                                          (required) set the created org as
                                                                                    the default username

  -t, --type=(scratch|sandbox)                                                      [default: scratch] type of org to
                                                                                    create

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  -w, --wait=wait                                                                   [default: [object Object]] the
                                                                                    streaming client socket timeout (in
                                                                                    minutes)

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

_See code: [src/commands/toolbox/project/stage/initialization.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/stage/initialization.ts)_

## `sfdx toolbox:project:stage:processresources [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] [-p] [-s AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-w <number>] [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage processresources command description

```
USAGE
  $ sfdx toolbox:project:stage:processresources [-a all|package] [-b <string>] [--dryrun] [-k <string>] [--noprecheck] 
  [-p] [-s AllUsers|AdminsOnly] [-t DeprecateOnly|Mixed|Delete] [-w <number>] [--scope 
  BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -a, --apexcompile=(all|package)
      [default: all] compile all Apex in the org and package, or only Apex in the package

  -b, --branch=branch
      For dependencies specified by package/versionNumber combination, you can specify the branch group of builds to work
      from by entering the branch build name.  If not specified, the builds from NULL branch will be considered.

  -k, --installationkeys=installationkeys
      Installation key for key-protected packages (format is 1:MyPackage1Key 2: 3:MyPackage3Key... to allow some packages
      without installation key)

  -p, --prompt
      Require approval to allow Remote Site Settings and Content Security Policy websites to send or receive data

  -s, --securitytype=(AllUsers|AdminsOnly)
      [default: AdminsOnly] security access type for the installed package

  -t, --upgradetype=(DeprecateOnly|Mixed|Delete)
      [default: Mixed] the upgrade type for the package installation; available only for unlocked packages

  -u, --targetusername=targetusername
      username or alias for the target org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername
      username or alias for the dev hub org; overrides default dev hub org

  -w, --wait=wait
      Number of minutes to wait for installation status (also used for publishwait). Default is 10

  --apiversion=apiversion
      override the api version used for api requests made by this command

  --dryrun
      Allows the command to execute and display result information without actually performing the package installations.
      Useful if debugging.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

  --noprecheck
      Allows the command to bypass the pre-check of the target org and force install all packages even if they are already
      installed.

  --scope=(BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY)
      [default: BASIC] Which scope the command will execute under.

EXAMPLE
  TODO toolbox project stage processresources examples description
```

_See code: [src/commands/toolbox/project/stage/processresources.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/stage/processresources.ts)_

## `sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

TODO: toolbox project stage testing command description

```
USAGE
  $ sfdx toolbox:project:stage:test [--scope BASIC|COMPLETE|DATALOAD|POSTPACKAGEDEPLOY] [-v <string>] [-u <string>] 
  [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

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
  TODO toolbox project stage testing examples description
```

_See code: [src/commands/toolbox/project/stage/test.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/stage/test.ts)_

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

_See code: [src/commands/toolbox/project/stage/validation.ts](https://github.com/ImJohnMDaniel/sfdx-toolbox-project-utils/blob/v0.0.9/src/commands/toolbox/project/stage/validation.ts)_
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
