"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const template = require("./articleItem.html");
class ArticleItem extends neweb_1.Component {
    beforeInit() {
        this.addElement("imgAvatar", new neweb_1.Image({
            source: this.props.article.author.image || "http://i.imgur.com/N4VcUeJ.jpg",
        }));
        this.addElement("linkAuthor1", new neweb_1.Link({
            href: this.props.article.author.username,
        }));
        this.addElement("linkAuthor2", new neweb_1.Link({
            href: this.props.article.author.username,
            text: this.props.article.author.username,
        }));
        this.addElement("lblTitle", new neweb_1.Text({
            value: this.props.article.title,
        }));
        this.addElement("lblSlug", new neweb_1.Text({
            value: this.props.article.slug,
        }));
    }
    getTemplate() {
        return template;
    }
}
exports.default = ArticleItem;
