"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const operators_1 = require("rxjs/operators");
const CommentItem_1 = require("./CommentItem");
class ArticleComponent extends neweb_1.Component {
    beforeInit() {
        const title$ = this.props.data.article.pipe(operators_1.map((v) => v.title));
        this.addElement("lblTitle", new neweb_1.Text({
            value: title$,
        }));
        this.addElement("listComments", new neweb_1.List({
            items: this.props.data.comments,
            renderItem: (comment) => new CommentItem_1.default({
                comment,
            }),
        }));
    }
}
exports.default = ArticleComponent;
