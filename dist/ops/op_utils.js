"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var util_1 = require("util");
var gBackend = null;
function nodeBackend() {
    if (gBackend === null) {
        gBackend = tfc.ENV.findBackend('tensorflow');
    }
    return gBackend;
}
exports.nodeBackend = nodeBackend;
function getTFDType(dataType) {
    var binding = nodeBackend().binding;
    switch (dataType) {
        case 'float32':
            return binding.TF_FLOAT;
        case 'int32':
            return binding.TF_INT32;
        case 'bool':
            return binding.TF_BOOL;
        case 'complex64':
            return binding.TF_COMPLEX64;
        default:
            throw new Error('Unknown dtype `${dtype}`');
    }
}
exports.getTFDType = getTFDType;
function createTypeOpAttr(attrName, dtype) {
    return {
        name: attrName,
        type: nodeBackend().binding.TF_ATTR_TYPE,
        value: getTFDType(dtype)
    };
}
exports.createTypeOpAttr = createTypeOpAttr;
function createTensorsTypeOpAttr(attrName, tensors) {
    if (util_1.isNullOrUndefined(tensors)) {
        throw new Error('Invalid input tensors value.');
    }
    return {
        name: attrName,
        type: nodeBackend().binding.TF_ATTR_TYPE,
        value: getTFDTypeForInputs(tensors)
    };
}
exports.createTensorsTypeOpAttr = createTensorsTypeOpAttr;
function getTFDTypeForInputs(tensors) {
    if (util_1.isNullOrUndefined(tensors)) {
        throw new Error('Invalid input tensors value.');
    }
    if (util_1.isArray(tensors)) {
        for (var i = 0; i < tensors.length; i++) {
            return getTFDType(tensors[i].dtype);
        }
        return -1;
    }
    else {
        return getTFDType(tensors.dtype);
    }
}
//# sourceMappingURL=op_utils.js.map