import { CustomCallback } from '@tensorflow/tfjs';
export declare const progressBarHelper: {
    ProgressBar: any;
    log: Function;
};
export declare class ProgbarLogger extends CustomCallback {
    private numTrainBatchesPerEpoch;
    private progressBar;
    private currentEpochBegin;
    private epochDurationMillis;
    private usPerStep;
    constructor();
    private formatLogsAsMetricsContent(logs);
    private isFieldRelevant(key);
}
