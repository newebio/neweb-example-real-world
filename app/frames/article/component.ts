import { Component, List, Text } from "neweb";
import { map } from "rxjs/operators";
import CommentItem from "./CommentItem";
import { IData } from "./controller";

class ArticleComponent extends Component<{
    data: IData;
}> {
    beforeInit() {
        const title$ = this.props.data.article.pipe(map((v) => v.title));
        this.addElement("lblTitle", new Text({
            value: title$,
        }));
        this.addElement("listComments", new List({
            items: this.props.data.comments,
            renderItem: (comment) => new CommentItem({
                comment,
            }),
        }));
    }
}
export default ArticleComponent;
