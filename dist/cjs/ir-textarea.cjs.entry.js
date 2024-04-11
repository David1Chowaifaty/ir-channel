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
        return (index.h("div", { key: 'abcd9b930c15f3bee08bebf179a4af704cf4044c', class: "form-group" }, index.h("label", { key: 'e7848c65657296fc9bf8ae9773a40e1eefb99cbc' }, this.label), index.h("textarea", { key: 'aa8831310f414112cb166ff3164b6a04c5489d86', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
};

exports.ir_textarea = IrTextArea;

//# sourceMappingURL=ir-textarea.cjs.entry.js.map