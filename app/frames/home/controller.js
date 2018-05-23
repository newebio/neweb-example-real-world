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
const operators_1 = require("rxjs/operators");
const connect_1 = require("../../../connect");
const app_1 = require("../../app");
class HomeController extends neweb_1.FrameController {
    constructor(config) {
        super(config);
        this.config = config;
        this.data = {
            tags: new rxjs_1.Subject(),
            articlesInfo: new rxjs_1.Subject(),
            isAuth: new rxjs_1.Subject(),
        };
        this.init();
    }
    init() {
        this.subscriptions.push(rxjs_1.concat(rxjs_1.of(this.config.session.get("user")), this.config.session.get$("user"))
            .pipe(operators_1.map((v) => !!v)).subscribe(this.data.isAuth));
        this.data.isAuth = new rxjs_1.BehaviorSubject(!!this.config.session.get("user"));
        this.config.session.get$("user").pipe(operators_1.map((v) => !!v)).subscribe((v) => this.data.isAuth.next(v));
        this.feedType = "global";
        this.subscriptions.push(rxjs_1.from(this.config.api.tags()).subscribe(this.data.tags));
        this.updateArticles(this.config.params);
    }
    onChangeParams(nextParams) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateArticles(nextParams);
        });
    }
    updateArticles(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
            const count = 5;
            const articles = yield this.config.api.articles({ offset: (currentPage - 1) * count, limit: count });
            const paginations = [];
            for (let i = 1; i < Math.ceil(articles.articlesCount / count) + 1; i++) {
                paginations.push(i);
            }
            this.data.articlesInfo.next({
                currentPage,
                articles: articles.articles,
                paginations,
            });
        });
    }
}
exports.HomeController = HomeController;
exports.default = connect_1.connect(HomeController)({
    api: app_1.default.api,
});
