import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { B as BookingService } from './booking.service.js';
import { R as RoomService } from './room.service.js';
import { c as calendar_data } from './calendar-data.js';
import { l as locales } from './locales.store.js';
import { a as axios } from './axios.js';
import { d as defineCustomElement$k } from './igl-application-info2.js';
import { d as defineCustomElement$j } from './igl-block-dates-view2.js';
import { d as defineCustomElement$i } from './igl-book-property2.js';
import { d as defineCustomElement$h } from './igl-book-property-footer2.js';
import { d as defineCustomElement$g } from './igl-book-property-header2.js';
import { d as defineCustomElement$f } from './igl-booking-overview-page2.js';
import { d as defineCustomElement$e } from './igl-booking-room-rate-plan2.js';
import { d as defineCustomElement$d } from './igl-booking-rooms2.js';
import { d as defineCustomElement$c } from './igl-date-range2.js';
import { d as defineCustomElement$b } from './igl-pagetwo2.js';
import { d as defineCustomElement$a } from './igl-property-booked-by2.js';
import { d as defineCustomElement$9 } from './ir-autocomplete2.js';
import { d as defineCustomElement$8 } from './ir-button2.js';
import { d as defineCustomElement$7 } from './ir-date-picker2.js';
import { d as defineCustomElement$6 } from './ir-date-view2.js';
import { d as defineCustomElement$5 } from './ir-icon2.js';
import { d as defineCustomElement$4 } from './ir-interceptor2.js';
import { d as defineCustomElement$3 } from './ir-select2.js';
import { d as defineCustomElement$2 } from './ir-toast2.js';
import { d as defineCustomElement$1 } from './ir-tooltip2.js';

const iglBookPropertyContainerCss = ".sc-igl-book-property-container-h{display:block;margin:0;padding:0;letter-spacing:0px !important;font-family:'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;font-size:1rem !important;font-weight:400 !important;line-height:1.45 !important;color:#6b6f82 !important;text-align:left !important}.book-container.sc-igl-book-property-container{width:min-content;margin:0;padding:0}h3.sc-igl-book-property-container{font-size:1rem}";
const IglBookPropertyContainerStyle0 = iglBookPropertyContainerCss;

