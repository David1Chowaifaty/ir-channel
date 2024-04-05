import { Host, h, Fragment } from "@stencil/core";
import { BookingService } from "../../../services/booking.service";
import { v4 } from "uuid";
import locales from "../../../stores/locales.store";
import calendar_data from "../../../stores/calendar-data";
export class IglPropertyBookedBy {
    constructor() {
        this.bookingService = new BookingService();
        this.arrivalTimeList = [];
        this.expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        this.expiryYears = [];
        this.currentMonth = '01';
        this.language = undefined;
        this.showPaymentDetails = false;
        this.defaultData = undefined;
        this.countryNodeList = [];
        this.propertyId = undefined;
        this.isButtonPressed = false;
        this.bookedByData = {
            id: undefined,
            email: '',
            firstName: '',
            lastName: '',
            countryId: '',
            isdCode: '',
            contactNumber: '',
            selectedArrivalTime: '',
            emailGuest: false,
            message: '',
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
        };
    }
    async componentWillLoad() {
        this.bookingService.setToken(calendar_data.token);
        this.assignCountryCode();
        this.initializeExpiryYears();
        this.initializeDateData();
        this.populateBookedByData();
    }
    initializeExpiryYears() {
        const currentYear = new Date().getFullYear();
        this.expiryYears = Array.from({ length: 4 }, (_, index) => (currentYear + index).toString());
    }
    async assignCountryCode() {
        const country = await this.bookingService.getUserDefaultCountry();
        const countryId = country['COUNTRY_ID'];
        this.country = countryId;
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: countryId.toString(), countryId });
    }
    initializeDateData() {
        const dt = new Date();
        const month = dt.getMonth() + 1;
        this.currentMonth = month < 10 ? `0${month}` : month.toString();
    }
    populateBookedByData() {
        var _a;
        this.bookedByData = this.defaultData ? Object.assign(Object.assign({}, this.bookedByData), this.defaultData) : {};
        this.arrivalTimeList = ((_a = this.defaultData) === null || _a === void 0 ? void 0 : _a.arrivalTime) || [];
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { selectedArrivalTime: this.arrivalTimeList[0].CODE_NAME });
        if (!this.bookedByData.expiryMonth) {
            this.bookedByData.expiryMonth = this.currentMonth;
        }
        if (!this.bookedByData.expiryYear) {
            this.bookedByData.expiryYear = new Date().getFullYear();
        }
        console.log('initial bookedby data', this.bookedByData);
    }
    handleDataChange(key, event) {
        this.bookedByData[key] = key === 'emailGuest' ? event.target.checked : event.target.value;
        this.dataUpdateEvent.emit({
            key: 'bookedByInfoUpdated',
            data: Object.assign({}, this.bookedByData),
        });
        if (key === 'countryId') {
            this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { isdCode: event.target.value });
        }
        console.log(this.bookedByData);
    }
    handleNumberInput(key, event) {
        const inputElement = event.target;
        const inputValue = inputElement.value;
        // Regular expression to match only numeric characters (0-9)
        const numericRegex = /^[0-9]+$/;
        if (!numericRegex.test(inputValue)) {
            // If the input is not numeric, prevent it from being entered
            inputElement.value = inputValue.replace(/[^0-9]/g, '');
        }
        if (inputValue === inputElement.value) {
            this.handleDataChange(key, event);
        }
    }
    async handleEmailInput(key, event) {
        const inputElement = event.target;
        const inputValue = inputElement.value;
        if (this.isValidEmail(inputValue)) {
            this.handleDataChange(key, event);
        }
    }
    async checkUser() {
        try {
            const email = this.bookedByData.email;
            if (this.isValidEmail(email)) {
                const res = await this.bookingService.getUserInfo(email);
                if (res !== null) {
                    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: res.id, firstName: res.first_name, lastName: res.last_name, contactNumber: res.mobile, countryId: res.country_id, isdCode: res.country_id.toString() });
                }
                else {
                    this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: undefined, firstName: '', lastName: '', contactNumber: '', countryId: '', isdCode: '' });
                }
                this.dataUpdateEvent.emit({
                    key: 'bookedByInfoUpdated',
                    data: Object.assign({}, this.bookedByData),
                });
            }
        }
        catch (error) {
            //   toastr.error(error);
        }
    }
    isValidEmail(emailId) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(emailId);
    }
    handleComboboxChange(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        const { key, data } = e.detail;
        switch (key) {
            case 'blur':
                if (data !== '') {
                    this.bookedByData.email = data;
                    this.checkUser();
                }
                break;
            case 'select':
                this.bookedByData.email = data.email;
                this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: data.id, firstName: data.first_name, lastName: data.last_name, contactNumber: data.mobile, countryId: data.country_id, isdCode: data.country_id.toString() });
                this.dataUpdateEvent.emit({
                    key: 'bookedByInfoUpdated',
                    data: this.bookedByData,
                });
                break;
            default:
                break;
        }
    }
    clearEvent() {
        this.bookedByData.email = '';
        this.bookedByData = Object.assign(Object.assign({}, this.bookedByData), { id: '', firstName: '', lastName: '', contactNumber: '', isdCode: this.country.toString(), countryId: this.country });
        this.dataUpdateEvent.emit({
            key: 'bookedByInfoUpdated',
            data: Object.assign({}, this.bookedByData),
        });
    }
    handleButtonClicked(event) {
        switch (event.detail.key) {
            case 'book':
            case 'bookAndCheckIn':
                this.isButtonPressed = true;
                break;
        }
    }
    render() {
        return (h(Host, { key: '76a3cb325e55e3bd64505655720e3a0852ffb752' }, h("div", { key: '36bf49ec9c8fcfea19d519a7d97cfcf4988c54da', class: "text-left mt-3" }, h("div", { key: '2383d8b86f666b81f1a56ca27e38819a749b3798', class: "form-group d-flex flex-column flex-md-row align-items-md-center text-left " }, h("label", { key: 'a74d7714db012650e7922b269390bf8c160b2861', class: "p-0 m-0 label-control mr-1 font-weight-bold" }, locales.entries.Lcz_BookedBy), h("div", { key: 'e0002b7798b2b5de4947d4ea8db6a7f91e4345aa', class: "bookedByEmailContainer mt-1 mt-md-0 d-flex align-items-center" }, h("ir-autocomplete", { key: 'a2900ba30ccecdb7b2a8106ea28343038e8e9c41', onComboboxValue: this.handleComboboxChange.bind(this), propertyId: this.propertyId, type: "email", value: this.bookedByData.email, required: true, class: 'flex-fill', placeholder: locales.entries.Lcz_FindEmailAddress, onInputCleared: () => this.clearEvent() }), h("ir-tooltip", { key: '705b5a3625251149d7aab6a50f42fe64a4f5a76f', class: 'ml-1', message: "Leave empty if email is unavailable" })))), h("div", { key: '9e09c3ce428a709354d059421defd3580f484516', class: "bookedDetailsForm text-left mt-2 font-small-3 " }, h("div", { key: 'b877f84ef774ca211bafc29bdaaa8ee29c54991c', class: "d-flex flex-column flex-md-row  justify-content-md-between " }, h("div", { key: '71a64826b4771d2d0e0e0001714038025a598460', class: "p-0 flex-fill " }, h("div", { key: '9b1a612d8599d0d2f4adcf009cdf58712e3a6a55', class: "form-group d-flex flex-column flex-md-row align-items-md-center p-0 flex-fill " }, h("label", { key: '3457a1cf4a25df161e1bc8df83c22652963aaf15', class: "p-0 m-0 margin3" }, locales.entries.Lcz_FirstName), h("div", { key: '138bd9503c3eb6182aed624a4a5771b9dc6166c1', class: "p-0 m-0  controlContainer flex-fill  " }, h("input", { key: '514aadcc0291375d34bcdf3789dbe4ec58241450', class: `form-control flex-fill ${this.isButtonPressed && this.bookedByData.firstName === '' && 'border-danger'}`, type: "text", placeholder: locales.entries.Lcz_FirstName, id: v4(), value: this.bookedByData.firstName, onInput: event => this.handleDataChange('firstName', event), required: true }))), h("div", { key: 'f8e6ab1d01a14ad3ecbca190e9ea7b3d660977a2', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: 'c56559a0eb47a9cb59740e46a69ebec0c1c5f680', class: "p-0 m-0 margin3" }, locales.entries.Lcz_LastName), h("div", { key: 'd2b75a0bff0974a93215612361a5907e15507914', class: "p-0 m-0  controlContainer flex-fill" }, h("input", { key: '4b81f5cf4a3c248c205c6535cb9a0ceaae7b3e74', class: `form-control ${this.isButtonPressed && this.bookedByData.lastName === '' && 'border-danger'}`, type: "text", placeholder: locales.entries.Lcz_LastName, id: v4(), value: this.bookedByData.lastName, onInput: event => this.handleDataChange('lastName', event) }))), h("div", { key: 'b1cb9b4501ecd87486fb059ebe98d6f18d64b023', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: 'a4e634b7ede53185d8c395037f07a35708357736', class: "p-0 m-0 margin3" }, locales.entries.Lcz_Country), h("div", { key: '55463b1e0f4fb8539116d3a3dbb6a6742d0c5b75', class: "p-0 m-0  controlContainer flex-fill" }, h("select", { key: 'fb563a10e67fabc425b6c8b41477537991573142', class: `form-control input-sm pr-0`, id: v4(), onChange: event => this.handleDataChange('countryId', event) }, h("option", { key: '65fce6e731fa7d9b681c6166a66ab045eca783dc', value: "", selected: this.bookedByData.countryId === '' }, locales.entries.Lcz_Select), this.countryNodeList.map(countryNode => (h("option", { value: countryNode.id, selected: this.bookedByData.countryId === countryNode.id }, countryNode.name)))))), h("div", { key: '8968aa9e5793261e99ec00d0a8c8e2d08a701542', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '9c6ca3e3fe0389a78ba430f45c117c85c5a28fb5', class: "p-0 m-0 margin3" }, locales.entries.Lcz_MobilePhone), h("div", { key: 'f23d005010f54d7840b8dd79cae2b7cc3235ee37', class: "p-0 m-0  d-flex  controlContainer flex-fill" }, h("div", { key: '592fdd520f44b7b530ab7fa7e5a7d83f93ba33bf', class: " p-0 m-0" }, h("select", { key: '46124fa64888147d696afc8b23eeb911e52accae', class: `form-control input-sm pr-0`, id: v4(), onChange: event => this.handleDataChange('isdCode', event) }, h("option", { key: '43f1c523172f52c3d064b74c04e92f6456918806', value: "", selected: this.bookedByData.isdCode === '' }, locales.entries.Lcz_Isd), this.countryNodeList.map(country => (h("option", { value: country.id, selected: this.bookedByData.isdCode === country.id.toString() }, country.phone_prefix))))), h("div", { key: 'ca413bd0131b62051b21db21d60061d00e58f87c', class: "flex-fill p-0 m-0" }, h("input", { key: '8b3abe73686ccdc3c2d3165c207d5dafdf2de820', class: `form-control
                     
                      `, type: "tel", placeholder: locales.entries.Lcz_ContactNumber, id: v4(), value: this.bookedByData.contactNumber, onInput: event => this.handleNumberInput('contactNumber', event) })))), h("div", { key: 'f9ce2d88d9c74cca91743951f41b57185260838e', class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { key: '5b3867fb61f93a6ec460dcc067dcb6ec43011a0e', class: "p-0 m-0 margin3" }, locales.entries.Lcz_YourArrivalTime), h("div", { key: 'cb633505355d8ba13a039954f9631bbcadcdda6a', class: "p-0 m-0  controlContainer flex-fill" }, h("select", { key: '848e6c7b040fe958bf21a328f5174b1d73eb9163', class: `form-control input-sm pr-0 ${this.isButtonPressed && this.bookedByData.selectedArrivalTime.code === '' && 'border-danger'}`, id: v4(), onChange: event => this.handleDataChange('selectedArrivalTime', event) }, this.arrivalTimeList.map(time => (h("option", { value: time.CODE_NAME, selected: this.bookedByData.selectedArrivalTime.code === time.CODE_NAME }, time.CODE_VALUE_EN))))))), h("div", { key: 'eaddd558428abf1f027864e09917a432e44dbc1f', class: "p-0 flex-fill  ml-md-3" }, h("div", { key: '1d0065244658c599c5c7782cbdd1498d982d82ad', class: "  p-0 d-flex flex-column flex-md-row align-items-md-center " }, h("label", { key: 'd9f7854199a20d6941e90ebfe8cb0d093014c44c', class: "p-0 m-0 margin3" }, locales.entries.Lcz_AnyMessageForUs), h("div", { key: '82310bcc254872b4374726580dc1f7464db0c369', class: "p-0 m-0  controlContainer flex-fill " }, h("textarea", { key: 'a2cdd2b40d2c158eef06f77c2a5d3ae78721bc25', id: v4(), rows: 4, class: "form-control ", name: "message", value: this.bookedByData.message, onInput: event => this.handleDataChange('message', event) }))), this.showPaymentDetails && (h(Fragment, null, h("div", { class: "form-group mt-md-1  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, locales.entries.Lcz_CardNumber), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardNumber, onInput: event => this.handleNumberInput('cardNumber', event) }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, locales.entries.Lcz_CardHolderName), h("div", { class: "p-0 m-0  controlContainer flex-fill" }, h("input", { class: "form-control", type: "text", placeholder: "", pattern: "0-9 ", id: v4(), value: this.bookedByData.cardHolderName, onInput: event => this.handleDataChange('cardHolderName', event) }))), h("div", { class: "form-group  p-0 d-flex flex-column flex-md-row align-items-md-center" }, h("label", { class: "p-0 m-0 margin3" }, locales.entries.Lcz_ExpiryDate), h("div", { class: "p-0 m-0 row  controlContainer flex-fill" }, h("div", { class: "p-0 m-0" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryMonth', event) }, this.expiryMonths.map(month => (h("option", { value: month, selected: month === this.bookedByData.expiryMonth }, month))))), h("div", { class: "p-0 m-0 ml-1" }, h("select", { class: "form-control input-sm pr-0", id: v4(), onChange: event => this.handleDataChange('expiryYear', event) }, this.expiryYears.map((year, index) => (h("option", { value: year, selected: index === this.bookedByData.expiryYear }, year))))))))), h("div", { key: '8a1c70b48c728c7f6b802c10512164d4357d6af8', class: "form-group mt-1 p-0 d-flex flex-row align-items-center" }, h("label", { key: '992740037607b3c74201b848a62943a75251c1f2', class: "p-0 m-0", htmlFor: 'emailTheGuestId' }, locales.entries.Lcz_EmailTheGuest), h("div", { key: 'ef415d13f41df1881ad1b71a5dc189e0e5b57dc3', class: "p-0 m-0  controlContainer flex-fill checkBoxContainer" }, h("input", { key: 'c7e9c568520d6729314f99e699c0d6877158a263', class: "form-control", type: "checkbox", checked: this.bookedByData.emailGuest, id: 'emailTheGuestId', onChange: event => this.handleDataChange('emailGuest', event) }))))))));
    }
    static get is() { return "igl-property-booked-by"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["igl-property-booked-by.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["igl-property-booked-by.css"]
        };
    }
    static get properties() {
        return {
            "language": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "language",
                "reflect": false
            },
            "showPaymentDetails": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "show-payment-details",
                "reflect": false,
                "defaultValue": "false"
            },
            "defaultData": {
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
            },
            "countryNodeList": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ICountry[]",
                    "resolved": "ICountry[]",
                    "references": {
                        "ICountry": {
                            "location": "import",
                            "path": "../../../models/IBooking",
                            "id": "src/models/IBooking.ts::ICountry"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "defaultValue": "[]"
            },
            "propertyId": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "property-id",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "isButtonPressed": {},
            "bookedByData": {}
        };
    }
    static get events() {
        return [{
                "method": "dataUpdateEvent",
                "name": "dataUpdateEvent",
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
    static get listeners() {
        return [{
                "name": "buttonClicked",
                "method": "handleButtonClicked",
                "target": "body",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=igl-property-booked-by.js.map
