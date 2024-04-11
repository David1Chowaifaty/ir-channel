'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3eb932d8.js');

const IrSpan = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.text = undefined;
    }
    connectedCallback() { }
    disconnectedCallback() { }
    render() {
        return (index.h("span", { key: '405eae546aa14fcd2f610fe7f52ba49cfc578424' }, this.text));
    }
};

exports.ir_span = IrSpan;

//# sourceMappingURL=ir-span.cjs.entry.js.map