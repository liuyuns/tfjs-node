"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var nodejs_kernel_backend_1 = require("../nodejs_kernel_backend");
var op_utils_1 = require("./op_utils");
describe('Exposes Backend for internal Op execution.', function () {
    it('Provides the Node backend over a function', function () {
        var backend = op_utils_1.nodeBackend();
        expect(backend instanceof nodejs_kernel_backend_1.NodeJSKernelBackend).toBeTruthy();
    });
    it('Provides internal access to the binding', function () {
        expect(op_utils_1.nodeBackend().binding).toBeDefined();
    });
});
describe('getTFDType()', function () {
    var binding = op_utils_1.nodeBackend().binding;
    it('handles float32', function () {
        expect(op_utils_1.getTFDType('float32')).toBe(binding.TF_FLOAT);
    });
    it('handles int32', function () {
        expect(op_utils_1.getTFDType('int32')).toBe(binding.TF_INT32);
    });
    it('handles bool', function () {
        expect(op_utils_1.getTFDType('bool')).toBe(binding.TF_BOOL);
    });
    it('handles unknown types', function () {
        expect(function () { return op_utils_1.getTFDType(null); }).toThrowError();
    });
});
describe('createTypeOpAttr()', function () {
    var binding = op_utils_1.nodeBackend().binding;
    it('Creates a valid type attribute', function () {
        var attr = op_utils_1.createTypeOpAttr('foo', 'float32');
        expect(attr.name).toBe('foo');
        expect(attr.type).toBe(binding.TF_ATTR_TYPE);
        expect(attr.value).toBe(binding.TF_FLOAT);
    });
    it('handles unknown dtypes', function () {
        expect(function () { return op_utils_1.createTypeOpAttr('foo', null); }).toThrowError();
    });
});
describe('Returns TFEOpAttr for a Tensor or list of Tensors', function () {
    var binding = op_utils_1.nodeBackend().binding;
    it('handles a single Tensor', function () {
        var result = op_utils_1.createTensorsTypeOpAttr('T', tfc.scalar(13, 'float32'));
        expect(result.name).toBe('T');
        expect(result.type).toBe(binding.TF_ATTR_TYPE);
        expect(result.value).toBe(binding.TF_FLOAT);
    });
    it('handles a list of Tensors', function () {
        var tensors = [tfc.scalar(1, 'int32'), tfc.scalar(20.1, 'float32')];
        var result = op_utils_1.createTensorsTypeOpAttr('T', tensors);
        expect(result.name).toBe('T');
        expect(result.type).toBe(binding.TF_ATTR_TYPE);
        expect(result.value).toBe(binding.TF_INT32);
    });
    it('handles null', function () {
        expect(function () { return op_utils_1.createTensorsTypeOpAttr('T', null); }).toThrowError();
    });
    it('handles list of null', function () {
        var inputs = [null, null];
        expect(function () { return op_utils_1.createTensorsTypeOpAttr('T', inputs); }).toThrowError();
    });
});
//# sourceMappingURL=op_utils_test.js.map