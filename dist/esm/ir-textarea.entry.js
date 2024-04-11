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
        return (h("div", { key: 'abcd9b930c15f3bee08bebf179a4af704cf4044c', class: "form-group" }, h("label", { key: 'e7848c65657296fc9bf8ae9773a40e1eefb99cbc' }, this.label), h("textarea", { key: 'aa8831310f414112cb166ff3164b6a04c5489d86', rows: this.rows, class: "form-control", placeholder: this.placeholder })));
    }
};

export { IrTextArea as ir_textarea };

//# sourceMappingURL=ir-textarea.entry.js.map