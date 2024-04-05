import locales from "../../../stores/locales.store";
import { Host, h } from "@stencil/core";
export class IglLegends {
    constructor() {
        this.legendData = undefined;
    }
    handleOptionEvent(key, data = '') {
        this.optionEvent.emit({ key, data });
    }
    render() {
        return (h(Host, { key: 'dda809ab884d0ee50cd9e133942429902c8360d7', class: "legendContainer pr-1 text-left" }, h("div", { key: '0469637de72a2b63d55de04f77bf059b245b24b8', class: 'w-full' }, h("div", { key: 'f068a4acb7b486df0618a925f0c0b16b158e8c0b', class: 'w-full' }, h("div", { key: '52131d54206a8e3c925bc53d7735ef35aa7f2131', class: "stickyHeader pt-1 " }, h("p", { key: '940b20aa5b47771c54e7ffa20a3899e9599561ba', class: "legendHeader" }, locales.entries.Lcz_Legend), h("div", { key: 'e68c3d8a0cce09fbf6df6020524e06139b706623', class: "legendCloseBtn", onClick: () => this.handleOptionEvent('closeSideMenu') }, h("svg", { key: '11d478f12cde69e00a43f45876274c6f12fc0038', xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", height: 18, width: 18 }, h("path", { key: '8e21f20148115f0111fe2dfe9a44129dcd464aff', fill: "#6b6f82", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }))), h("hr", { key: 'bb2aaf0549bdaf154bcb3ad625fe73b411b880f0' })), h("div", { key: '99204008651132a560e45ff0087f6513555b0871', class: "mt-2 pl-1" }, this.legendData.map(legendInfo => (h("div", { class: "legendRow " }, h("div", { class: `legend_${legendInfo.design} mr-1`, style: { backgroundColor: legendInfo.color } }), h("span", { class: "font-small-3" }, legendInfo.name))))), h("hr", { key: '802a6b06437602d1e0e2447799c950aae2411d49' }), h("div", { key: 'ad9c8c8eb26bc5f5b875b7586a6a9efd0474917e', class: "mt-2" }, h("div", { key: 'c1c22db249b006be3632f10810b54c0901036194', class: "legendCalendar" }, h("div", { key: 'c09270b75cddb2d7489ceddd86b8596778ce1234', class: "legendRow align-items-center" }, h("div", { key: 'a755da928e26ca8faf2ca29ce757f9b7bcdb1f05', class: "legendCal br-t br-s br-bt" }, h("strong", { key: '5ddfb46691f0c77bb2af54de90317551baf6619d' }, "MAR 2022")), h("div", { key: '99d619752a6a64e6a373627031ba949dc55c689f', class: "highphenLegend" }, locales.entries.Lcz_MonthAndYear)), h("div", { key: '07f453d7d546dfa2f74900f26c82d0863c25ad69', class: "legendRow" }, h("div", { key: 'bbd14f3fb499e445077429c3f7053a7c2c9a7c3a', class: "legendCal headerCell align-items-center br-s" }, h("span", { key: 'dd0b3dca2d772a7c1fbc2f8746921ef00a453c20', class: "badge badge-info  badge-pill" }, "3")), h("div", { key: 'eb4acfef819b773164e2e0f79e0615c6e141e0ce', class: "highphenLegend" }, h("div", { key: '583243f0db4fce2cf7d05f1e6a0ede8f34a23b68' }, locales.entries.Lcz_UnassignedUnits))), h("div", { key: '17d8c4d9f0406c2e33b0e91f6fceefe095dbcceb', class: "legendRow" }, h("div", { key: 'e2e1f2cea1abe9bfef5ac5fd20096f14c5eb6e21', class: "legendCal dayTitle br-s" }, "Fri 18"), h("div", { key: 'a7b3c1bba3f4bde68b9edb0eb11f8516aafa7e96', class: "highphenLegend" }, locales.entries.Lcz_Date)), h("div", { key: '8ffc3241e98f6faf8c2e860ef3119c79bfbf4f7a', class: "legendRow" }, h("div", { key: '4c98a8393e9959b03cad0022287e80f5ec6b9df4', class: "legendCal br-s br-bt dayCapacityPercent" }, "15%"), h("div", { key: '18075f60c32bea04d098bb7438e79885b3604faf', class: "highphenLegend" }, locales.entries.Lcz_Occupancy)), h("div", { key: '7da898fef2d1a56dc8d283d9cbd078635b237e88', class: "legendRow" }, h("div", { key: '38153a57669742ecb4e4488fa666f8557e8548f1', class: "legendCal br-s br-bt  font-weight-bold total-availability" }, "20"), h("div", { key: '525c46333efe6285d85ec97bac0536cd05a020bd', class: "highphenLegend" }, locales.entries.Lcz_TotalAvailability))))))));
    }
    static get is() { return "igl-legends"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["igl-legends.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["igl-legends.css"]
        };
    }
    static get properties() {
        return {
            "legendData": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "{ [key: string]: any; }",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            }
        };
    }
    static get events() {
        return [{
                "method": "optionEvent",
                "name": "optionEvent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "{ [key: string]: any; }",
                    "references": {}
                }
            }];
    }
}
//# sourceMappingURL=igl-legends.js.map
