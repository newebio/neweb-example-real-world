import { Component, Dynamic } from "neweb";
import template = require("./template.html");
class LayoutComponent extends Component<{
    children: {
        children: Component<any>;
    };
}> {
    beforeInit() {
        this.addElement("children", new Dynamic({
            component: this.props.children.children,
        }));
    }
    getTemplate() {
        return template;
    }
}
export default LayoutComponent;
