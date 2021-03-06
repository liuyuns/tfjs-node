"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var callbacks_1 = require("./callbacks");
describe('progbarLogger', function () {
    var FakeProgbar = (function () {
        function FakeProgbar(specs, config) {
            this.specs = specs;
            this.config = config;
            this.tickConfigs = [];
        }
        FakeProgbar.prototype.tick = function (tickConfig) {
            this.tickConfigs.push(tickConfig);
        };
        return FakeProgbar;
    }());
    it('Model.fit with loss, no metric and no validation', function () { return __awaiter(_this, void 0, void 0, function () {
        var fakeProgbars, consoleMessages, model, numSamples, epochs, batchSize, xs, ys, _i, fakeProgbars_1, fakeProgbar, tickConfigs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeProgbars = [];
                    spyOn(callbacks_1.progressBarHelper, 'ProgressBar')
                        .and.callFake(function (specs, config) {
                        var fakeProgbar = new FakeProgbar(specs, config);
                        fakeProgbars.push(fakeProgbar);
                        return fakeProgbar;
                    });
                    consoleMessages = [];
                    spyOn(callbacks_1.progressBarHelper, 'log').and.callFake(function (message) {
                        consoleMessages.push(message);
                    });
                    model = tf.sequential();
                    model.add(tf.layers.dense({ units: 10, inputShape: [8], activation: 'relu' }));
                    model.add(tf.layers.dense({ units: 1 }));
                    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
                    numSamples = 14;
                    epochs = 3;
                    batchSize = 8;
                    xs = tf.randomNormal([numSamples, 8]);
                    ys = tf.randomNormal([numSamples, 1]);
                    return [4, model.fit(xs, ys, { epochs: epochs, batchSize: batchSize, callbacks: [new callbacks_1.ProgbarLogger()] })];
                case 1:
                    _a.sent();
                    expect(fakeProgbars.length).toEqual(3);
                    for (_i = 0, fakeProgbars_1 = fakeProgbars; _i < fakeProgbars_1.length; _i++) {
                        fakeProgbar = fakeProgbars_1[_i];
                        tickConfigs = fakeProgbar.tickConfigs;
                        expect(tickConfigs.length).toEqual(3);
                        for (i = 0; i < 2; ++i) {
                            expect(Object.keys(tickConfigs[i])).toEqual([
                                'placeholderForLossesAndMetrics'
                            ]);
                            expect(tickConfigs[i]['placeholderForLossesAndMetrics'])
                                .toMatch(/^loss=.*/);
                        }
                        expect(tickConfigs[2]).toEqual({ placeholderForLossesAndMetrics: '' });
                    }
                    expect(consoleMessages.length).toEqual(6);
                    expect(consoleMessages[0]).toEqual('Epoch 1 / 3');
                    expect(consoleMessages[1]).toMatch(/.*ms .*us\/step - loss=.*/);
                    expect(consoleMessages[2]).toEqual('Epoch 2 / 3');
                    expect(consoleMessages[3]).toMatch(/.*ms .*us\/step - loss=.*/);
                    expect(consoleMessages[4]).toEqual('Epoch 3 / 3');
                    expect(consoleMessages[5]).toMatch(/.*ms .*us\/step - loss=.*/);
                    return [2];
            }
        });
    }); });
    it('Model.fit with loss, metric and validation', function () { return __awaiter(_this, void 0, void 0, function () {
        var fakeProgbars, consoleMessages, model, numSamples, epochs, batchSize, validationSplit, xs, ys, _i, fakeProgbars_2, fakeProgbar, tickConfigs, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeProgbars = [];
                    spyOn(callbacks_1.progressBarHelper, 'ProgressBar')
                        .and.callFake(function (specs, config) {
                        var fakeProgbar = new FakeProgbar(specs, config);
                        fakeProgbars.push(fakeProgbar);
                        return fakeProgbar;
                    });
                    consoleMessages = [];
                    spyOn(callbacks_1.progressBarHelper, 'log').and.callFake(function (message) {
                        consoleMessages.push(message);
                    });
                    model = tf.sequential();
                    model.add(tf.layers.dense({ units: 10, inputShape: [8], activation: 'relu' }));
                    model.add(tf.layers.dense({ units: 1 }));
                    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['acc'] });
                    numSamples = 40;
                    epochs = 2;
                    batchSize = 8;
                    validationSplit = 0.15;
                    xs = tf.randomNormal([numSamples, 8]);
                    ys = tf.randomNormal([numSamples, 1]);
                    return [4, model.fit(xs, ys, { epochs: epochs, batchSize: batchSize, validationSplit: validationSplit, callbacks: new callbacks_1.ProgbarLogger() })];
                case 1:
                    _a.sent();
                    expect(fakeProgbars.length).toEqual(2);
                    for (_i = 0, fakeProgbars_2 = fakeProgbars; _i < fakeProgbars_2.length; _i++) {
                        fakeProgbar = fakeProgbars_2[_i];
                        tickConfigs = fakeProgbar.tickConfigs;
                        expect(tickConfigs.length).toEqual(6);
                        for (i = 0; i < 5; ++i) {
                            expect(Object.keys(tickConfigs[i])).toEqual([
                                'placeholderForLossesAndMetrics'
                            ]);
                            expect(tickConfigs[i]['placeholderForLossesAndMetrics'])
                                .toMatch(/^acc=.* loss=.*/);
                        }
                        expect(tickConfigs[5]).toEqual({ placeholderForLossesAndMetrics: '' });
                    }
                    expect(consoleMessages.length).toEqual(4);
                    expect(consoleMessages[0]).toEqual('Epoch 1 / 2');
                    expect(consoleMessages[1])
                        .toMatch(/.*ms .*us\/step - acc=.* loss=.* val_acc=.* val_loss=.*/);
                    expect(consoleMessages[2]).toEqual('Epoch 2 / 2');
                    expect(consoleMessages[3])
                        .toMatch(/.*ms .*us\/step - acc=.* loss=.* val_acc=.* val_loss=.*/);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=callbacks_test.js.map