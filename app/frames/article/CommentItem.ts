import { Component, Image, Link, Text } from "neweb";
import { IArticleComment } from "../../Api";
import CommentItemHtml = require("./comment.html");
class CommentItem extends Component<{ comment: IArticleComment }> {
    beforeInit() {
        this.addElement("txtBody", new Text({
            value: this.props.comment.body,
        }));
        this.addElement("linkAuthor1", new Link({
            href: this.props.comment.author.username,
        }));
        this.addElement("linkAuthor2", new Link({
            href: this.props.comment.author.username,
        }));
        this.addElement("imgAvatar", new Image({
            source: this.props.comment.author.image,
        }));
    }
    getTemplate() {
        return CommentItemHtml;
    }
}
export default CommentItem;
