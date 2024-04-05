'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3eb932d8.js');

const IrTextArea = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.rows = 3;
        this.cols = 5;
        this.text = '';
        this.label = '<label>';
        this.placeholder = '<placeholder>';
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (index.h("div", { key: '5110dcf4e9e0897ff7782d333a17118c81c3880b', class: "form-group" }, index.h("label", { key: 'a6e3a377d9a2aa5f9e24ccee7b31474435dcb83f' }, this.label), index.h("textarea", { key: '8f05b1750d452699d661fbe48cdb83bbf00c8a6e', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
};

exports.ir_textarea = IrTextArea;

//# sourceMappingURL=ir-textarea.cjs.entry.js.map