"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const operators_1 = require("rxjs/operators");
const ArticleItem_1 = require("./ArticleItem");
const template = require("./template.html");
class HomeView extends neweb_1.Component {
    beforeInit() {
        this.addElement("listArticles", new neweb_1.List({
            items: this.props.data.articlesInfo.pipe(operators_1.map((v) => v.articles)),
            renderItem: (article) => new ArticleItem_1.default({ article }),
        }));
        this.addElement("listTags", new neweb_1.List({
            items: this.props.data.tags,
            renderItem: (tag) => new neweb_1.Link({
                href: "/tags/" + tag,
                text: tag,
            }),
        }));
        this.addElement("listPagination", new neweb_1.List({
            items: this.props.data.articlesInfo.pipe(operators_1.map((v) => v.paginations.map((pagination) => {
                return {
                    item: pagination,
                    isActive: pagination === v.currentPage,
                };
            }))),
            renderItem: (item) => new PaginationItem(item),
        }));
    }
    getTemplate() {
        return template;
    }
}
class PaginationItem extends neweb_1.Component {
    beforeInit() {
        this.addElement("link", new neweb_1.Link({
            href: "/?page=" + this.props.item,
            text: this.props.item.toString(),
        }));
    }
    getTemplate() {
        return `<li style="color:red" class="page-item ${this.props.isActive ? "active" : ""}">
            <a name="link" class="page-link"></a></li>`;
    }
}
exports.default = HomeView;
