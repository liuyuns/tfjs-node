import * as tfc from '@tensorflow/tfjs-core';
export declare class NodeFileSystem implements tfc.io.IOHandler {
    static readonly URL_SCHEME: string;
    protected readonly path: string | string[];
    readonly MODEL_JSON_FILENAME: string;
    readonly WEIGHTS_BINARY_FILENAME: string;
    readonly MODEL_BINARY_FILENAME: string;
    constructor(path: string | string[]);
    save(modelArtifacts: tfc.io.ModelArtifacts): Promise<tfc.io.SaveResult>;
    load(): Promise<tfc.io.ModelArtifacts>;
    protected loadBinaryModel(): Promise<tfc.io.ModelArtifacts>;
    protected loadJSONModel(): Promise<tfc.io.ModelArtifacts>;
    private loadWeights(weightsManifest, path);
    protected createOrVerifyDirectory(): Promise<void>;
}
export declare const nodeFileSystemRouter: (url: string | string[]) => NodeFileSystem;
export declare function fileSystem(path: string | string[]): NodeFileSystem;
