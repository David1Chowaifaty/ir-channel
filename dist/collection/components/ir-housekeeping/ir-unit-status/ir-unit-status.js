import { HouseKeepingService } from "../../../services/housekeeping.service";
import housekeeping_store from "../../../stores/housekeeping.store";
import locales from "../../../stores/locales.store";
import { Host, h } from "@stencil/core";
export class IrUnitStatus {
    constructor() {
        this.housekeepingService = new HouseKeepingService();
    }
    componentWillLoad() {
        this.housekeepingService.setToken(housekeeping_store.default_properties.token);
    }
    async handleSelectChange(e) {
        try {
            e.stopPropagation();
            e.stopImmediatePropagation();
            const window = e.detail;
            let mode;
            if (window === '') {
                mode = {
                    is_active: false,
                    window: -1,
                };
            }
            else {
                mode = {
                    is_active: true,
                    window: +window,
                };
            }
            await this.housekeepingService.setExposedInspectionMode(housekeeping_store.default_properties.property_id, mode);
            this.resetData.emit(null);
        }
        catch (error) {
            console.error(error);
        }
    }
    render() {
        var _a;
        return (h(Host, { key: 'bb13f5450dd9e8fb24dc8857042cf8d8bd2a69d4', class: "card p-1" }, h("ir-title", { key: 'f1b8f4779e5b2efacba4d8c8d6c631717c51c0b6', label: locales.entries.Lcz_RoomOrUnitStatus }), h("div", { key: 'ff42ab542c2544f56b6484e23f641bc94e881054', class: "table-container" }, h("table", { key: 'aacfec0da38e8dfa20c2cef0a89c70a64ceacc6b' }, h("thead", { key: '8ad923a89209eade0cfbf5caa681a1fd72ee14ed' }, h("tr", { key: '3ac360c37d32c40132f246eb215d931de52c2833' }, h("th", { key: 'a7c232db8579ec37285df36f03fc97abfaca2c1e' }, locales.entries.Lcz_Status), h("th", { key: 'c7ef8f243ce4b77c6d5239f0f3954ab1436db928', class: 'text-center' }, locales.entries.Lcz_Code), h("th", { key: 'd46f14768b7e6f1211f802825ee5690d2ed08489' }, locales.entries.Lcz_Action))), h("tbody", { key: '797643afc489643114ff716186cfff4fd744dbff' }, (_a = housekeeping_store.hk_criteria.statuses) === null || _a === void 0 ? void 0 : _a.map(status => {
            var _a;
            return (h("tr", { key: status.code }, h("td", null, h("div", { class: "status-container" }, h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), h("p", null, status.description))), h("td", null, status.code), h("td", null, h("div", { class: "action-container" }, h("p", { class: 'm-0' }, status.action), status.code === 'VAC' && (h("div", null, h("ir-select", { selectedValue: status.inspection_mode.is_active ? (_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.window.toString() : '', LabelAvailable: false, firstOption: locales.entries.Lcz_No, onSelectChange: this.handleSelectChange.bind(this), data: Array.from(Array(7 + 1), (_, i) => i).map(i => {
                    const text = i === 0
                        ? locales.entries.Lcz_YesOnTheSameDay
                        : i === 1
                            ? locales.entries.Lcz_DayPrior.replace('%1', i.toString())
                            : locales.entries.Lcz_DaysPrior.replace('%1', i.toString());
                    return {
                        text,
                        value: i.toString(),
                    };
                }) })))))));
        }))))));
    }
    static get is() { return "ir-unit-status"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["ir-unit-status.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["ir-unit-status.css"]
        };
    }
    static get events() {
        return [{
                "method": "resetData",
                "name": "resetData",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "null",
                    "resolved": "null",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=ir-unit-status.js.map
