"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require(".");
var jasmine_util = require("@tensorflow/tfjs-core/dist/jasmine_util");
Error.stackTraceLimit = Infinity;
var jasmineCtor = require('jasmine');
var op_utils_1 = require("./ops/op_utils");
process.on('unhandledRejection', function (e) {
    throw e;
});
jasmine_util.setTestEnvs([{ name: 'test-tensorflow', factory: function () { return op_utils_1.nodeBackend(); }, features: {} }]);
var IGNORE_LIST = [
    'depthwiseConv2D',
    'separableConv2d',
    'complex64 memory',
    'depthToSpace test-tensorflow {} throws when blocksize < 2',
    'depthToSpace test-tensorflow {} throws when CPU backend used with data format NCHW',
];
if (process.platform === 'win32') {
    IGNORE_LIST.push('clip test-tensorflow {} propagates NaNs');
    IGNORE_LIST.push('maxPool test-tensorflow {} [x=[3,3,1] f=[2,2] s=1 ignores NaNs');
}
var runner = new jasmineCtor();
runner.loadConfig({
    spec_files: [
        'src/**/*_test.ts', 'node_modules/@tensorflow/tfjs-core/dist/**/*_test.js'
    ],
    random: false
});
if (process.env.JASMINE_SEED) {
    runner.seed(process.env.JASMINE_SEED);
}
var env = jasmine.getEnv();
env.specFilter = function (spec) {
    for (var i = 0; i < IGNORE_LIST.length; ++i) {
        if (spec.getFullName().indexOf(IGNORE_LIST[i]) > -1) {
            return false;
        }
    }
    return true;
};
console.log("Running tests against TensorFlow: " + op_utils_1.nodeBackend().binding.TF_Version);
runner.execute();
//# sourceMappingURL=run_tests.js.map