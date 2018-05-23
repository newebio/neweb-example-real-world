import { Component, Link, List } from "neweb";
import { map } from "rxjs/operators";
import ArticleItem from "./ArticleItem";
import { IData } from "./controller";
import template = require("./template.html");
class HomeView extends Component<{
    data: IData;
}> {
    beforeInit() {
        this.addElement("listArticles", new List({
            items: this.props.data.articlesInfo.pipe(map((v) => v.articles)),
            renderItem: (article) => new ArticleItem({ article }),
        }));
        this.addElement("listTags", new List({
            items: this.props.data.tags,
            renderItem: (tag) => new Link({
                href: "/tags/" + tag,
                text: tag,
            }),
        }));
        this.addElement("listPagination", new List({
            items: this.props.data.articlesInfo.pipe(map((v) => v.paginations.map((pagination) => {
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
class PaginationItem extends Component<{ item: number, isActive: boolean; }> {
    beforeInit() {
        this.addElement("link", new Link({
            href: "/?page=" + this.props.item,
            text: this.props.item.toString(),
        }));
    }
    getTemplate() {
        return `<li style="color:red" class="page-item ${this.props.isActive ? "active" : ""}">
            <a name="link" class="page-link"></a></li>`;
    }
}
export default HomeView;
