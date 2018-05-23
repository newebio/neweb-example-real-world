"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const connect_1 = require("./../connect");
class Router extends neweb_1.ClassicRouter {
    onInit() {
        this.addRoute(neweb_1.MatchedRoute({ path: "/" }, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "home",
        }))));
        this.addRoute(neweb_1.MatchedRoute({ path: "/register" }, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "signUp",
        }))));
        this.addRoute(neweb_1.MatchedRoute({ path: "/login" }, neweb_1.RouteWithRedirectOn({
            condition: () => {
                const user = this.config.session.get("user");
                return !!user;
            },
            url: (_, context) => {
                return context.params && context.params.redirect ? context.params.redirect : "/";
            },
        }, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "signIn",
        })))));
        this.addRoute(neweb_1.MatchedRoute({ path: "/profile/:username" }, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "profile",
        }))));
        this.addRoute(neweb_1.MatchedRoute({ path: "/article/:slug" }, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "article",
        }))));
        const withLogin = {
            condition: () => {
                const user = this.config.session.get("user");
                return !user;
            },
            url: (request) => "/login?redirect=" + request.url,
        };
        this.addRoute(neweb_1.MatchedRoute({ path: "/settings" }, neweb_1.RouteWithRedirectOn(withLogin, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "settings",
        })))));
        this.addRoute(neweb_1.MatchedRoute({ path: "/editor" }, neweb_1.RouteWithRedirectOn(withLogin, neweb_1.PageRouteWithParent({ parentFrame: "layout" }, neweb_1.PageRouteByFrame({
            frameName: "editor",
        })))));
        this.config.session.get$("user").subscribe(() => {
            this.config.seance.navigate(this.currentRequest.url);
        });
    }
}
exports.Router = Router;
exports.default = connect_1.connect(Router)({});
