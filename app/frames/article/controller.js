"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const rxjs_1 = require("rxjs");
const connect_1 = require("../../../connect");
const app_1 = require("../../app");
class ArticleController extends neweb_1.FrameController {
    constructor(config) {
        super(config);
        this.config = config;
        this.data = {
            article: new rxjs_1.Subject(),
            comments: new rxjs_1.Subject(),
            user: new rxjs_1.Subject(),
        };
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = this.config.session.get("user");
            if (!currentUser) {
                throw new Error("Need user");
            }
            this.data.user.next(currentUser);
            this.subscriptions.push(rxjs_1.from(this.config.api.article(this.config.params.slug))
                .subscribe(this.data.article));
            this.subscriptions.push(rxjs_1.from(this.config.api.articleComments(this.config.params.slug))
                .subscribe(this.data.comments));
        });
    }
}
exports.ArticleController = ArticleController;
exports.default = connect_1.connect(ArticleController)({
    api: app_1.default.api,
});
