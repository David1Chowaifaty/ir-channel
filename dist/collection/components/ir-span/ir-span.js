import { h } from "@stencil/core";
export class IrSpan {
    constructor() {
        this.text = undefined;
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (h("span", { key: '405eae546aa14fcd2f610fe7f52ba49cfc578424' }, this.text));
    }
    static get is() { return "ir-span"; }
    static get properties() {
        return {
            "text": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "text",
                "reflect": false
            }
        };
    }
}
//# sourceMappingURL=ir-span.js.map
