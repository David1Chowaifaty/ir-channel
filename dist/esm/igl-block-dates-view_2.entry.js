import { r as registerInstance, c as createEvent, h, H as Host } from './index-7f938890.js';
import { B as BookingService } from './booking.service-09a9de7f.js';
import { l as locales } from './locales.store-1c6011e1.js';
import { c as calendar_data } from './calendar-data-d7f55348.js';
import { v as v4 } from './v4-964634d6.js';
import './axios-d199a765.js';
import './utils-096d5f7a.js';
import './moment-ab846cee.js';
import './booking-0ffd87de.js';
import './Token-692eae02.js';

const iglBlockDatesViewCss = ".sc-igl-block-dates-view-h{display:block}.sc-igl-block-dates-view-h .controlContainer.sc-igl-block-dates-view{width:24px}.sc-igl-block-dates-view-h .checkBoxContainer.sc-igl-block-dates-view input.sc-igl-block-dates-view{height:1.2rem !important;width:30px}.releaseTime.sc-igl-block-dates-view{padding-left:5px}.out-of-service-label.sc-igl-block-dates-view{margin-left:5px !important}";
const IglBlockDatesViewStyle0 = iglBlockDatesViewCss;

const IglBlockDatesView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.blockDatesData = {
            RELEASE_AFTER_HOURS: 0,
            OPTIONAL_REASON: '',
            OUT_OF_SERVICE: false,
        }; // Change of property name might require updates in booking-event-hover
        this.releaseList = [];
        this.bookingService = new BookingService();
        this.defaultData = undefined;
        this.fromDate = undefined;
        this.toDate = undefined;
        this.entryDate = undefined;
        this.entryHour = undefined;
        this.isEventHover = false;
        this.entryMinute = undefined;
        this.renderAgain = false;
    }
    async componentWillLoad() {
        try {
            this.bookingService.setToken(calendar_data.token);
            this.releaseList = await this.bookingService.getBlockedInfo();
            if (this.defaultData) {
                this.blockDatesData = Object.assign({}, this.defaultData);
            }
            else {
                this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(this.releaseList[0].CODE_NAME);
                this.emitData();
            }
        }
        catch (error) {
            // toastr.error(error);
        }
    }
    handleOptionalReason(event) {
        this.blockDatesData.OPTIONAL_REASON = event.target.value;
        this.emitData();
    }
    handleReleaseAfterChange(evt) {
        if (this.entryDate)
            this.entryDate = undefined;
        this.blockDatesData.RELEASE_AFTER_HOURS = parseInt(evt.target.value);
        this.renderPage();
        this.emitData();
    }
    emitData() {
        this.dataUpdateEvent.emit({
            key: 'blockDatesData',
            data: Object.assign({}, this.blockDatesData),
        });
    }
    getReleaseHoursString() {
        // console.log("entry date", this.entryDate);
        // console.log("blocked date data", this.blockDatesData);
        let dt = this.entryDate ? new Date(this.entryDate) : new Date();
        if (this.entryDate && this.entryHour && this.entryMinute) {
            dt.setHours(this.entryHour, this.entryMinute, 0, 0);
        }
        else {
            dt.setHours(dt.getHours() + this.blockDatesData.RELEASE_AFTER_HOURS, dt.getMinutes(), 0, 0);
        }
        return dt.toLocaleString('default', { month: 'short' }) + ' ' + dt.getDate() + ', ' + this.formatNumber(dt.getHours()) + ':' + this.formatNumber(dt.getMinutes());
    }
    formatNumber(value) {
        return value < 10 ? `0${value}` : value;
    }
    handleOutOfService(evt) {
        this.blockDatesData.OUT_OF_SERVICE = evt.target.checked;
        if (this.blockDatesData.OUT_OF_SERVICE) {
            this.blockDatesData.OPTIONAL_REASON = '';
            this.blockDatesData.RELEASE_AFTER_HOURS = 0;
        }
        this.renderPage();
        this.emitData();
    }
    renderPage() {
        this.renderAgain = !this.renderAgain;
    }
    render() {
        console.log(this.fromDate);
        return (h(Host, { key: '9c21805b294839890e96edad31fbedacdf63b5b4' }, h("div", { key: '547207f047eed5a17b0d4a845125ecd5c32d4613', class: `m-0 p-0 mb-1` }, h("div", { key: 'f2769e0e8b6a459326c07360f82779fed406612c', class: "text-left p-0" }, h("ir-date-view", { key: 'ab13359a0dd80e6f02a7f2c4122d9c3e7224375c', from_date: this.fromDate, dateOption: "DD MMM YYYY", showDateDifference: false, to_date: this.toDate }))), h("div", { key: 'a11a83b07a8d455988df000365a4243c4565f64a', class: ` mb-1 text-left ${this.isEventHover && 'p-0'}` }, h("div", { key: '0f4f6492a6e2fa906692698ae3a74dd0307a36ee', class: "mb-1 " }, h("label", { key: '183bbc1e536baec85c163a28ae9f49ce34d10d3b', class: "p-0 text-bold-700 font-medium-1 m-0 align-middle" }, locales.entries.Lcz_Reason, ":"), h("div", { key: '070947def5f622aa9e829f022df4dfa77820c786', class: "p-0 m-0 pr-1  controlContainer checkBoxContainer d-inline-block align-middle" }, h("input", { key: 'd59ed226805a8667a078a027a68c2eaefc594f90', class: "form-control", type: "checkbox", checked: this.blockDatesData.OUT_OF_SERVICE, id: "userinput6", onChange: event => this.handleOutOfService(event) })), h("span", { key: '46634812558b1a5382e87127a9a4649688f5ec1c', class: "align-middle out-of-service-label" }, locales.entries.Lcz_OutOfservice)), !this.blockDatesData.OUT_OF_SERVICE ? (h("div", null, h("div", { class: "mb-1 d-flex  align-items-center" }, h("span", { class: "align-middle" }, locales.entries.Lcz_Or, " "), h("div", { class: "d-inline-flex col pr-0 align-middle" }, h("input", { class: "form-control", type: "text", placeholder: locales.entries.Lcz_OptionalReason, id: "optReason", value: this.blockDatesData.OPTIONAL_REASON, onInput: event => this.handleOptionalReason(event) }))), h("div", { class: "mb-1 w-100 pr-0 " }, h("span", { class: "text-bold-700 font-medium-1" }, locales.entries.Lcz_AutomaticReleaseIn, ": "), h("div", { class: "d-inline-block" }, h("select", { class: "form-control input-sm", id: "zSmallSelect", onChange: evt => this.handleReleaseAfterChange(evt) }, this.releaseList.map(releaseItem => (h("option", { value: +releaseItem.CODE_NAME, selected: this.blockDatesData.RELEASE_AFTER_HOURS == +releaseItem.CODE_NAME }, releaseItem.CODE_VALUE_EN))))), this.blockDatesData.RELEASE_AFTER_HOURS ? (h("div", { class: "d-inline-block releaseTime" }, h("em", null, locales.entries.Lcz_On, " ", this.getReleaseHoursString()))) : null))) : null)));
    }
};
IglBlockDatesView.style = IglBlockDatesViewStyle0;

