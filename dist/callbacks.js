"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_1 = require("@tensorflow/tfjs");
var ProgressBar = require("progress");
exports.progressBarHelper = {
    ProgressBar: ProgressBar,
    log: console.log
};
var ProgbarLogger = (function (_super) {
    __extends(ProgbarLogger, _super);
    function ProgbarLogger() {
        var _this = _super.call(this, {
            onTrainBegin: function (logs) { return __awaiter(_this, void 0, void 0, function () {
                var samples, batchSize;
                return __generator(this, function (_a) {
                    samples = this.params.samples;
                    batchSize = this.params.batchSize;
                    tfjs_1.util.assert(samples != null, 'ProgbarLogger cannot operate when samples is undefined or null.');
                    tfjs_1.util.assert(batchSize != null, 'ProgbarLogger cannot operate when batchSize is undefined or ' +
                        'null.');
                    this.numTrainBatchesPerEpoch = Math.ceil(samples / batchSize);
                    return [2];
                });
            }); },
            onEpochBegin: function (epoch, logs) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    exports.progressBarHelper.log("Epoch " + (epoch + 1) + " / " + this.params.epochs);
                    this.currentEpochBegin = tfjs_1.util.now();
                    return [2];
                });
            }); },
            onBatchEnd: function (batch, logs) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (batch === 0) {
                                this.progressBar = new exports.progressBarHelper.ProgressBar('eta=:eta :bar :placeholderForLossesAndMetrics', { total: this.numTrainBatchesPerEpoch + 1, head: ">" });
                            }
                            this.progressBar.tick({
                                placeholderForLossesAndMetrics: this.formatLogsAsMetricsContent(logs)
                            });
                            return [4, tfjs_1.nextFrame()];
                        case 1:
                            _a.sent();
                            if (batch === this.numTrainBatchesPerEpoch - 1) {
                                this.epochDurationMillis = tfjs_1.util.now() - this.currentEpochBegin;
                                this.usPerStep =
                                    this.epochDurationMillis / this.params.samples * 1e3;
                            }
                            return [2];
                    }
                });
            }); },
            onEpochEnd: function (epoch, logs) { return __awaiter(_this, void 0, void 0, function () {
                var lossesAndMetricsString;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.progressBar.tick({ placeholderForLossesAndMetrics: '' });
                            lossesAndMetricsString = this.formatLogsAsMetricsContent(logs);
                            exports.progressBarHelper.log(this.epochDurationMillis.toFixed(0) + "ms " +
                                (this.usPerStep.toFixed(0) + "us/step - ") +
                                ("" + lossesAndMetricsString));
                            return [4, tfjs_1.nextFrame()];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            }); },
        }) || this;
        return _this;
    }
    ProgbarLogger.prototype.formatLogsAsMetricsContent = function (logs) {
        var metricsContent = '';
        var keys = Object.keys(logs).sort();
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (this.isFieldRelevant(key)) {
                metricsContent += key + "=" + logs[key].toFixed(2) + " ";
            }
        }
        return metricsContent;
    };
    ProgbarLogger.prototype.isFieldRelevant = function (key) {
        return key !== 'batch' && key !== 'size';
    };
    return ProgbarLogger;
}(tfjs_1.CustomCallback));
exports.ProgbarLogger = ProgbarLogger;
//# sourceMappingURL=callbacks.js.map