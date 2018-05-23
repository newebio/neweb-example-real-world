import { Component, Image, Link, Text } from "neweb";
import { IArticle } from "../../Api";
import template = require("./articleItem.html");
class ArticleItem extends Component<{
    article: IArticle;
}> {
    beforeInit() {
        this.addElement("imgAvatar", new Image({
            source: this.props.article.author.image || "http://i.imgur.com/N4VcUeJ.jpg",
        }));
        this.addElement("linkAuthor1", new Link({
            href: this.props.article.author.username,
        }));
        this.addElement("linkAuthor2", new Link({
            href: this.props.article.author.username,
            text: this.props.article.author.username,
        }));
        this.addElement("lblTitle", new Text({
            value: this.props.article.title,
        }));
        this.addElement("lblSlug", new Text({
            value: this.props.article.slug,
        }));
    }
    getTemplate() {
        return template;
    }
}
export default ArticleItem;
