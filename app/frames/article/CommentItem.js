"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const CommentItemHtml = require("./comment.html");
class CommentItem extends neweb_1.Component {
    beforeInit() {
        this.addElement("txtBody", new neweb_1.Text({
            value: this.props.comment.body,
        }));
        this.addElement("linkAuthor1", new neweb_1.Link({
            href: this.props.comment.author.username,
        }));
        this.addElement("linkAuthor2", new neweb_1.Link({
            href: this.props.comment.author.username,
        }));
        this.addElement("imgAvatar", new neweb_1.Image({
            source: this.props.comment.author.image,
        }));
    }
    getTemplate() {
        return CommentItemHtml;
    }
}
exports.default = CommentItem;
