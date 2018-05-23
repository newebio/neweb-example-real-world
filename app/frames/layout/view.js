"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_1 = require("neweb");
const template = require("./template.html");
class LayoutComponent extends neweb_1.Component {
    beforeInit() {
        this.addElement("children", new neweb_1.Dynamic({
            component: this.props.children.children,
        }));
    }
    getTemplate() {
        return template;
    }
}
exports.default = LayoutComponent;