const otaLabelCss = "*.sc-ota-label{margin:0;padding:0}.sc-ota-label-h{display:flex;margin-bottom:5px;gap:5px;width:100%}strong.sc-ota-label{margin:0;padding:0}ul.sc-ota-label{margin:0 3px;padding:0;list-style:none;overflow:hidden;width:100%;word-wrap:break-word !important;overflow-wrap:break-word !important}li.sc-ota-label{width:100%;line-height:1.5;margin:0;padding:0;word-wrap:break-word !important;overflow-wrap:break-word !important}button.sc-ota-label{background:white;color:var(--blue);padding:0;margin:0;margin-left:3px;font-size:12px;border:0}button.sc-ota-label:hover{color:#355270}";
const OtaLabelStyle0 = otaLabelCss;

const OtaLabel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.toggleShowAll = () => {
            this.showAll = !this.showAll;
        };
        this.label = undefined;
        this.remarks = undefined;
        this.maxVisibleItems = 3;
        this.showAll = false;
    }
    render() {
        if (!this.remarks) {
            return null;
        }
        const displayedRemarks = this.showAll ? this.remarks : this.remarks.slice(0, this.maxVisibleItems);
        return (h(Host, null, h("strong", null, this.label), h("ul", null, displayedRemarks.map((remark, index) => (h("li", { key: v4() }, "- ", remark.statement, ' ', this.remarks.length > this.maxVisibleItems && index === displayedRemarks.length - 1 && (h("button", { onClick: this.toggleShowAll }, this.showAll ? locales.entries.Lcz_ShowLess : locales.entries.Lcz_ShowMore))))))));
    }
};
OtaLabel.style = OtaLabelStyle0;

export { IglBlockDatesView as igl_block_dates_view, OtaLabel as ota_label };

//# sourceMappingURL=igl-block-dates-view_2.entry.js.map