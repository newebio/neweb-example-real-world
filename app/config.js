"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    get logger() {
        return console;
    }
    get apiEndpoint() {
        return "https://conduit.productionready.io/api";
    }
}
exports.default = new Config();
