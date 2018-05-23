import {
    ClassicRouter, IRouterRequest,
    MatchedRoute, PageRouteByFrame, PageRouteWithParent, RouteWithRedirectOn,
} from "neweb";
import { connect } from "./../connect";
import { ISession } from "./ISession";

export class Router extends ClassicRouter<{}, ISession> {
    onInit() {
        this.addRoute(MatchedRoute({ path: "/" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "home",
            }))));
        this.addRoute(MatchedRoute({ path: "/register" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "signUp",
            }))));
        this.addRoute(MatchedRoute({ path: "/login" }, RouteWithRedirectOn({
            condition: () => {
                const user = this.config.session.get("user");
                return !!user;
            },
            url: (_, context) => {
                return context.params && context.params.redirect ? context.params.redirect : "/";
            },
        },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "signIn",
            })))));
        this.addRoute(MatchedRoute({ path: "/profile/:username" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "profile",
            }))));
        this.addRoute(MatchedRoute({ path: "/article/:slug" },
            PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "article",
            }))));

        const withLogin = {
            condition: () => {
                const user = this.config.session.get("user");
                return !user;
            },
            url: (request: IRouterRequest) => "/login?redirect=" + request.url,
        };
        this.addRoute(MatchedRoute({ path: "/settings" },
            RouteWithRedirectOn(withLogin, PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "settings",
            })))));
        this.addRoute(MatchedRoute({ path: "/editor" },
            RouteWithRedirectOn(withLogin, PageRouteWithParent({ parentFrame: "layout" }, PageRouteByFrame({
                frameName: "editor",
            })))));
        this.config.session.get$("user").subscribe(() => {
            this.config.seance.navigate(this.currentRequest.url);
        });
    }
}
export default connect(Router)({

});