const IglBookPropertyContainer = /*@__PURE__*/ proxyCustomElement(class IglBookPropertyContainer extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.resetBookingData = createEvent(this, "resetBookingData", 7);
        this.bookingService = new BookingService();
        this.roomService = new RoomService();
        this.language = '';
        this.ticket = '';
        this.baseurl = '';
        this.propertyid = undefined;
        this.from_date = undefined;
        this.to_date = undefined;
        this.withIrToastAndInterceptor = true;
        this.bookingItem = undefined;
        this.showPaymentDetails = undefined;
        this.countryNodeList = undefined;
        this.calendarData = {};
    }
    setRoomsData(roomServiceResp) {
        var _a, _b;
        let roomsData = new Array();
        if ((_b = (_a = roomServiceResp.My_Result) === null || _a === void 0 ? void 0 : _a.roomtypes) === null || _b === void 0 ? void 0 : _b.length) {
            roomsData = roomServiceResp.My_Result.roomtypes;
            roomServiceResp.My_Result.roomtypes.forEach(roomCategory => {
                roomCategory.expanded = true;
            });
        }
        this.calendarData.roomsInfo = roomsData;
    }
    async initializeApp() {
        try {
            const [roomResponse, languageTexts, countriesList] = await Promise.all([
                this.roomService.fetchData(this.propertyid, this.language),
                this.roomService.fetchLanguage(this.language),
                this.bookingService.getCountries(this.language),
            ]);
            if (!locales.entries) {
                locales.entries = languageTexts.entries;
                locales.direction = languageTexts.direction;
            }
            this.countryNodeList = countriesList;
            const { allowed_payment_methods: paymentMethods, currency, allowed_booking_sources, adult_child_constraints, calendar_legends } = roomResponse['My_Result'];
            this.calendarData = { currency, allowed_booking_sources, adult_child_constraints, legendData: calendar_legends };
            this.setRoomsData(roomResponse);
            const paymentCodesToShow = ['001', '004'];
            this.showPaymentDetails = paymentMethods.some(method => paymentCodesToShow.includes(method.code));
        }
        catch (error) {
            console.error('Error initializing app:', error);
        }
    }
    componentWillLoad() {
        if (this.baseurl) {
            axios.defaults.baseURL = this.baseurl;
        }
        if (this.ticket !== '') {
            calendar_data.token = this.ticket;
            this.bookingService.setToken(this.ticket);
            this.roomService.setToken(this.ticket);
            this.initializeApp();
        }
    }
    async ticketChanged() {
        calendar_data.token = this.ticket;
        this.bookingService.setToken(this.ticket);
        this.roomService.setToken(this.ticket);
        this.initializeApp();
    }
    handleCloseBookingWindow() {
        this.bookingItem = null;
    }
    handleTriggerClicked() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.bookingItem = {
            FROM_DATE: this.from_date,
            defaultDateRange: {
                fromDate: new Date(),
                fromDateStr: '',
                toDate: tomorrow,
                toDateStr: '',
                dateDifference: 0,
                message: '',
            },
            TO_DATE: this.to_date,
            EMAIL: '',
            event_type: 'PLUS_BOOKING',
            ID: '',
            NAME: '',
            PHONE: '',
            REFERENCE_TYPE: '',
            TITLE: locales.entries.Lcz_NewBooking,
        };
    }
    render() {
        return (h(Host, { key: '31859a191a13184c986d2c70876e300c1baf8c1d' }, this.withIrToastAndInterceptor && (h(Fragment, null, h("ir-toast", null), h("ir-interceptor", null))), h("div", { key: 'f0f6fe439caea121b825e4b82dcdc6b5a37a7bd9', class: "book-container", onClick: this.handleTriggerClicked.bind(this) }, h("slot", { key: '54cd32aca9ca6b802407f2df8e226c01a7251083', name: "trigger" })), this.bookingItem && (h("igl-book-property", { allowedBookingSources: this.calendarData.allowed_booking_sources, adultChildConstraints: this.calendarData.adult_child_constraints, showPaymentDetails: this.showPaymentDetails, countryNodeList: this.countryNodeList, currency: this.calendarData.currency, language: this.language, propertyid: this.propertyid, bookingData: this.bookingItem, onResetBookingData: (e) => {
                e.stopImmediatePropagation();
                e.stopPropagation();
                this.resetBookingData.emit(null);
            }, onCloseBookingWindow: () => this.handleCloseBookingWindow() }))));
    }
    static get watchers() { return {
        "ticket": ["ticketChanged"]
    }; }
    static get style() { return IglBookPropertyContainerStyle0; }
}, [6, "igl-book-property-container", {
        "language": [1],
        "ticket": [1],
        "baseurl": [1],
        "propertyid": [2],
        "from_date": [1],
        "to_date": [1],
        "withIrToastAndInterceptor": [4, "with-ir-toast-and-interceptor"],
        "bookingItem": [32],
        "showPaymentDetails": [32],
        "countryNodeList": [32],
        "calendarData": [32]
    }, undefined, {
        "ticket": ["ticketChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["igl-book-property-container", "igl-application-info", "igl-block-dates-view", "igl-book-property", "igl-book-property-footer", "igl-book-property-header", "igl-booking-overview-page", "igl-booking-room-rate-plan", "igl-booking-rooms", "igl-date-range", "igl-pagetwo", "igl-property-booked-by", "ir-autocomplete", "ir-button", "ir-date-picker", "ir-date-view", "ir-icon", "ir-interceptor", "ir-select", "ir-toast", "ir-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "igl-book-property-container":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, IglBookPropertyContainer);
            }
            break;
        case "igl-application-info":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "igl-block-dates-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "igl-book-property":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "igl-book-property-footer":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "igl-book-property-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "igl-booking-overview-page":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "igl-booking-room-rate-plan":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "igl-booking-rooms":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "igl-date-range":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "igl-pagetwo":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "igl-property-booked-by":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "ir-autocomplete":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "ir-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "ir-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "ir-date-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "ir-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "ir-interceptor":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "ir-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "ir-toast":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "ir-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { IglBookPropertyContainer as I, defineCustomElement as d };

//# sourceMappingURL=igl-book-property-container2.js.map