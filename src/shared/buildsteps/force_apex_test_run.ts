import { FlagsConfig } from '@salesforce/command';
import Run from '@salesforce/plugin-apex/lib/commands/force/apex/test/run';
import { AnyJson } from '@salesforce/ts-types';
import { AbstractBuildStep } from '../../types/build_step';
import Utils from '../utils';

/*
    invoke Apex tests

    USAGE
        $ sfdx force:apex:test:run [-d <string>] [-l RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests] [-n <string>] [-r human|tap|junit|json] [-s
            <string>] [-t <string>] [-w <string>] [-y] [-v -c] [-u <string>] [--apiversion <string>] [--verbose] [--json] [--loglevel
            trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

    OPTIONS
        -c, --codecoverage
            retrieves code coverage results

        -d, --outputdir=outputdir
            directory to store test run files

        -l, --testlevel=(RunLocalTests|RunAllTestsInOrg|RunSpecifiedTests)
            specifies which tests to run, using one of these TestLevel enum values:
            RunSpecifiedTests—Only the tests that you specify are run.
            RunLocalTests—All tests in your org are run, except the ones that originate from installed managed packages.
            RunAllTestsInOrg—All tests are in your org and in installed managed packages are run

        -n, --classnames=classnames
            comma-separated list of Apex test class names to run; if you select --classnames, you can't specify --suitenames or --tests

        -r, --resultformat=(human|tap|junit|json)
            Permissible values are: human, tap, junit, json

        -s, --suitenames=suitenames
            comma-separated list of Apex test suite names to run; if you select --suitenames, you can't specify --classnames or --tests

        -t, --tests=tests
            comma-separated list of Apex test class names or IDs and, if applicable, test methods to run; if you specify --tests, you can't specify
            --classnames or --suitenames

        -u, --targetusername=targetusername
            username or alias for the target org; overrides default target org

        -v, --detailedcoverage
            display detailed code coverage per test

        -w, --wait=wait
            sets the streaming client socket timeout in minutes; specify a longer wait time if timeouts occur frequently

        -y, --synchronous
            runs test methods from a single Apex class synchronously; if not specified, tests are run ansynchronously

        --apiversion=apiversion
            override the api version used for api requests made by this command

        --json
            format output as JSON

        --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
            [default: warn] [default: warn] logging level for this command invocation; logs are stored in $HOME/.sfdx/sfdx.log

        --verbose
            display Apex test processing details; if JSON is specified, processing details aren't displayed

    DESCRIPTION
        Specify which tests to run by using the --classnames, --suites, or --tests parameters. Alternatively, use the --testlevel parameter to run all the
        tests in your org, local tests, or specified tests.
        To see code coverage results, use the --codecoverage parameter with --resultformat. The output displays a high-level summary of the test run and
        the code coverage values for classes in your org. If you specify human-readable result format, use the --detailedcoverage parameter to see detailed
        coverage results for each test method run.

        NOTE: The testRunCoverage value (JSON and JUnit result formats) is a percentage of the covered lines and total lines from all the Apex classes
        evaluated by the tests in this run.

    EXAMPLES
        $ sfdx force:apex:test:run
        $ sfdx force:apex:test:run -n "MyClassTest,MyOtherClassTest" -r human
        $ sfdx force:apex:test:run -s "MySuite,MyOtherSuite" -c -v --json
        $ sfdx force:apex:test:run -t "MyClassTest.testCoolFeature,MyClassTest.testAwesomeFeature,AnotherClassTest,namespace.TheirClassTest.testThis" -r human
        $ sfdx force:apex:test:run -l RunLocalTests -d <path to outputdir> -u me@my.org
 */
export default class ForceApexTestRun extends AbstractBuildStep {

    public async run(): Promise<AnyJson> {

        this.ux.log('Apex test run on scratch org ' + this.orgAlias);

        // CODECOVERAGE
        if (this.params.codecoverage) {
            this.args.push('--codecoverage');
            this.args.push(`${this.params.codecoverage}`);
        }

        // OUTPUTDIR
        if (this.params.outputdir) {
            this.args.push('--outputdir');
            this.args.push(`${this.params.outputdir}`);
        }

        // TESTLEVEL
        if (this.params.testlevel) {
            this.args.push('--testlevel');
            this.args.push(`${this.params.testlevel}`);
        }

        // CLASSNAMES
        if (this.params.classnames) {
            this.args.push('--classnames');
            this.args.push(`${this.params.classnames}`);
        }

        // RESULTFORMAT
        if (this.params.resultformat) {
            this.args.push('--resultformat');
            this.args.push(`${this.params.resultformat}`);
        }

        // SUITENAMES
        if (this.params.suitenames) {
            this.args.push('--suitenames');
            this.args.push(`${this.params.suitenames}`);
        }

        // TESTS
        if (this.params.tests) {
            this.args.push('--tests');
            this.args.push(`${this.params.tests}`);
        }

        // DETAILEDCOVERAGE
        if (this.params.detailedcoverage) {
            this.args.push('--detailedcoverage');
        }

        // WAIT
        if (this.params.wait) {
            this.args.push('--wait');
            this.args.push(`${this.params.wait}`);
        }

        // SYNCHRONOUS
        if (this.params.synchronous) {
            this.args.push('--synchronous');
        }

        // VERBOSE
        if (this.params.verbose) {
            this.args.push('--verbose');
        }

        Utils.pushCommonFlagsConfigToArgs(this.params, this.orgAlias, this.args);

        const apexTestRunResultJson = await Run.run(this.args);

        if ( apexTestRunResultJson === undefined ) {
            // there was a problem
            throw Error('Apex Test Run attempt was unsuccessful.');
        }

        return apexTestRunResultJson;
    }
    public getBuildStepTypeToken(): string {
        return 'ForceApexTestRun';
    }

    public getSFDXProjectConfigureExample(): string {
        return '';
    }

    public getFlagsConfig(): FlagsConfig {
        return Run.flagsConfig;
    }
}
