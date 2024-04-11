import { HouseKeepingService } from "../../../../services/housekeeping.service";
import housekeeping_store from "../../../../stores/housekeeping.store";
import { Host, h } from "@stencil/core";
import moment from "moment";
export class IrHkArchive {
    constructor() {
        this.houseKeepingService = new HouseKeepingService();
        this.selectedDates = {
            start: moment().add(-90, 'days').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
        };
    }
    componentWillLoad() {
        this.houseKeepingService.setToken(housekeeping_store.default_properties.token);
        this.initializeData();
    }
    async initializeData() { }
    handleDateRangeChange(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        const { start, end } = e.detail;
        this.selectedDates = {
            start: start.format('YYYY-MM-DD'),
            end: end.format('YYYY-MM-DD'),
        };
    }
    async searchArchive(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
    async exportArchive(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
    render() {
        return (h(Host, { key: '9c50bece34c595c3a01753ab438456a2f091f537' }, h("ir-title", { key: '407a7794aed79a7994bfeb63c0db455b4e130ddb', class: "px-1", label: "Cleaning Archives (90 days)", displayContext: "sidebar" }), h("section", { key: '25fd191eeb8b5eaaabbe9f8c918be7d93e8c3bd0', class: "px-1" }, h("div", { key: 'e63936f3dccce04ff0f526257c52ddb4be8b5995', class: "d-flex" }, h("ir-select", { key: '1f1c6cf0b6e551992e3b265e65a4213c5e712e3c', class: "w-100", LabelAvailable: false, data: [], firstOption: "All units" }), h("ir-select", { key: '0fec8a595bb2b4bcf9e37c366b2ff4fabbbdfdc1', class: "ml-1 w-100", LabelAvailable: false, data: [], firstOption: "All housekeepers" })), h("div", { key: 'ecb76a5c911f18bc8eddf2a68ea57c9d2c7fefa4', class: "d-flex mt-1 align-items-center" }, h("igl-date-range", { key: '607c3478bbeee75a70e2a3b4ee8e919ce80196cc', class: "mr-1", withDateDifference: false, minDate: moment().add(-90, 'days').format('YYYY-MM-DD'), defaultData: {
                fromDate: this.selectedDates.start,
                toDate: this.selectedDates.end,
            } }), h("ir-icon", { key: '549ca048df72a053453922248d6fc4d0a066bb91', onIconClickHandler: this.searchArchive.bind(this), class: "mr-1" }, h("svg", { key: 'c6393696e32b43d8d9825c33e2956ce53bdfc853', slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, h("path", { key: '2cc35c21721affbc455ee49c521ea174ce2222e5', fill: "currentColor", d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }))), h("ir-icon", { key: 'ce77ee54a6bb7a2d1321857c75820b9e26834074', onIconClickHandler: this.exportArchive.bind(this) }, h("svg", { key: 'de4778da2d8b039a06d938f1bd026d2d0880f1e1', slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "15", viewBox: "0 0 384 512" }, h("path", { key: 'ce2f95b33621d4fe8cfccc2bdb816e0dafaff23d', fill: "currentColor", d: "M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" })))))));
    }
    static get is() { return "ir-hk-archive"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["ir-hk-archive.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ir-hk-archive.css"]
        };
    }
    static get states() {
        return {
            "selectedDates": {}
        };
    }
    static get listeners() {
        return [{
                "name": "dateChanged",
                "method": "handleDateRangeChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=ir-hk-archive.js.map
