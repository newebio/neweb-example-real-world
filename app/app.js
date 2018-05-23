"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("./Api");
class Context {
    get logger() {
        return console;
    }
    get api() {
        return new Api_1.default({
            endpoint: "http://",
        });
    }
}
exports.default = new Context();
