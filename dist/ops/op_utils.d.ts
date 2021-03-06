import * as tfc from '@tensorflow/tfjs-core';
import { NodeJSKernelBackend } from '../nodejs_kernel_backend';
import { TFEOpAttr } from '../tfjs_binding';
export declare function nodeBackend(): NodeJSKernelBackend;
export declare function getTFDType(dataType: tfc.DataType): number;
export declare function createTypeOpAttr(attrName: string, dtype: tfc.DataType): TFEOpAttr;
export declare function createTensorsTypeOpAttr(attrName: string, tensors: tfc.Tensor | tfc.Tensor[]): {
    name: string;
    type: number;
    value: number;
};
