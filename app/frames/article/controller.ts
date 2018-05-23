import { FrameController, IControllerConfig } from "neweb";
import { from, Observable, Subject } from "rxjs";
import { connect } from "../../../connect";
import { Api, IArticle, IArticleComment, IUser } from "../../Api";
import context from "../../app";
import { ISession } from "../../ISession";
export interface IData {
    article: Observable<IArticle>;
    comments: Observable<IArticleComment[]>;
    user: Observable<IUser>;
}
export interface IParams {
    slug: string;
}
export interface IArticleControllerConfig extends IControllerConfig<IParams, IData, ISession> {
    api: Api;
}
export class ArticleController extends FrameController<IParams, IData, {}, ISession> {
    data = {
        article: new Subject<IArticle>(),
        comments: new Subject<IArticleComment[]>(),
        user: new Subject<IUser>(),
    };
    constructor(protected config: IArticleControllerConfig) {
        super(config);
    }
    async  onInit() {
        const currentUser = this.config.session.get("user");
        if (!currentUser) {
            throw new Error("Need user");
        }
        this.data.user.next(currentUser);
        this.subscriptions.push(
            from(this.config.api.article(this.config.params.slug))
                .subscribe(this.data.article),
        );
        this.subscriptions.push(
            from(this.config.api.articleComments(this.config.params.slug))
                .subscribe(this.data.comments),
        );
    }
}
export default connect(ArticleController)({
    api: context.api,
});
