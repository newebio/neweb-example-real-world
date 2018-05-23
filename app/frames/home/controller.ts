import { FrameController, IControllerConfig } from "neweb";
import { BehaviorSubject, concat, from, Observable, of, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { connect } from "../../../connect";
import { Api, IArticle } from "../../Api";
import context from "../../app";
import { ISession } from "../../ISession";
export interface IRawData {
    tags: string[];
    isAuth: boolean;
    articlesInfo: IArticlesInfo;
}
export type IData = { [P in keyof IRawData]: Observable<IRawData[P]> };
export interface IParams {
    page?: string;
}
interface IArticlesInfo {
    articles: IArticle[];
    paginations: number[];
    currentPage: number;
}
export interface IHomeControllerConfig extends IControllerConfig<IParams, IData, ISession> {
    api: Api;
}
export class HomeController extends FrameController<IParams, IData, {}, ISession> {
    feedType: "your" | "global";
    data = {
        tags: new Subject<any>(),
        articlesInfo: new Subject<IArticlesInfo>(),
        isAuth: new Subject<boolean>(),
    };
    constructor(protected config: IHomeControllerConfig) {
        super(config);
        this.init();
    }
    init() {
        this.subscriptions.push(
            concat(of(this.config.session.get("user")), this.config.session.get$("user"))
                .pipe(map((v) => !!v)).subscribe(this.data.isAuth),
        );
        this.data.isAuth = new BehaviorSubject<boolean>(!!this.config.session.get("user"));
        this.config.session.get$("user").pipe(map((v) => !!v)).subscribe((v) => this.data.isAuth.next(v));

        this.feedType = "global";
        this.subscriptions.push(
            from(this.config.api.tags()).subscribe(this.data.tags),
        );
        this.updateArticles(this.config.params);
    }
    async onChangeParams(nextParams: IParams) {
        await this.updateArticles(nextParams);
    }
    async updateArticles(params: IParams) {
        const currentPage = params && params.page ? parseInt(params.page, 10) : 1;
        const count = 5;
        const articles = await this.config.api.articles({ offset: (currentPage - 1) * count, limit: count });
        const paginations = [];
        for (let i = 1; i < Math.ceil(articles.articlesCount / count) + 1; i++) {
            paginations.push(i);
        }
        this.data.articlesInfo.next({
            currentPage,
            articles: articles.articles,
            paginations,
        });
    }
}
export default connect(HomeController)({
    api: context.api,
});
