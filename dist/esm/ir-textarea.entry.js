import { r as registerInstance, h } from './index-7f938890.js';

const IrTextArea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rows = 3;
        this.cols = 5;
        this.text = '';
        this.label = '<label>';
        this.placeholder = '<placeholder>';
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (h("div", { key: '5110dcf4e9e0897ff7782d333a17118c81c3880b', class: "form-group" }, h("label", { key: 'a6e3a377d9a2aa5f9e24ccee7b31474435dcb83f' }, this.label), h("textarea", { key: '8f05b1750d452699d661fbe48cdb83bbf00c8a6e', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
};

export { IrTextArea as ir_textarea };

//# sourceMappingURL=ir-textarea.entry.js.map