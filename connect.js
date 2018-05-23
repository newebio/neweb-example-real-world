"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = ((clas) => {
    return (resolvers) => {
        // tslint:disable-next-line:only-arrow-functions space-before-function-paren
        return function (params) {
            return new clas(Object.assign({}, params, resolvers));
        };
    };
});
exports.default = exports.connect;
