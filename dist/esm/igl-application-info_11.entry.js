import { r as registerInstance, c as createEvent, h, H as Host, F as Fragment, g as getElement } from './index-7f938890.js';
import { n as getCurrencySymbol, d as dateToFormattedString, j as getReleaseHoursString } from './utils-096d5f7a.js';
import { l as locales } from './locales.store-1c6011e1.js';
import { c as calendar_data } from './calendar-data-d7f55348.js';
import { v as v4 } from './v4-964634d6.js';
import { B as BookingService } from './booking.service-09a9de7f.js';
import { t as transformNewBLockedRooms } from './booking-0ffd87de.js';
import { E as EventsService } from './events.service-ed991686.js';
import { i as isRequestPending, a as interceptor_requests } from './ir-interceptor.store-9d67ad76.js';
import { h as hooks } from './moment-ab846cee.js';
import { a as axios } from './axios-d199a765.js';
import './Token-692eae02.js';

const iglApplicationInfoCss = ".sc-igl-application-info-h{display:block}@media only screen and (min-width: 908px){.aplicationInfoContainer.sc-igl-application-info{max-width:80%}.guest-info-container.sc-igl-application-info{max-width:300px}.preference-select-container.sc-igl-application-info{max-width:250px}}";
const IglApplicationInfoStyle0 = iglApplicationInfoCss;

const IglApplicationInfo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.userRate = 0;
        this.guestInfo = undefined;
        this.currency = undefined;
        this.roomsList = [];
        this.guestRefKey = undefined;
        this.bedPreferenceType = [];
        this.selectedUnits = [];
        this.bookingType = 'PLUS_BOOKING';
        this.defaultGuestPreference = undefined;
        this.index = undefined;
        this.defaultGuestRoomId = undefined;
        this.dateDifference = undefined;
        this.filterdRoomList = [];
        this.isButtonPressed = false;
        this.guestData = undefined;
    }
    componentWillLoad() {
        console.log(this.guestInfo);
        if (this.guestInfo.isRateModified && this.guestInfo.rateType === 2) {
            this.userRate = this.guestInfo.rate * this.dateDifference;
        }
        else {
            this.userRate = this.guestInfo.rate;
        }
        this.guestData = this.guestInfo ? Object.assign({}, this.guestInfo) : {};
        this.guestData.roomId = '';
        if (this.defaultGuestRoomId && this.roomsList.filter(e => e.id.toString() === this.defaultGuestRoomId.toString()).length > 0) {
            this.guestData.roomId = this.defaultGuestRoomId;
        }
        this.guestData.preference = +this.defaultGuestPreference || '';
        this.updateRoomList();
    }
    componentDidLoad() {
        this.timeout = setTimeout(() => {
            this.updateData();
        }, 200);
    }
    disconnectedCallback() {
        clearTimeout(this.timeout);
    }
    async handleSelctedUnits() {
        this.updateRoomList();
    }
    updateRoomList() {
        const units = [...this.selectedUnits];
        units[this.index] = -1;
        this.filterdRoomList = this.roomsList.filter(e => !units.includes(e.id) || e.name === '');
    }
    updateData() {
        this.dataUpdateEvent.emit({
            key: 'roomRatePlanUpdate',
            guestRefKey: this.guestRefKey,
            data: Object.assign({}, this.guestData),
        });
    }
    handleDataChange(key, value) {
        this.guestData[key] = +value;
        if (value === '') {
            this.guestData['roomName'] = value;
        }
        if (key === 'roomId' && value !== '') {
            this.guestData['roomName'] = this.filterdRoomList.find(room => room.id === +value).name || '';
        }
        console.log('guest data', this.guestData);
        this.updateData();
    }
    handleGuestNameChange(event) {
        // console.log("On Guest name Change::", event.target.value);
        this.guestData.guestName = event.target.value;
        this.updateData();
    }
    handleButtonClicked(event) {
        switch (event.detail.key) {
            case 'book':
            case 'bookAndCheckIn':
            case 'save':
                this.isButtonPressed = true;
                break;
        }
    }
    render() {
        //console.log(this.guestInfo, this.roomsList);
        return (h(Host, { key: '5c0c94c3184bb0b78ce0b4366569da889cd3e3f1' }, h("div", { key: '7a93be44e23d359320a4c2bc05ef1cd2467e297a', class: "text-left mt-1 " }, h("div", { key: '24cad2d5625e18394e2badda68f3b703e589eb2b', class: " mb-1 " }, this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING' ? (h("span", { class: "h5 mr-1" }, this.guestInfo.roomCategoryName)) : null, h("span", { key: 'd4a43ea8736ce3f38282bf5330a3438a189cce6f', class: " font-weight-bold" }, this.guestInfo.ratePlanName.replace(this.guestInfo.roomCategoryName + '/', ''), h("ir-tooltip", { key: 'a4c059b2a29b3bf260b6dfd3b3d9fd1400cb50a5', class: " mr-1", message: this.guestInfo.cancelation + this.guestInfo.guarantee })), h("span", { key: 'ec142cf904ff2d30f1f22de77fd78efddbf972e6' }, this.guestInfo.adult_child_offering)), h("div", { key: 'e274d11c966722751dfdd920071438a1664888c4', class: "d-flex flex-column flex-md-row m-0 p-0 align-items-md-center aplicationInfoContainer " }, h("div", { key: '2af9055002a0c891eea9e7faac6cf6a334607568', class: "mr-1 flex-fill guest-info-container" }, h("input", { key: '7df3abacee8ffa4f30e732ae00ca6849aa56cf5c', id: v4(), type: "email", class: `form-control ${this.isButtonPressed && this.guestData.guestName === '' && 'border-danger'}`, placeholder: locales.entries.Lcz_GuestFirstnameAndLastname, name: "guestName", onInput: event => this.handleGuestNameChange(event), required: true, value: this.guestData.guestName })), h("div", { key: '1f2beb9554a12983f921c2ab74cefccdd07e03ac', class: 'mt-1 mt-md-0 d-flex align-items-center flex-fill' }, calendar_data.is_frontdesk_enabled && (this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' || this.bookingType === 'EDIT_BOOKING') ? (h("div", { class: "mr-1 p-0 flex-fill  preference-select-container" }, h("select", { class: `form-control  input-sm pr-0`, id: v4(), onChange: event => this.handleDataChange('roomId', event.target.value) }, h("option", { value: "", selected: this.guestData.roomId === '' }, locales.entries.Lcz_Assignunits), this.filterdRoomList.map(room => (h("option", { value: room.id, selected: +this.guestData.roomId === room.id }, room.name)))))) : null, this.guestData.is_bed_configuration_enabled && (h("div", { class: "mr-1 flex-fill" }, h("select", { class: `form-control input-sm ${this.isButtonPressed && (this.guestData.preference === '' || this.guestData.preference === 0) && 'border-danger'}`, id: v4(), onChange: event => this.handleDataChange('preference', event.target.value) }, h("option", { value: "", selected: this.guestData.preference === '' }, locales.entries.Lcz_BedConfiguration), this.bedPreferenceType.map(data => (h("option", { value: +data.CODE_NAME, selected: this.guestData.preference === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), h("div", { key: '25d910d5f5b863e7064803fbacc6052a4d98fc9c', class: "" }, getCurrencySymbol(this.currency.code) + Number(this.userRate).toFixed(2), "/", locales.entries.Lcz_Stay))))));
    }
    static get watchers() { return {
        "selectedUnits": ["handleSelctedUnits"]
    }; }
};
IglApplicationInfo.style = IglApplicationInfoStyle0;

//import { BookingService } from '../../../services/booking.service';
class IglBookPropertyService {
    setBookingInfoFromAutoComplete(context, res) {
        context.bookedByInfoData = {
            id: res.guest.id,
            email: res.guest.email,
            firstName: res.guest.first_name,
            lastName: res.guest.last_name,
            countryId: res.guest.country_id,
            isdCode: res.guest.country_id.toString(),
            contactNumber: res.guest.mobile,
            selectedArrivalTime: res.arrival,
            emailGuest: res.guest.subscribe_to_news_letter,
            message: res.remark,
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
            bookingNumber: res.booking_nbr,
            rooms: res.rooms,
            from_date: res.from_date,
            to_date: res.to_date,
        };
    }
    resetRoomsInfoAndMessage(context) {
        context.defaultData.roomsInfo = [];
        context.message = '';
    }
    onDataRoomUpdate(event, selectedUnits, isEdit, isEditBooking, name) {
        let units = selectedUnits;
        const { data, key, changedKey } = event.detail;
        const roomCategoryKey = `c_${data.roomCategoryId}`;
        const ratePlanKey = `p_${data.ratePlanId}`;
        if (this.shouldClearData(key)) {
            units = new Map();
        }
        this.initializeRoomCategoryIfNeeded(roomCategoryKey, units);
        if (isEditBooking) {
            if (changedKey === 'rate') {
                if (units.has(roomCategoryKey) && units.get(roomCategoryKey).has(ratePlanKey)) {
                    this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
                }
            }
            else {
                if (changedKey !== 'rateType') {
                    if (changedKey === 'adult_child_offering') {
                        if (units.has(roomCategoryKey) && selectedUnits.get(roomCategoryKey).has(ratePlanKey)) {
                            this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
                        }
                    }
                    else {
                        this.applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, units, name, isEdit);
                    }
                }
            }
        }
        else {
            this.setSelectedRoomData(roomCategoryKey, ratePlanKey, data, units);
        }
        this.cleanupEmptyData(roomCategoryKey, units);
        return units;
    }
    shouldClearData(key) {
        return key === 'clearData' || key === 'EDIT_BOOKING';
    }
    initializeRoomCategoryIfNeeded(roomCategoryKey, selectedUnits) {
        if (!selectedUnits.has(roomCategoryKey)) {
            selectedUnits.set(roomCategoryKey, new Map());
        }
    }
    setSelectedRoomData(roomCategoryKey, ratePlanKey, data, selectedUnits) {
        let selectedRatePlans = selectedUnits.get(roomCategoryKey);
        if (data.totalRooms === 0 || data.inventory === 0) {
            selectedRatePlans.delete(ratePlanKey);
        }
        else {
            selectedUnits.set(roomCategoryKey, selectedRatePlans.set(ratePlanKey, Object.assign(Object.assign({}, data), { selectedUnits: Array(data.totalRooms).fill(-1) })));
        }
    }
    cleanupEmptyData(roomCategoryKey, selectedUnits) {
        if (selectedUnits.has(roomCategoryKey)) {
            let selectedRatePlans = selectedUnits.get(roomCategoryKey);
            if (selectedRatePlans.size === 0) {
                selectedUnits.delete(roomCategoryKey);
            }
        }
    }
    applyBookingEditToSelectedRoom(roomCategoryKey, ratePlanKey, data, selectedUnits, name, isEdit) {
        selectedUnits.clear();
        let res = {};
        if (isEdit) {
            res = Object.assign(Object.assign({}, data), { guestName: name || '', roomId: '' });
        }
        else {
            res = Object.assign({}, data);
        }
        selectedUnits.set(roomCategoryKey, new Map().set(ratePlanKey, res));
    }
    async prepareBookUserServiceParams(context, check_in, sourceOption) {
        try {
            const arrivalTime = context.isEventType('EDIT_BOOKING')
                ? context.getArrivalTimeForBooking()
                : context.isEventType('ADD_ROOM')
                    ? context.bookingData.ARRIVAL.code
                    : context.isEventType('SPLIT_BOOKING')
                        ? context.bookedByInfoData.selectedArrivalTime.code
                        : '';
            const pr_id = context.isEventType('BAR_BOOKING') ? context.bookingData.PR_ID : undefined;
            const bookingNumber = context.isEventType('EDIT_BOOKING') || context.isEventType('ADD_ROOM')
                ? context.bookingData.BOOKING_NUMBER
                : context.isEventType('SPLIT_BOOKING')
                    ? context.bookedByInfoData.bookingNumber
                    : undefined;
            let rooms = [];
            if (context.isEventType('ADD_ROOM')) {
                // const result = await (context.bookingService as BookingService).getExoposedBooking(bookingNumber, context.language);
                //rooms = result.rooms;
                rooms = context.bookingData.ROOMS;
            }
            else if (context.isEventType('SPLIT_BOOKING')) {
                rooms = context.bookedByInfoData.rooms;
            }
            else if (context.isEventType('EDIT_BOOKING')) {
                rooms = context.defaultData.ROOMS.filter(room => room.identifier !== context.bookingData.IDENTIFIER);
            }
            console.log('rooms', rooms);
            return [
                context.bookedByInfoData,
                check_in,
                new Date(context.dateRangeData.fromDate),
                new Date(context.dateRangeData.toDate),
                context.guestData,
                context.dateRangeData.dateDifference,
                sourceOption,
                context.propertyid,
                rooms,
                context.currency,
                bookingNumber,
                context.bookingData.GUEST,
                arrivalTime,
                pr_id,
                context.bookingData.IDENTIFIER,
            ];
        }
        catch (error) {
            console.log(error);
        }
    }
    getBookingPreferenceRoomId(bookingData) {
        return (bookingData.hasOwnProperty('PR_ID') && bookingData.PR_ID) || null;
    }
    getRoomCategoryByRoomId(bookingData) {
        var _a;
        return (_a = bookingData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
            return roomCategory.id === bookingData.RATE_TYPE;
        });
    }
    setEditingRoomInfo(bookingData, selectedUnits) {
        console.log(bookingData, bookingData.roomsInfo);
        console.log(this.getBookingPreferenceRoomId(bookingData));
        const category = this.getRoomCategoryByRoomId(bookingData);
        const room_id = !category ? '' : `c_${category === null || category === void 0 ? void 0 : category.id}`;
        const ratePlanId = `p_${bookingData.RATE_PLAN_ID}`;
        const data = {
            adultCount: bookingData.ADULTS_COUNT,
            rate: bookingData.RATE,
            rateType: bookingData.RATE_TYPE,
            ratePlanId: bookingData.RATE_PLAN_ID,
            roomCategoryId: category ? category.id : '',
            roomCategoryName: category ? category.name : '',
            totalRooms: 1,
            ratePlanName: bookingData.RATE_PLAN,
            roomId: bookingData.PR_ID,
            guestName: bookingData.NAME,
            cancelation: bookingData.cancelation,
            guarantee: bookingData.guarantee,
            adult_child_offering: bookingData.adult_child_offering,
        };
        selectedUnits.set(room_id, new Map().set(ratePlanId, data));
    }
}

const iglBookPropertyCss = ".sc-igl-book-property-h{position:fixed;top:0;right:0;width:100vw;height:100vh;z-index:99}.card-title.sc-igl-book-property{border-bottom:1px solid #e4e5ec;width:100%}.scrollContent.sc-igl-book-property{height:calc(100% - 79px);overflow:auto;position:relative}.background-overlay.sc-igl-book-property{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}.formContainer.sc-igl-book-property{height:calc(100% - 79px);overflow:auto}.gap-30.sc-igl-book-property{gap:30px}.block-date.sc-igl-book-property{width:100%}.sideWindow.sc-igl-book-property{position:absolute;top:0;right:0;height:100%;background-color:#ffffff;width:100vw;overflow-y:auto}.card.sc-igl-book-property{top:0;z-index:1000}.close.sc-igl-book-property{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.close-icon.sc-igl-book-property{position:absolute;top:18px;right:33px;outline:none}button.sc-igl-book-property:not(:disabled),[type='button'].sc-igl-book-property:not(:disabled){cursor:pointer}.row.sc-igl-book-property{padding:0 0 0 15px;margin:0}@media only screen and (min-width: 1200px){.sideWindow.sc-igl-book-property{max-width:70%}}@media only screen and (min-width: 2000px){.sideWindow.sc-igl-book-property{max-width:40%}}@media only screen and (min-width: 768px) and (max-width: 1200px){.sideWindow.sc-igl-book-property{max-width:90%}}@media only screen and (min-width: 600px) and (max-width: 768px){.sideWindow.sc-igl-book-property{max-width:75%}}@media only screen and (min-width: 641px){.block-date.sc-igl-book-property{max-width:450px}}";
const IglBookPropertyStyle0 = iglBookPropertyCss;

const IglBookProperty = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closeBookingWindow = createEvent(this, "closeBookingWindow", 7);
        this.bookingCreated = createEvent(this, "bookingCreated", 7);
        this.blockedCreated = createEvent(this, "blockedCreated", 7);
        this.resetBookingData = createEvent(this, "resetBookingData", 7);
        this.animateIrButton = createEvent(this, "animateIrButton", 7);
        this.animateIrSelect = createEvent(this, "animateIrSelect", 7);
        this.toast = createEvent(this, "toast", 7);
        this.initialRoomIds = null;
        this.showSplitBookingOption = false;
        this.sourceOptions = [];
        this.guestData = [];
        this.bookedByInfoData = {};
        this.blockDatesData = {};
        this.ratePricingMode = [];
        this.selectedUnits = new Map();
        this.bedPreferenceType = [];
        this.bookingService = new BookingService();
        this.bookPropertyService = new IglBookPropertyService();
        this.eventsService = new EventsService();
        this.propertyid = undefined;
        this.allowedBookingSources = undefined;
        this.language = undefined;
        this.countryNodeList = undefined;
        this.showPaymentDetails = false;
        this.currency = undefined;
        this.bookingData = undefined;
        this.adultChildConstraints = undefined;
        this.adultChildCount = {
            adult: 0,
            child: 0,
        };
        this.renderAgain = false;
        this.dateRangeData = undefined;
        this.defaultData = undefined;
        this.isLoading = undefined;
        this.buttonName = '';
    }
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.closeWindow();
        }
        else
            return;
    }
    componentDidLoad() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
    clearBooking(e) {
        if (this.isEventType('SPLIT_BOOKING')) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            this.bookedByInfoData = {};
            this.bookPropertyService.resetRoomsInfoAndMessage(this);
            this.renderPage();
        }
    }
    async handleSpiltBookingSelected(e) {
        e.stopImmediatePropagation();
        const { key, data } = e.detail;
        if (key === 'select') {
            const res = await this.bookingService.getExposedBooking(data.booking_nbr, this.language);
            this.bookPropertyService.setBookingInfoFromAutoComplete(this, res);
            this.sourceOption = res.source;
            this.renderPage();
        }
        else if (key === 'blur' && data !== '') {
            const res = await this.bookingService.getExposedBooking(data, this.language);
            this.bookPropertyService.setBookingInfoFromAutoComplete(this, res);
            this.sourceOption = res.source;
            this.renderPage();
        }
    }
    async componentWillLoad() {
        this.bookingService.setToken(calendar_data.token);
        this.eventsService.setToken(calendar_data.token);
        this.defaultDateRange = { from_date: this.bookingData.FROM_DATE, to_date: this.bookingData.TO_DATE };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        if (!this.bookingData.defaultDateRange) {
            return;
        }
        this.defaultData = this.bookingData;
        this.dateRangeData = Object.assign({}, this.defaultData.defaultDateRange);
        try {
            const setupEntries = await this.fetchSetupEntries();
            console.log(setupEntries);
            this.setSourceOptions(this.allowedBookingSources);
            this.setOtherProperties(setupEntries);
            if (this.isEventType('EDIT_BOOKING')) {
                this.adultChildCount = {
                    adult: this.defaultData.ADULTS_COUNT,
                    child: this.defaultData.CHILDREN_COUNT,
                };
                this.initialRoomIds = {
                    roomName: this.defaultData.roomName,
                    ratePlanId: this.defaultData.RATE_PLAN_ID,
                    roomId: this.defaultData.PR_ID,
                    roomTypeId: this.defaultData.RATE_TYPE,
                };
                this.bookPropertyService.setEditingRoomInfo(this.defaultData, this.selectedUnits);
            }
            if (!this.isEventType('BAR_BOOKING')) {
                this.bookPropertyService.resetRoomsInfoAndMessage(this);
            }
            if (this.defaultData.event_type === 'SPLIT_BOOKING') {
                this.showSplitBookingOption = true;
                this.page = 'page_one';
            }
            else if (this.defaultData.event_type === 'BLOCK_DATES') {
                this.page = 'page_block_date';
            }
            else {
                this.page = 'page_one';
            }
        }
        catch (error) {
            console.error('Error fetching setup entries:', error);
        }
    }
    async fetchSetupEntries() {
        console.log('fetch setup entries');
        return await this.bookingService.fetchSetupEntries();
    }
    isGuestDataIncomplete() {
        //|| data.roomId === '' || data.roomId === 0 if the roomId is required
        if (this.guestData.length === 0) {
            return true;
        }
        console.log(this.guestData);
        for (const data of this.guestData) {
            if (data.guestName === '' || ((data.preference === '' || data.preference === 0) && data.is_bed_configuration_enabled)) {
                return true;
            }
        }
        return false;
    }
    isButtonDisabled() {
        const isValidProperty = (property, key, comparedBy) => {
            if (!property) {
                return true;
            }
            if (property === this.guestData) {
                return this.isGuestDataIncomplete();
            }
            // const isCardDetails = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear'].includes(key);
            // if (!this.showPaymentDetails && isCardDetails) {
            //   return false;
            // }
            if (key === 'selectedArrivalTime') {
                if (property[key] !== undefined) {
                    return property[key].code === '';
                }
                else {
                    return true;
                }
            }
            return property[key] === comparedBy || property[key] === undefined;
        };
        return (isValidProperty(this.guestData, 'guestName', '') ||
            // isValidProperty(this.bookedByInfoData, 'isdCode', '') ||
            // isValidProperty(this.bookedByInfoData, 'contactNumber', '') ||
            isValidProperty(this.bookedByInfoData, 'firstName', '') ||
            isValidProperty(this.bookedByInfoData, 'lastName', '') ||
            // isValidProperty(this.bookedByInfoData, 'countryId', -1) ||
            isValidProperty(this.bookedByInfoData, 'selectedArrivalTime', '')
        // || isValidProperty(this.bookedByInfoData, 'email', '')
        );
    }
    setSourceOptions(bookingSource) {
        this.sourceOptions = bookingSource.map(source => ({
            id: source.code,
            value: source.description,
            tag: source.tag,
            type: source.type,
        }));
        if (this.isEventType('EDIT_BOOKING')) {
            this.sourceOption = Object.assign({}, this.defaultData.SOURCE);
        }
        else {
            this.sourceOption = {
                code: bookingSource[0].code,
                description: bookingSource[0].description,
                tag: bookingSource[0].tag,
            };
        }
    }
    setOtherProperties(res) {
        this.ratePricingMode = res === null || res === void 0 ? void 0 : res.ratePricingMode;
        this.bookedByInfoData.arrivalTime = res.arrivalTime;
        this.bedPreferenceType = res.bedPreferenceType;
    }
    handleAdultChildChange(event) {
        if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
            this.bookPropertyService.resetRoomsInfoAndMessage(this);
        }
        this.adultChildCount = Object.assign({}, event.detail);
    }
    async initializeBookingAvailability(from_date, to_date) {
        try {
            const room_type_ids = this.defaultData.roomsInfo.map(room => room.id);
            const data = await this.bookingService.getBookingAvailability(from_date, to_date, this.propertyid, this.adultChildCount, this.language, room_type_ids, this.currency);
            if (!this.isEventType('EDIT_BOOKING')) {
                this.defaultData.defaultDateRange.fromDate = new Date(this.dateRangeData.fromDate);
                this.defaultData.defaultDateRange.toDate = new Date(this.dateRangeData.toDate);
            }
            this.defaultData = Object.assign(Object.assign({}, this.defaultData), { roomsInfo: data.roomtypes });
        }
        catch (error) {
            // toastr.error(error);
        }
    }
    getRoomCategoryByRoomId(roomId) {
        var _a;
        return (_a = this.defaultData.roomsInfo) === null || _a === void 0 ? void 0 : _a.find(roomCategory => {
            return roomCategory.physicalrooms.find(room => room.id === +roomId);
        });
    }
    getSplitBookings() {
        return (this.defaultData.hasOwnProperty('splitBookingEvents') && this.defaultData.splitBookingEvents) || [];
    }
    closeWindow() {
        this.dateRangeData = {};
        this.closeBookingWindow.emit();
        document.removeEventListener('keydown', this.handleKeyDown);
    }
    isEventType(key) {
        return this.defaultData.event_type === key;
    }
    onDateRangeSelect(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const opt = event.detail;
        if (opt.key === 'selectedDateRange') {
            this.dateRangeData = opt.data;
            if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
                this.defaultData.roomsInfo = [];
            }
            else if (this.adultChildCount.adult !== 0) {
                this.initializeBookingAvailability(dateToFormattedString(new Date(this.dateRangeData.fromDate)), dateToFormattedString(new Date(this.dateRangeData.toDate)));
            }
        }
    }
    handleBlockDateUpdate(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const opt = event.detail;
        this.blockDatesData = opt.data;
    }
    handleGuestInfoUpdate(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const opt = event.detail;
        if (opt.guestRefKey) {
            if (this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING')) {
                this.guestData[opt.guestRefKey] = Object.assign(Object.assign({}, opt.data), { roomId: this.defaultData.PR_ID });
            }
            else
                this.guestData[opt.guestRefKey] = opt.data;
        }
    }
    handleBookedByInfoUpdate(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const opt = event.detail;
        this.bookedByInfoData = opt.value.data;
    }
    handleSourceDropDown(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        const value = event.detail;
        const selectedSource = this.sourceOptions.find(opt => opt.id === value.toString());
        this.sourceOption = {
            code: value,
            description: selectedSource.value || '',
            tag: selectedSource.tag,
        };
    }
    renderPage() {
        this.renderAgain = !this.renderAgain;
    }
    gotoSplitPageTwo() {
        this.gotoPage('page_two');
    }
    gotoPage(gotoPage) {
        this.page = gotoPage;
        this.renderPage();
    }
    showSplitBooking() {
        this.showSplitBookingOption = true;
        this.gotoPage('page_one');
    }
    getPageBlockDatesView() {
        return (h(Fragment, null, h("igl-block-dates-view", { fromDate: this.dateRangeData.fromDateStr, toDate: this.dateRangeData.toDateStr, entryDate: this.defaultData.ENTRY_DATE, onDataUpdateEvent: event => this.handleBlockDateUpdate(event) }), h("div", { class: "p-0 mb-1 mt-2 gap-30 d-flex align-items-center justify-content-between" }, h("button", { class: "btn btn-secondary flex-fill", onClick: () => this.closeWindow() }, locales.entries.Lcz_Cancel), h("button", { class: "btn btn-primary flex-fill", onClick: () => this.handleBlockDate() }, locales.entries.Lcz_Blockdates))));
    }
    handleButtonClicked(event) {
        var _a, _b;
        switch (event.detail.key) {
            case 'save':
                this.bookUser(false);
                break;
            case 'cancel':
                event.stopImmediatePropagation();
                event.stopPropagation();
                this.closeWindow();
                break;
            case 'back':
                event.stopImmediatePropagation();
                event.stopPropagation();
                this.gotoPage('page_one');
                break;
            case 'book':
                this.bookUser(false);
                this.buttonName = 'book';
                break;
            case 'bookAndCheckIn':
                this.bookUser(true);
                this.buttonName = 'bookAndCheckIn';
                break;
            case 'next':
                event.stopImmediatePropagation();
                event.stopPropagation();
                if (!((_a = this.adultChildCount) === null || _a === void 0 ? void 0 : _a.adult)) {
                    this.animateIrSelect.emit('adult_child_select');
                    break;
                }
                if (this.selectedUnits.size > 0) {
                    this.gotoPage('page_two');
                    break;
                }
                else {
                    if (((_b = this.defaultData) === null || _b === void 0 ? void 0 : _b.roomsInfo.length) === 0) {
                        this.animateIrButton.emit('check_availability');
                        break;
                    }
                }
                this.toast.emit({
                    type: 'error',
                    description: locales.entries.Lcz_SelectRatePlan,
                    title: locales.entries.Lcz_SelectRatePlan,
                });
                break;
            case 'check':
                this.initializeBookingAvailability(dateToFormattedString(new Date(this.dateRangeData.fromDate)), dateToFormattedString(new Date(this.dateRangeData.toDate)));
                break;
        }
    }
    handlePageTwoDataUpdateEvent(event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        if (event.detail.key === 'propertyBookedBy') {
            this.handleBookedByInfoUpdate(event);
        }
        else {
            this.handleGuestInfoUpdate(event);
        }
    }
    async handleBlockDate() {
        const releaseData = getReleaseHoursString(+this.blockDatesData.RELEASE_AFTER_HOURS);
        const result = await this.bookingService.blockUnit(Object.assign({ from_date: dateToFormattedString(this.defaultData.defaultDateRange.fromDate), to_date: dateToFormattedString(this.defaultData.defaultDateRange.toDate), NOTES: this.blockDatesData.OPTIONAL_REASON || '', pr_id: this.defaultData.PR_ID.toString(), STAY_STATUS_CODE: this.blockDatesData.OUT_OF_SERVICE ? '004' : this.blockDatesData.RELEASE_AFTER_HOURS === 0 ? '002' : '003', DESCRIPTION: this.blockDatesData.RELEASE_AFTER_HOURS || '' }, releaseData));
        const blockedUnit = await transformNewBLockedRooms(result);
        this.blockedCreated.emit(blockedUnit);
        this.closeWindow();
    }
    async bookUser(check_in) {
        this.setLoadingState(check_in);
        console.log('edit save clicked');
        if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
            if (this.isGuestDataIncomplete()) {
                this.isLoading = '';
                return;
            }
        }
        else {
            if (this.isButtonDisabled()) {
                this.isLoading = '';
                return;
            }
        }
        try {
            console.log('clicked');
            if (['003', '002', '004'].includes(this.defaultData.STATUS_CODE)) {
                this.eventsService.deleteEvent(this.defaultData.POOL);
            }
            if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
                this.bookedByInfoData.message = this.defaultData.NOTES;
            }
            const serviceParams = await this.bookPropertyService.prepareBookUserServiceParams(this, check_in, this.sourceOption);
            await this.bookingService.bookUser(...serviceParams);
            this.resetBookingData.emit(null);
        }
        catch (error) {
            // Handle error
        }
        finally {
            this.resetLoadingState();
        }
    }
    setLoadingState(assign_units) {
        if (this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM')) {
            this.isLoading = 'save';
        }
        else {
            this.isLoading = assign_units ? 'bookAndCheckIn' : 'book';
        }
    }
    getArrivalTimeForBooking() {
        return this.bookedByInfoData.arrivalTime.find(e => e.CODE_VALUE_EN === this.defaultData.ARRIVAL_TIME).CODE_NAME;
    }
    resetLoadingState() {
        this.isLoading = '';
        setTimeout(() => {
            this.closeWindow();
        }, 100);
    }
    onRoomDataUpdate(event) {
        const units = this.bookPropertyService.onDataRoomUpdate(event, this.selectedUnits, this.isEventType('EDIT_BOOKING'), this.isEventType('EDIT_BOOKING') || this.isEventType('SPLIT_BOOKING') || this.isEventType('BAR_BOOKING'), this.defaultData.NAME);
        this.selectedUnits = new Map(units);
        this.renderPage();
    }
    getCurrentPage(name) {
        return this.page === name;
    }
    render() {
        //console.log('render');
        return (h(Host, { key: '29ef5dba241980c5477750c67d9383ac37e1629d' }, h("div", { key: '0ddcf362c09d396f9db8a886d24423caf948fdfd', class: "background-overlay", onClick: () => this.closeWindow() }), h("div", { key: '2d1e87004e6358b6a40f94f6e9539f80da3a2a76', class: 'sideWindow ' + (this.getCurrentPage('page_block_date') ? 'block-date' : '') }, h("div", { key: '3294eaf6f20ae1977a4ef13e023de61f95ca8838', class: "card position-sticky mb-0 shadow-none p-0 " }, h("div", { key: '9a4c77bb234394cb746aab11cb7408bc061c44b9', class: "d-flex mt-2 align-items-center justify-content-between  " }, h("h3", { key: 'd377e6d3fab38f63bd26163d797c72b7d4717475', class: "card-title text-left pb-1 font-medium-2 px-2 px-md-3" }, this.getCurrentPage('page_block_date') ? this.defaultData.BLOCK_DATES_TITLE : this.defaultData.TITLE), h("ir-icon", { key: '9dbb24a6ef48366a33e6eb361f8a78407094d586', class: "close close-icon", onIconClickHandler: () => {
                this.closeWindow();
            } }, h("svg", { key: '381202a27f506905b5f9266f5ddeda73e02baadb', slot: "icon", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512", height: 20, width: 20 }, h("path", { key: 'ad3e47ff769f55c57651bb1e94000c4c76f36ce2', d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" }))))), h("div", { key: 'f189578ce6fdd0c2cae0bd796ae0c892de818240', class: "px-2 px-md-3" }, this.getCurrentPage('page_one') && (h("igl-booking-overview-page", { initialRoomIds: this.initialRoomIds, defaultDaterange: this.defaultDateRange, class: 'p-0 mb-1', eventType: this.defaultData.event_type, selectedRooms: this.selectedUnits, currency: this.currency, showSplitBookingOption: this.showSplitBookingOption, ratePricingMode: this.ratePricingMode, dateRangeData: this.dateRangeData, bookingData: this.defaultData, adultChildCount: this.adultChildCount, bookedByInfoData: this.bookedByInfoData,
            // bookingDataDefaultDateRange={this.dateRangeData}
            adultChildConstraints: this.adultChildConstraints, onRoomsDataUpdate: evt => {
                this.onRoomDataUpdate(evt);
            }, sourceOptions: this.sourceOptions, propertyId: this.propertyid })), this.getCurrentPage('page_two') && (h("igl-pagetwo", { currency: this.currency, propertyId: this.propertyid, showPaymentDetails: this.showPaymentDetails, selectedGuestData: this.guestData, countryNodeList: this.countryNodeList, isLoading: this.isLoading, selectedRooms: this.selectedUnits, bedPreferenceType: this.bedPreferenceType, dateRangeData: this.dateRangeData, bookingData: this.defaultData, showSplitBookingOption: this.showSplitBookingOption, language: this.language, bookedByInfoData: this.bookedByInfoData, defaultGuestData: this.defaultData, isEditOrAddRoomEvent: this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM'), onDataUpdateEvent: event => this.handlePageTwoDataUpdateEvent(event) })), this.getCurrentPage('page_block_date') ? this.getPageBlockDatesView() : null))));
    }
};
IglBookProperty.style = IglBookPropertyStyle0;

const iglBookPropertyFooterCss = ".sc-igl-book-property-footer-h{display:block;margin:0;padding:0}.sc-igl-book-property-footer-h>*.sc-igl-book-property-footer{margin:auto;padding:auto}.gap-30.sc-igl-book-property-footer{gap:30px}";
const IglBookPropertyFooterStyle0 = iglBookPropertyFooterCss;

const IglBookPropertyFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.buttonClicked = createEvent(this, "buttonClicked", 7);
        this.eventType = undefined;
        this.disabled = true;
    }
    isEventType(event) {
        return event === this.eventType;
    }
    editNext(label) {
        if (this.isEventType('EDIT_BOOKING')) {
            if (label === 'Cancel') {
                return 'flex-fill';
            }
            else {
                return 'd-none d-md-block  flex-fill';
            }
        }
        return 'flex-fill';
    }
    renderButton(type, label, disabled = false) {
        return (h("div", { class: this.shouldRenderTwoButtons() ? ` ${this.editNext(label)}` : 'flex-fill' }, h("button", { class: `btn btn-${type === 'cancel' ? 'secondary' : 'primary'} full-width`, onClick: () => this.buttonClicked.emit({ key: type }), disabled: disabled }, label)));
    }
    shouldRenderTwoButtons() {
        return this.isEventType('PLUS_BOOKING') || this.isEventType('ADD_ROOM') || this.isEventType('EDIT_BOOKING');
    }
    render() {
        return (h(Host, { key: '8c0aaf7b8df2b52a8747db9ad7ef56366196904a' }, h("div", { key: '26bdae90e2f71b6e09876803312d2bb854422208', class: "d-flex justify-content-between gap-30 align-items-center" }, this.isEventType('EDIT_BOOKING') ? (h(Fragment, null, this.renderButton('cancel', locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales.entries.Lcz_Next} >>`, isRequestPending('/Get_Exposed_Booking_Availability')))) : (h(Fragment, null, this.renderButton('cancel', locales.entries.Lcz_Cancel), this.shouldRenderTwoButtons() && this.renderButton('next', `${locales.entries.Lcz_Next} >>`))))));
    }
};
IglBookPropertyFooter.style = IglBookPropertyFooterStyle0;

const iglBookPropertyHeaderCss = ".sc-igl-book-property-header-h{display:block}.row.sc-igl-book-property-header{padding:0 0 0 15px;margin:0}.sourceContainer.sc-igl-book-property-header{max-width:350px}.message-label.sc-igl-book-property-header{font-size:80%}";
const IglBookPropertyHeaderStyle0 = iglBookPropertyHeaderCss;

const IglBookPropertyHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.splitBookingDropDownChange = createEvent(this, "splitBookingDropDownChange", 7);
        this.sourceDropDownChange = createEvent(this, "sourceDropDownChange", 7);
        this.adultChild = createEvent(this, "adultChild", 7);
        this.checkClicked = createEvent(this, "checkClicked", 7);
        this.buttonClicked = createEvent(this, "buttonClicked", 7);
        this.toast = createEvent(this, "toast", 7);
        this.spiltBookingSelected = createEvent(this, "spiltBookingSelected", 7);
        this.animateIrButton = createEvent(this, "animateIrButton", 7);
        this.animateIrSelect = createEvent(this, "animateIrSelect", 7);
        this.sourceOption = {
            code: '',
            description: '',
            tag: '',
        };
        this.splitBookingId = '';
        this.bookingData = '';
        this.minDate = undefined;
        this.sourceOptions = [];
        this.message = undefined;
        this.bookingDataDefaultDateRange = undefined;
        this.showSplitBookingOption = false;
        this.adultChildConstraints = undefined;
        this.splitBookings = undefined;
        this.adultChildCount = undefined;
        this.dateRangeData = undefined;
        this.bookedByInfoData = undefined;
        this.defaultDaterange = undefined;
        this.propertyId = undefined;
    }
    getSplitBookingList() {
        return (h("fieldset", { class: "d-flex flex-column text-left mb-1  flex-lg-row align-items-lg-center" }, h("label", { class: "mr-lg-1" }, locales.entries.Lcz_Tobooking, "# "), h("div", { class: "btn-group mt-1 mt-lg-0 sourceContainer" }, h("ir-autocomplete", { value: Object.keys(this.bookedByInfoData).length > 1 ? `${this.bookedByInfoData.bookingNumber} ${this.bookedByInfoData.firstName} ${this.bookedByInfoData.lastName}` : '', from_date: hooks(this.bookingDataDefaultDateRange.fromDate).format('YYYY-MM-DD'), to_date: hooks(this.bookingDataDefaultDateRange.toDate).format('YYYY-MM-DD'), propertyId: this.propertyId, placeholder: locales.entries.Lcz_BookingNumber, onComboboxValue: e => {
                e.stopImmediatePropagation();
                this.spiltBookingSelected.emit(e.detail);
            }, isSplitBooking: true }))));
    }
    getSourceNode() {
        return (h("fieldset", { class: "d-flex text-left  align-items-center" }, h("label", { class: "mr-1" }, locales.entries.Lcz_Source, " "), h("div", { class: "btn-group mt-0 flex-fill sourceContainer" }, h("select", { class: "form-control input-sm", id: "xSmallSelect", onChange: evt => this.sourceDropDownChange.emit(evt.target.value) }, this.sourceOptions.map(option => {
            if (option.type === 'LABEL') {
                return h("optgroup", { label: option.value });
            }
            return (h("option", { value: option.id, selected: this.sourceOption.code === option.id }, option.value));
        })))));
    }
    handleAdultChildChange(key, value) {
        //const value = (event.target as HTMLSelectElement).value;
        let obj = {};
        if (value === '') {
            obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: 0 });
        }
        else {
            obj = Object.assign(Object.assign({}, this.adultChildCount), { [key]: value });
        }
        this.adultChild.emit(obj);
    }
    getAdultChildConstraints() {
        return (h("div", { class: 'mt-1 mt-lg-0 d-flex flex-column text-left' }, h("div", { class: "form-group my-lg-0 text-left d-flex align-items-center justify-content-between justify-content-sm-start" }, h("fieldset", null, h("div", { class: "btn-group " }, h("ir-select", { onSelectChange: e => this.handleAdultChildChange('adult', e.detail), select_id: "adult_child_select", firstOption: locales.entries.Lcz_AdultsCaption, LabelAvailable: false, data: Array.from(Array(this.adultChildConstraints.adult_max_nbr), (_, i) => i + 1).map(option => ({
                text: option.toString(),
                value: option.toString(),
            })) }))), this.adultChildConstraints.child_max_nbr > 0 && (h("fieldset", null, h("div", { class: "btn-group ml-1" }, h("ir-select", { onSelectChange: e => this.handleAdultChildChange('child', e.detail), select_id: "child_select", firstOption: this.renderChildCaption(), LabelAvailable: false, data: Array.from(Array(this.adultChildConstraints.child_max_nbr), (_, i) => i + 1).map(option => ({
                text: option.toString(),
                value: option.toString(),
            })) })))), h("ir-button", { btn_id: "check_availability", isLoading: isRequestPending('/Get_Exposed_Booking_Availability'), icon: "", size: "sm", class: "ml-2", text: locales.entries.Lcz_Check, onClickHanlder: () => this.handleButtonClicked() }))));
    }
    renderChildCaption() {
        const maxAge = this.adultChildConstraints.child_max_age;
        let years = locales.entries.Lcz_Years;
        if (maxAge === 1) {
            years = locales.entries.Lcz_Year;
        }
        return `${locales.entries.Lcz_ChildCaption} < ${this.adultChildConstraints.child_max_age} ${years}`;
    }
    handleButtonClicked() {
        if (this.isEventType('SPLIT_BOOKING') && Object.keys(this.bookedByInfoData).length <= 1) {
            this.toast.emit({
                type: 'error',
                title: locales.entries.Lcz_ChooseBookingNumber,
                description: '',
                position: 'top-right',
            });
        }
        else if (this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING')) {
            const initialToDate = hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date));
            const initialFromDate = hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date));
            const selectedFromDate = hooks(new Date(this.dateRangeData.fromDate));
            const selectedToDate = hooks(new Date(this.dateRangeData.toDate));
            if (selectedToDate.isBefore(initialFromDate) || selectedFromDate.isAfter(initialToDate)) {
                this.toast.emit({
                    type: 'error',
                    title: `${locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
                    description: '',
                    position: 'top-right',
                });
                return;
            }
            else if (this.adultChildCount.adult === 0) {
                this.toast.emit({ type: 'error', title: locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
                this.animateIrSelect.emit('adult_child_select');
            }
            else {
                this.buttonClicked.emit({ key: 'check' });
            }
        }
        else if (this.minDate && new Date(this.dateRangeData.fromDate).getTime() > new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date).getTime()) {
            this.toast.emit({
                type: 'error',
                title: `${locales.entries.Lcz_CheckInDateShouldBeMAx.replace('%1', hooks(new Date(this.bookedByInfoData.from_date || this.defaultDaterange.from_date)).format('ddd, DD MMM YYYY')).replace('%2', hooks(new Date(this.bookedByInfoData.to_date || this.defaultDaterange.to_date)).format('ddd, DD MMM YYYY'))}  `,
                description: '',
                position: 'top-right',
            });
        }
        else if (this.adultChildCount.adult === 0) {
            this.animateIrSelect.emit('adult_child_select');
            this.toast.emit({ type: 'error', title: locales.entries.Lcz_PlzSelectNumberOfGuests, description: '', position: 'top-right' });
        }
        else {
            this.buttonClicked.emit({ key: 'check' });
        }
    }
    isEventType(key) {
        return this.bookingData.event_type === key;
    }
    render() {
        const showSourceNode = this.showSplitBookingOption ? this.getSplitBookingList() : this.isEventType('EDIT_BOOKING') || this.isEventType('ADD_ROOM') ? false : true;
        return (h(Host, { key: '326c9af68abfe4944e04a290cd168f18af9e1073' }, this.isEventType('SPLIT_BOOKING') && this.getSplitBookingList(), showSourceNode && this.getSourceNode(), h("div", { key: 'e90a4ca13a188e9181d2f0036ae40c4200846919', class: `d-flex flex-column flex-lg-row align-items-lg-center ${showSourceNode ? 'mt-1' : ''}` }, h("fieldset", { key: '1bd3aa3e963f829be792eb797fa9c00bc69d5f15', class: "mt-lg-0  " }, h("igl-date-range", { key: 'cd79a559beb441cf7e905c0ba308b6e49a719624', dateLabel: locales.entries.Lcz_Dates, minDate: this.isEventType('PLUS_BOOKING') ? hooks().add(-1, 'months').startOf('month').format('YYYY-MM-DD') : this.minDate, disabled: this.isEventType('BAR_BOOKING') || this.isEventType('SPLIT_BOOKING'), defaultData: this.bookingDataDefaultDateRange })), !this.isEventType('EDIT_BOOKING') && this.getAdultChildConstraints()), h("p", { key: '0873dd27b465e3ada2f4ad71279297b4107c7e80', class: "text-right mt-1 message-label" }, calendar_data.tax_statement)));
    }
};
IglBookPropertyHeader.style = IglBookPropertyHeaderStyle0;

const iglBookingOverviewPageCss = ".sc-igl-booking-overview-page-h{display:block}.sc-igl-booking-overview-page-h>*.sc-igl-booking-overview-page{margin:0;padding:auto}.scrollContent.sc-igl-booking-overview-page{height:calc(100% - 79px);overflow:auto;position:relative}.loading-container.sc-igl-booking-overview-page{display:flex;align-items:center;justify-content:center;height:100%;background:white;position:absolute;inset:0;z-index:100}.loader.sc-igl-booking-overview-page{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}";
const IglBookingOverviewPageStyle0 = iglBookingOverviewPageCss;

const IglBookingOverviewPage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.roomsDataUpdate = createEvent(this, "roomsDataUpdate", 7);
        this.bookingData = undefined;
        this.propertyId = undefined;
        this.message = undefined;
        this.showSplitBookingOption = undefined;
        this.eventType = undefined;
        this.currency = undefined;
        this.adultChildConstraints = undefined;
        this.ratePricingMode = undefined;
        this.dateRangeData = undefined;
        this.defaultDaterange = undefined;
        this.selectedRooms = undefined;
        this.adultChildCount = undefined;
        this.sourceOptions = undefined;
        this.bookedByInfoData = undefined;
        this.initialRoomIds = undefined;
    }
    getSplitBookings() {
        return (this.bookingData.hasOwnProperty('splitBookingEvents') && this.bookingData.splitBookingEvents) || [];
    }
    isEventType(event) {
        return event === this.eventType;
    }
    setMinDate() {
        if (!this.isEventType('EDIT_BOOKING')) {
            return;
        }
        const from_date = hooks(this.bookingData.FROM_DATE, 'YYYY-MM-DD');
        const today = hooks();
        if (from_date.isAfter(today)) {
            return today.add(-2, 'weeks').format('YYYY-MM-DD');
        }
        return from_date.add(-2, 'weeks').format('YYYY-MM-DD');
    }
    render() {
        var _a, _b;
        //console.log(this.bookingData);
        return (h(Host, { key: '0084d8e5888665e7e0b415df79fc6be3ac9f1cce' }, h("igl-book-property-header", { key: 'e88f8e74190aa662b15b90d82c2cad407458b5f4', bookedByInfoData: this.bookedByInfoData, defaultDaterange: this.defaultDaterange, dateRangeData: this.dateRangeData, minDate: this.setMinDate(),
            // minDate={this.isEventType('ADD_ROOM') || this.isEventType('SPLIT_BOOKING') ? this.bookedByInfoData.from_date || this.bookingData.FROM_DATE : undefined}
            adultChildCount: this.adultChildCount, splitBookingId: this.showSplitBookingOption, bookingData: this.bookingData, sourceOptions: this.sourceOptions, message: this.message, bookingDataDefaultDateRange: this.bookingData.defaultDateRange, showSplitBookingOption: this.showSplitBookingOption, adultChildConstraints: this.adultChildConstraints, splitBookings: this.getSplitBookings(), propertyId: this.propertyId }), h("div", { key: 'fc40218873522cd677a3521b525fdfa981aff75e', class: " text-left" }, isRequestPending('/Get_Exposed_Booking_Availability') && this.isEventType('EDIT_BOOKING') ? (h("div", { class: "loading-container" }, h("div", { class: "loader" }))) : (h(Fragment, null, (_b = (_a = this.bookingData) === null || _a === void 0 ? void 0 : _a.roomsInfo) === null || _b === void 0 ? void 0 : _b.map(roomInfo => {
            //console.log(this.selectedRooms);
            return (h("igl-booking-rooms", { initialRoomIds: this.initialRoomIds, isBookDisabled: Object.keys(this.bookedByInfoData).length <= 1, key: `room-info-${roomInfo.id}`, currency: this.currency, ratePricingMode: this.ratePricingMode, dateDifference: this.dateRangeData.dateDifference, bookingType: this.bookingData.event_type, roomTypeData: roomInfo, class: "mt-2 mb-1 p-0", roomInfoId: this.selectedRooms.has(`c_${roomInfo.id}`) ? roomInfo.id : null, defaultData: this.selectedRooms.get(`c_${roomInfo.id}`), onDataUpdateEvent: evt => this.roomsDataUpdate.emit(evt.detail) }));
        })))), h("igl-book-property-footer", { key: '586fe4e4ac2fa61b392ab4c3adef9a7678069d88', class: 'p-0 mb-1 mt-3', eventType: this.bookingData.event_type, disabled: this.selectedRooms.size === 0 })));
    }
};
IglBookingOverviewPage.style = IglBookingOverviewPageStyle0;

const iglBookingRoomRatePlanCss = ".sc-igl-booking-room-rate-plan-h{display:block;margin-bottom:0.5rem}.currency.sc-igl-booking-room-rate-plan{display:block;position:absolute;margin:0;padding:0;height:auto;left:10px}.rate-input.sc-igl-booking-room-rate-plan{font-size:14px;line-height:0;padding:0;height:0;border-left:0}.rate-input-container.sc-igl-booking-room-rate-plan{display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;flex:1}.new-currency.sc-igl-booking-room-rate-plan{color:#3b4781;border:1px solid #cacfe7;font-size:0.975rem;height:2rem;background:white;border-right:0;border-top-right-radius:0;border-bottom-right-radius:0;transition:border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out}.input-group-prepend.sc-igl-booking-room-rate-plan span[data-state='focus'].sc-igl-booking-room-rate-plan{border-color:var(--blue)}.input-group-prepend.sc-igl-booking-room-rate-plan span[data-disabled].sc-igl-booking-room-rate-plan{background-color:#eceff1;border-color:rgba(118, 118, 118, 0.3)}@media only screen and (min-width: 1200px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:40%}.rateplan-container.sc-igl-booking-room-rate-plan{width:40%}}@media only screen and (min-width: 991px){.max-w-300.sc-igl-booking-room-rate-plan{max-width:200px}.rate-input-container.sc-igl-booking-room-rate-plan{max-width:100px}}@media only screen and (min-width: 991px) and (max-width: 1300px){.rateplan-name-container.sc-igl-booking-room-rate-plan{width:35%}}@media only screen and (max-width: 768px){.booking-btn.sc-igl-booking-room-rate-plan{width:100%}}.total-nights-container.sc-igl-booking-room-rate-plan{width:max-content}.nightBorder.sc-igl-booking-room-rate-plan{border-left-width:0;border-top-right-radius:3px !important;border-bottom-right-radius:3px !important}";
const IglBookingRoomRatePlanStyle0 = iglBookingRoomRatePlanCss;

const IglBookingRoomRatePlan = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.gotoSplitPageTwoEvent = createEvent(this, "gotoSplitPageTwoEvent", 7);
        this.defaultData = undefined;
        this.ratePlanData = undefined;
        this.totalAvailableRooms = undefined;
        this.index = undefined;
        this.ratePricingMode = [];
        this.currency = undefined;
        this.physicalrooms = undefined;
        this.shouldBeDisabled = undefined;
        this.dateDifference = undefined;
        this.bookingType = 'PLUS_BOOKING';
        this.fullyBlocked = undefined;
        this.isBookDisabled = false;
        this.defaultRoomId = undefined;
        this.selectedRoom = undefined;
        this.is_bed_configuration_enabled = undefined;
        this.isInputFocused = false;
        this.selectedData = undefined;
        this.ratePlanChangedState = false;
    }
    getAvailableRooms(assignable_units) {
        let result = [];
        assignable_units.forEach(unit => {
            if (unit.Is_Fully_Available) {
                result.push({ name: unit.name, id: unit.pr_id });
            }
        });
        return result;
    }
    componentWillLoad() {
        // console.log('default data', this.defaultData);
        this.updateSelectedRatePlan(this.ratePlanData);
    }
    disableForm() {
        if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
            return false;
        }
        else {
            return this.selectedData.is_closed || this.totalAvailableRooms === 0 || (calendar_data.is_frontdesk_enabled && this.selectedData.physicalRooms.length === 0);
        }
    }
    setAvailableRooms(data) {
        let availableRooms = this.getAvailableRooms(data);
        if (this.bookingType === 'EDIT_BOOKING' && this.shouldBeDisabled) {
            if (this.selectedRoom) {
                availableRooms.push({
                    id: this.selectedRoom.roomId,
                    name: this.selectedRoom.roomName,
                });
                availableRooms.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            }
        }
        return availableRooms;
    }
    getSelectedOffering(value) {
        return this.ratePlanData.variations.find(variation => variation.adult_child_offering === value);
    }
    updateSelectedRatePlan(data) {
        var _a;
        this.selectedData = {
            is_bed_configuration_enabled: this.is_bed_configuration_enabled,
            ratePlanId: data.id,
            adult_child_offering: data.variations[data.variations.length - 1].adult_child_offering,
            rateType: 1,
            totalRooms: 0,
            rate: (_a = data.variations[data.variations.length - 1].amount) !== null && _a !== void 0 ? _a : 0,
            ratePlanName: data.name,
            adultCount: data.variations[data.variations.length - 1].adult_nbr,
            childrenCount: data.variations[data.variations.length - 1].child_nbr,
            cancelation: data.cancelation,
            guarantee: data.guarantee,
            isRateModified: false,
            defaultSelectedRate: 0,
            index: this.index,
            is_closed: data.is_closed,
            physicalRooms: this.setAvailableRooms(this.ratePlanData.assignable_units),
            dateDifference: this.dateDifference,
        };
        if (this.defaultData) {
            for (const [key, value] of Object.entries(this.defaultData)) {
                this.selectedData[key] = value;
            }
            this.selectedData['rateType'] = 1;
        }
    }
    componentDidLoad() {
        if (this.defaultData) {
            this.dataUpdateEvent.emit({
                key: 'roomRatePlanUpdate',
                changedKey: 'physicalRooms',
                data: this.selectedData,
            });
        }
    }
    async ratePlanDataChanged(newData) {
        this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: newData.variations[newData.variations.length - 1].adult_child_offering, adultCount: newData.variations[newData.variations.length - 1].adult_nbr, childrenCount: newData.variations[newData.variations.length - 1].child_nbr, rate: this.handleRateDaysUpdate(), physicalRooms: this.setAvailableRooms(newData.assignable_units) });
        this.dataUpdateEvent.emit({
            key: 'roomRatePlanUpdate',
            changedKey: 'rate',
            data: this.selectedData,
        });
    }
    handleRateDaysUpdate() {
        if (this.selectedData.isRateModified) {
            return this.selectedData.defaultSelectedRate;
        }
        const selectedOffering = this.getSelectedOffering(this.selectedData.adult_child_offering);
        return selectedOffering ? selectedOffering.amount : 0;
    }
    handleInput(event) {
        const inputElement = event.target;
        let inputValue = inputElement.value.replace(/[^0-9.]/g, '');
        const validDecimalNumber = /^\d*\.?\d*$/;
        if (!validDecimalNumber.test(inputValue)) {
            inputValue = inputValue.substring(0, inputValue.length - 1);
        }
        inputElement.value = inputValue;
        if (inputValue) {
            this.selectedData.isRateModified = true;
            this.handleDataChange('rate', event);
        }
        else {
            this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: -1, totalRooms: 0 });
            this.dataUpdateEvent.emit({
                key: 'roomRatePlanUpdate',
                changedKey: 'rate',
                data: this.selectedData,
            });
        }
    }
    handleDataChange(key, evt) {
        const value = evt.target.value;
        switch (key) {
            case 'adult_child_offering':
                this.updateOffering(value);
                break;
            case 'rate':
                this.updateRate(value);
                break;
            default:
                this.updateGenericData(key, value);
                break;
        }
        this.dataUpdateEvent.emit({
            key: 'roomRatePlanUpdate',
            changedKey: key,
            data: this.selectedData,
        });
    }
    updateOffering(value) {
        const offering = this.getSelectedOffering(value);
        if (offering) {
            this.selectedData = Object.assign(Object.assign({}, this.selectedData), { adult_child_offering: value, adultCount: offering.adult_nbr, childrenCount: offering.child_nbr, rate: offering.amount, isRateModified: false });
        }
    }
    updateRate(value) {
        const numericValue = value === '' ? 0 : Number(value);
        this.selectedData = Object.assign(Object.assign({}, this.selectedData), { rate: numericValue, totalRooms: value === '' ? 0 : this.selectedData.totalRooms, defaultSelectedRate: this.selectedData.rateType === 2 ? numericValue / this.dateDifference : numericValue });
    }
    updateGenericData(key, value) {
        this.selectedData = Object.assign(Object.assign({}, this.selectedData), { [key]: value === '' ? 0 : parseInt(value) });
    }
    bookProperty() {
        this.dataUpdateEvent.emit({ key: 'clearData', data: this.selectedData });
        this.handleDataChange('totalRooms', { target: { value: '1' } });
        this.gotoSplitPageTwoEvent.emit({ key: 'gotoSplitPage', data: '' });
    }
    renderRate() {
        if (this.selectedData.isRateModified) {
            console.log('selectedData.rate', this.selectedData.rate);
            return this.selectedData.rate === -1 ? '' : this.selectedData.rate;
        }
        return this.selectedData.rateType === 1 ? Number(this.selectedData.rate).toFixed(2) : Number(this.selectedData.rate / this.dateDifference).toFixed(2);
    }
    render() {
        return (h(Host, { key: '1fa428d32be4e4e50934b0d4c2145bc6c8ddd604' }, h("div", { key: 'b942645caacb16a80cbc5bc3578463b8f0db5c17', class: "d-flex flex-column m-0 p-0 flex-lg-row align-items-lg-center justify-content-lg-between " }, h("div", { key: 'e5d79d60625633877135cf8ea99ee9af55ec3596', class: "rateplan-name-container" }, this.bookingType === 'BAR_BOOKING' ? (h(Fragment, null, h("span", { class: "font-weight-bold\t" }, this.ratePlanData.name.split('/')[0]), h("span", null, "/", this.ratePlanData.name.split('/')[1]))) : (h("span", null, this.ratePlanData.name)), h("ir-tooltip", { key: 'd31aebcd989f1eee37edf95d8a1337f9c04b08fc', message: this.ratePlanData.cancelation + this.ratePlanData.guarantee })), h("div", { key: 'df0fd1950d36a2b43a1187804eca1dc39a82d6e3', class: 'd-md-flex justify-content-md-end  align-items-md-center  flex-fill rateplan-container' }, h("div", { key: 'a64388c03efe6693dd76cbac12b1d515f12ccd2c', class: "mt-1 mt-lg-0 flex-fill max-w-300" }, h("fieldset", { key: 'c1ad6d3619e6283d7bc3e5d6f0b73b3f04d06be2', class: "position-relative" }, h("select", { key: '66f3e62ba1a3241b5fd7dde99ee616aa4217031d', disabled: this.disableForm(), class: "form-control  input-sm", id: v4(), onChange: evt => this.handleDataChange('adult_child_offering', evt) }, this.ratePlanData.variations.map(variation => (h("option", { value: variation.adult_child_offering, selected: this.selectedData.adult_child_offering === variation.adult_child_offering }, variation.adult_child_offering)))))), h("div", { key: '752aa3fef1703e9034768a9cd4bbf0cca9bb7f14', class: 'm-0 p-0 d-flex justify-content-between ml-md-1 ' }, h("div", { key: '808d268fc8d130d6f2c5d70337a1f68ec7319826', class: " d-flex  m-0 p-0 rate-total-night-view mt-1  " }, h("fieldset", { key: '8996874b5196292e1df847d48c6a2987489f3e02', class: "position-relative has-icon-left m-0 p-0 rate-input-container  " }, h("div", { key: 'f09362d9bc95c123bc4372ecbdb033809c314a19', class: "input-group-prepend" }, h("span", { key: '5d98de19883776954997f673d8b33d8be435354b', "data-disabled": this.disableForm(), "data-state": this.isInputFocused ? 'focus' : '', class: "input-group-text new-currency", id: "basic-addon1" }, getCurrencySymbol(this.currency.code))), h("input", { key: '8a3b6437752f470a420430b585b4580b31e2aa3a', onFocus: () => (this.isInputFocused = true), onBlur: () => (this.isInputFocused = false), disabled: this.disableForm(), type: "text", class: "form-control pl-0 input-sm rate-input py-0 m-0 rounded-0 rateInputBorder", value: this.renderRate(), id: v4(), placeholder: locales.entries.Lcz_Rate || 'Rate', onInput: (event) => this.handleInput(event) })), h("fieldset", { key: '066c1b92fe569de6f5a813d12d47fc1719de82b0', class: "position-relative m-0 total-nights-container p-0 " }, h("select", { key: '69ecbc52c9513849ae8bbb33363d1c9e0c7e5f3f', disabled: this.disableForm(), class: "form-control input-sm m-0 nightBorder rounded-0  py-0", id: v4(), onChange: evt => this.handleDataChange('rateType', evt) }, this.ratePricingMode.map(data => (h("option", { value: data.CODE_NAME, selected: this.selectedData.rateType === +data.CODE_NAME }, data.CODE_VALUE_EN)))))), this.bookingType === 'PLUS_BOOKING' || this.bookingType === 'ADD_ROOM' ? (h("div", { class: "flex-fill  mt-lg-0 ml-1 m-0 mt-1 p-0" }, h("fieldset", { class: "position-relative" }, h("select", { disabled: this.selectedData.rate === 0 || this.disableForm(), class: "form-control input-sm", id: v4(), onChange: evt => this.handleDataChange('totalRooms', evt) }, Array.from({ length: this.totalAvailableRooms + 1 }, (_, i) => i).map(i => (h("option", { value: i, selected: this.selectedData.totalRooms === i }, i))))))) : null), this.bookingType === 'EDIT_BOOKING' ? (h(Fragment, null, h("div", { class: " m-0 p-0  mt-lg-0  ml-md-1 mt-md-1 d-none d-md-block" }, h("fieldset", { class: "position-relative" }, h("input", { disabled: this.disableForm(), type: "radio", name: "ratePlanGroup", value: "1", onChange: evt => this.handleDataChange('totalRooms', evt), checked: this.selectedData.totalRooms === 1 }))), h("button", { disabled: this.selectedData.rate === -1 || this.disableForm(), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 d-md-none ", onClick: () => this.bookProperty() }, this.selectedData.totalRooms === 1 ? locales.entries.Lcz_Current : locales.entries.Lcz_Select))) : null, this.bookingType === 'BAR_BOOKING' || this.bookingType === 'SPLIT_BOOKING' ? (h("button", { disabled: this.selectedData.rate === -1 || this.disableForm() || (this.bookingType === 'SPLIT_BOOKING' && this.isBookDisabled), type: "button", class: "btn btn-primary booking-btn mt-lg-0 btn-sm ml-md-1  mt-1 ", onClick: () => this.bookProperty() }, locales.entries.Lcz_Book)) : null))));
    }
    static get watchers() { return {
        "ratePlanData": ["ratePlanDataChanged"]
    }; }
};
IglBookingRoomRatePlan.style = IglBookingRoomRatePlanStyle0;

const iglBookingRoomsCss = ".sc-igl-booking-rooms-h{display:block}.margin-bottom-8.sc-igl-booking-rooms{margin-bottom:8px !important}";
const IglBookingRoomsStyle0 = iglBookingRoomsCss;

const IglBookingRooms = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.validBookingTypes = ['PLUS_BOOKING', 'ADD_ROOM', 'EDIT_BOOKING', 'SPLIT_BOOKING'];
        this.roomTypeData = undefined;
        this.defaultData = undefined;
        this.bookingType = 'PLUS_BOOKING';
        this.dateDifference = undefined;
        this.ratePricingMode = [];
        this.roomInfoId = null;
        this.currency = undefined;
        this.selectedRooms = [];
        this.totalRooms = undefined;
        this.isBookDisabled = undefined;
        this.initialRoomIds = undefined;
        this.roomsDistributions = [];
    }
    componentWillLoad() {
        this.initializeRoomData();
    }
    initializeRoomData() {
        const { inventory, rateplans } = this.roomTypeData;
        this.totalRooms = inventory || 0;
        this.selectedRooms = new Array(rateplans.length).fill(0);
        this.roomsDistributions = this.calculateInitialDistributions(rateplans, inventory);
    }
    handleRoomTypeData() {
        this.initializeRoomData();
    }
    calculateInitialDistributions(rateplans, inventory) {
        let distributions = new Array(rateplans.length).fill(inventory);
        if (this.defaultData && this.bookingType !== 'EDIT_BOOKING' && inventory > 0) {
            let selectedIndexes = [];
            let sum = 0;
            this.defaultData.forEach(category => {
                this.selectedRooms[category.index] = category.totalRooms;
                distributions[category.index] = category.totalRooms;
                sum += category.totalRooms;
                selectedIndexes.push(category.index);
            });
            if (selectedIndexes.length < distributions.length) {
                distributions.forEach((_, index) => {
                    if (!selectedIndexes.includes(index)) {
                        if (sum === this.totalRooms) {
                            distributions[index] = 0;
                        }
                        else {
                            distributions[index] = distributions[index] - sum;
                        }
                    }
                    else {
                        if (sum < this.totalRooms) {
                            distributions[index] = this.totalRooms - sum + distributions[index];
                        }
                    }
                });
            }
        }
        else {
            distributions.fill(inventory);
        }
        return distributions;
    }
    onRoomDataUpdate(event, index) {
        event.stopImmediatePropagation();
        const { detail: { data, changedKey }, } = event;
        let updatedData = Object.assign({}, data);
        if (changedKey === 'totalRooms') {
            this.handleTotalRoomsUpdate(index, updatedData.totalRooms);
        }
        updatedData = Object.assign(Object.assign({}, updatedData), { roomCategoryId: this.roomTypeData.id, roomCategoryName: this.roomTypeData.name, inventory: this.roomTypeData.inventory });
        this.dataUpdateEvent.emit({ key: data.key, data: updatedData, changedKey });
    }
    handleTotalRoomsUpdate(index, newValue) {
        if (this.selectedRooms[index] !== newValue) {
            this.selectedRooms[index] = newValue;
            this.updateRatePlanTotalRooms(index);
        }
    }
    updateRatePlanTotalRooms(ratePlanIndex) {
        const calculateTotalSelectedRoomsExcludingIndex = excludedIndex => {
            return this.selectedRooms.reduce((acc, rooms, idx) => (idx !== excludedIndex ? acc + rooms : acc), 0);
        };
        const newRoomsDistributions = this.selectedRooms.map((_, index) => {
            if (index === ratePlanIndex) {
                return this.roomsDistributions[index];
            }
            const totalSelectedRoomsExcludingCurrent = calculateTotalSelectedRoomsExcludingIndex(index);
            const availableRooms = this.totalRooms - totalSelectedRoomsExcludingCurrent;
            return availableRooms > 0 ? availableRooms : 0;
        });
        if (JSON.stringify(this.roomsDistributions) !== JSON.stringify(newRoomsDistributions)) {
            this.roomsDistributions = [...newRoomsDistributions];
        }
    }
    render() {
        const isValidBookingType = this.validBookingTypes.includes(this.bookingType);
        return (h(Host, { key: '1e9103475269676900d929810f166f211e84cfc5' }, isValidBookingType && this.roomTypeData.rateplans.length > 0 && h("div", { class: "font-weight-bold font-medium-1 margin-bottom-8 " }, this.roomTypeData.name), this.roomTypeData.rateplans.map((ratePlan, index) => {
            if (ratePlan.variations !== null) {
                let shouldBeDisabled = this.roomInfoId && this.roomInfoId === this.roomTypeData.id;
                let roomId = -1;
                if (shouldBeDisabled && this.initialRoomIds) {
                    roomId = this.initialRoomIds.roomId;
                }
                return (h("igl-booking-room-rate-plan", { is_bed_configuration_enabled: this.roomTypeData.is_bed_configuration_enabled, index: index, isBookDisabled: this.isBookDisabled, key: `rate-plan-${ratePlan.id}`, ratePricingMode: this.ratePricingMode, class: isValidBookingType ? '' : '', currency: this.currency, dateDifference: this.dateDifference, ratePlanData: ratePlan, totalAvailableRooms: this.roomsDistributions[index], bookingType: this.bookingType, defaultData: (this.defaultData && this.defaultData.get(`p_${ratePlan.id}`)) || null, shouldBeDisabled: shouldBeDisabled, onDataUpdateEvent: evt => this.onRoomDataUpdate(evt, index), physicalrooms: this.roomTypeData.physicalrooms, defaultRoomId: roomId, selectedRoom: this.initialRoomIds }));
            }
            else {
                return null;
            }
        })));
    }
    static get watchers() { return {
        "roomTypeData": ["handleRoomTypeData"]
    }; }
};
IglBookingRooms.style = IglBookingRoomsStyle0;

const iglPagetwoCss = ".sc-igl-pagetwo-h{display:block}.card-title.sc-igl-pagetwo{border-bottom:1px solid #e4e5ec}.scrollContent.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto;position:relative}.background-overlay.sc-igl-pagetwo{position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25)}.formContainer.sc-igl-pagetwo{height:calc(100% - 79px);overflow:auto}.sideWindow.sc-igl-pagetwo{position:absolute;top:0;right:0;height:100%;background-color:#ffffff}.close.sc-igl-pagetwo{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:0.5;padding:0;background-color:transparent;border:0;appearance:none}.close-icon.sc-igl-pagetwo{position:absolute;top:18px;right:33px;outline:none}button.sc-igl-pagetwo:not(:disabled),[type='button'].sc-igl-pagetwo:not(:disabled){cursor:pointer}.row.sc-igl-pagetwo{padding:0 0 0 15px;margin:0}";
const IglPagetwoStyle0 = iglPagetwoCss;

const IglPagetwo = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
        this.buttonClicked = createEvent(this, "buttonClicked", 7);
        this.showPaymentDetails = undefined;
        this.currency = undefined;
        this.isEditOrAddRoomEvent = undefined;
        this.dateRangeData = undefined;
        this.bookingData = undefined;
        this.showSplitBookingOption = undefined;
        this.language = undefined;
        this.bookedByInfoData = undefined;
        this.propertyId = undefined;
        this.bedPreferenceType = undefined;
        this.selectedRooms = undefined;
        this.isLoading = undefined;
        this.countryNodeList = undefined;
        this.selectedGuestData = undefined;
        this.defaultGuestData = undefined;
        this.selectedBookedByData = undefined;
        this.guestData = undefined;
        this.selectedUnits = {};
    }
    componentWillLoad() {
        this.initializeGuestData();
        this.selectedBookedByData = this.bookedByInfoData;
    }
    initializeGuestData() {
        let total = 0;
        const newSelectedUnits = Object.assign({}, this.selectedUnits);
        const getRate = (rate, totalNights, isRateModified, preference) => {
            if (isRateModified && preference === 2) {
                return rate * totalNights;
            }
            return rate;
        };
        this.selectedUnits = newSelectedUnits;
        this.guestData = [];
        this.selectedRooms.forEach((room, key) => {
            room.forEach(rate_plan => {
                newSelectedUnits[key] = rate_plan.selectedUnits;
                total += rate_plan.totalRooms * getRate(rate_plan.rate, this.dateRangeData.dateDifference, rate_plan.isRateModified, rate_plan.rateType);
                for (let i = 1; i <= rate_plan.totalRooms; i++) {
                    this.guestData.push(Object.assign({ guestName: '', roomId: '', preference: '' }, rate_plan));
                }
            });
        });
        this.bookingData.TOTAL_PRICE = total;
    }
    handleOnApplicationInfoDataUpdateEvent(event, index) {
        const opt = event.detail;
        const categoryIdKey = `c_${opt.data.roomCategoryId}`;
        const updatedUnits = [...(this.selectedUnits[categoryIdKey] || [])];
        updatedUnits[index] = opt.data.roomId;
        this.selectedUnits = Object.assign(Object.assign({}, this.selectedUnits), { [categoryIdKey]: updatedUnits });
        this.dataUpdateEvent.emit({
            key: 'applicationInfoUpdateEvent',
            value: event.detail,
        });
    }
    handleEventData(event, key, index) {
        if (key === 'application-info') {
            this.handleOnApplicationInfoDataUpdateEvent(event, index);
        }
        else {
            this.selectedBookedByData = event.detail.data;
            this.dataUpdateEvent.emit({
                key: 'propertyBookedBy',
                value: event.detail,
            });
        }
    }
    isGuestDataIncomplete() {
        if (this.selectedGuestData.length !== this.guestData.length) {
            return true;
        }
        for (const data of this.selectedGuestData) {
            if (data.guestName === '' || data.preference === '' || data.roomId === '') {
                return true;
            }
        }
        return false;
    }
    isButtonDisabled(key) {
        const isValidProperty = (property, key, comparedBy) => {
            if (!property) {
                return true;
            }
            if (property === this.selectedGuestData) {
                return this.isGuestDataIncomplete();
            }
            // const isCardDetails = ['cardNumber', 'cardHolderName', 'expiryMonth', 'expiryYear'].includes(key);
            // if (!this.showPaymentDetails && isCardDetails) {
            //   return false;
            // }
            if (key === 'selectedArrivalTime') {
                if (property[key] !== undefined) {
                    return property[key].code === '';
                }
                else {
                    return true;
                }
            }
            return property[key] === comparedBy || property[key] === undefined;
        };
        return (this.isLoading === key ||
            isValidProperty(this.selectedGuestData, 'guestName', '') ||
            isValidProperty(this.selectedBookedByData, 'isdCode', '') ||
            isValidProperty(this.selectedBookedByData, 'contactNumber', '') ||
            isValidProperty(this.selectedBookedByData, 'firstName', '') ||
            isValidProperty(this.selectedBookedByData, 'lastName', '') ||
            isValidProperty(this.selectedBookedByData, 'countryId', -1) ||
            isValidProperty(this.selectedBookedByData, 'selectedArrivalTime', '') ||
            isValidProperty(this.selectedBookedByData, 'email', ''));
    }
    render() {
        return (h(Host, { key: 'b516e02fa566130472810b0c1458dbf2e3eb7be4' }, h("div", { key: 'e8ab891fbb31bcf43a71d78935121a68b1534e38', class: "d-flex flex-wrap" }, h("ir-date-view", { key: '2f17bd9995e43ea9f47684b5fd20b977555e9519', class: "mr-1 flex-fill font-weight-bold font-medium-1", from_date: this.dateRangeData.fromDateStr, to_date: this.dateRangeData.toDateStr, dateOption: "DD MMM YYYY" }), this.guestData.length > 1 && (h("div", { class: "mt-1 mt-md-0 text-right" }, locales.entries.Lcz_TotalPrice, " ", h("span", { class: "font-weight-bold font-medium-1" }, getCurrencySymbol(this.currency.code) + this.bookingData.TOTAL_PRICE || '$0.00')))), this.guestData.map((roomInfo, index) => {
            return (h("igl-application-info", { dateDifference: this.dateRangeData.dateDifference, defaultGuestPreference: this.defaultGuestData.bed_preference, defaultGuestRoomId: this.defaultGuestData.PR_ID, currency: this.currency, bedPreferenceType: this.bedPreferenceType, index: index, selectedUnits: this.selectedUnits[`c_${roomInfo.roomCategoryId}`], guestInfo: roomInfo, guestRefKey: index, bookingType: this.bookingData.event_type, roomsList: roomInfo.physicalRooms, onDataUpdateEvent: event => this.handleEventData(event, 'application-info', index) }));
        }), this.isEditOrAddRoomEvent || this.showSplitBookingOption ? null : (h("igl-property-booked-by", { propertyId: this.propertyId, countryNodeList: this.countryNodeList, language: this.language, showPaymentDetails: this.showPaymentDetails, defaultData: this.bookedByInfoData, onDataUpdateEvent: event => 
            // this.dataUpdateEvent.emit({
            //   key: "propertyBookedBy",
            //   value: event.detail,
            // })
            this.handleEventData(event, 'propertyBookedBy', 0) })), this.isEditOrAddRoomEvent ? (h("div", { class: "d-flex p-0 mb-1 mt-2" }, h("div", { class: "flex-fill mr-2" }, h("ir-button", { icon: "", text: locales.entries.Lcz_Back, class: "full-width", btn_color: "secondary", btn_styles: "justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'back' }) })), h("div", { class: "flex-fill" }, h("ir-button", { isLoading: this.isLoading === 'save', onClickHanlder: () => this.buttonClicked.emit({ key: 'save' }), btn_styles: "full-width align-items-center justify-content-center", text: locales.entries.Lcz_Save })))) : (h("div", { class: "d-flex flex-column flex-md-row p-0 mb-1 mt-2 justify-content-md-between align-items-md-center" }, h("div", { class: "flex-fill mr-md-1" }, h("button", { type: "button", class: "btn btn-secondary full-width", onClick: () => this.buttonClicked.emit({ key: 'back' }) }, h("span", { class: 'd-none d-md-inline-flex' }, " <<"), " ", locales.entries.Lcz_Back)), h("div", { class: "mt-1 mt-md-0 flex-fill" }, h("ir-button", { isLoading: this.isLoading === 'book', btn_styles: "full-width align-items-center justify-content-center", onClickHanlder: () => this.buttonClicked.emit({ key: 'book' }), text: locales.entries.Lcz_Book }))))));
    }
};
IglPagetwo.style = IglPagetwoStyle0;

const iglPropertyBookedByCss = ".sc-igl-property-booked-by-h{display:block}.row.sc-igl-property-booked-by{padding:0 0 0 15px;margin:0}.bookedByEmailContainer.sc-igl-property-booked-by{flex:auto;max-width:350px}.bookedDetailsForm.sc-igl-property-booked-by label.sc-igl-property-booked-by{min-width:125px;max-width:125px}.bookedDetailsForm.sc-igl-property-booked-by .form-group.sc-igl-property-booked-by{margin-bottom:10px !important}.bookedDetailsForm.sc-igl-property-booked-by .checkBoxContainer.sc-igl-property-booked-by input.sc-igl-property-booked-by{height:1.2rem !important;width:30px}.controlContainer.sc-igl-property-booked-by textarea.sc-igl-property-booked-by{height:60px !important}.margin3.sc-igl-property-booked-by{margin-bottom:5px !important}@media (min-width: 768px){.bookedByEmailContainer.sc-igl-property-booked-by{margin-left:37px}}";
const IglPropertyBookedByStyle0 = iglPropertyBookedByCss;

const IglPropertyBookedBy = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.dataUpdateEvent = createEvent(this, "dataUpdateEvent", 7);
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
};
IglPropertyBookedBy.style = IglPropertyBookedByStyle0;

const irInterceptorCss = ".loader.sc-ir-interceptor{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.loaderContainer.sc-ir-interceptor{padding:20px;display:flex;align-items:center;justify-content:center;border-radius:5px;background:white}.loadingScreenContainer.sc-ir-interceptor{position:fixed;top:0;left:0;height:100vh;width:100vw;z-index:100000;background:rgba(0, 0, 0, 0.2);pointer-events:all;display:flex;align-items:center;justify-content:center}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";
const IrInterceptorStyle0 = irInterceptorCss;

const IrInterceptor = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.toast = createEvent(this, "toast", 7);
        this.isShown = false;
        this.isLoading = false;
        this.isUnassignedUnit = false;
        this.handledEndpoints = ['/ReAllocate_Exposed_Room', '/Do_Payment', '/Get_Exposed_Bookings'];
    }
    componentWillLoad() {
        this.setupAxiosInterceptors();
    }
    setupAxiosInterceptors() {
        axios.interceptors.request.use(this.handleRequest.bind(this), this.handleError.bind(this));
        axios.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
    }
    extractEndpoint(url) {
        return url.split('?')[0];
    }
    isHandledEndpoint(url) {
        return this.handledEndpoints.includes(url);
    }
    handleRequest(config) {
        const extractedUrl = this.extractEndpoint(config.url);
        interceptor_requests[extractedUrl] = 'pending';
        if (this.isHandledEndpoint(extractedUrl)) {
            this.isLoading = true;
        }
        return config;
    }
    handleResponse(response) {
        var _a;
        const extractedUrl = this.extractEndpoint(response.config.url);
        if (this.isHandledEndpoint(extractedUrl)) {
            this.isLoading = false;
        }
        interceptor_requests[extractedUrl] = 'done';
        if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
            this.handleError(response.data.ExceptionMsg);
            throw new Error(response.data.ExceptionMsg);
        }
        return response;
    }
    handleError(error) {
        this.toast.emit({
            type: 'error',
            title: error,
            description: '',
            position: 'top-right',
        });
        return Promise.reject(error);
    }
    render() {
        return (h(Host, { key: '46eb8e52d3177a2a896d6d890c1c02b607236bd2' }, this.isLoading && (h("div", { class: "loadingScreenContainer" }, h("div", { class: "loaderContainer" }, h("span", { class: "loader" }))))));
    }
};
IrInterceptor.style = IrInterceptorStyle0;

const irToastCss = "button.sc-ir-toast,p.sc-ir-toast,h3.sc-ir-toast,div.sc-ir-toast{all:unset}.sc-ir-toast-h{--rd-viewport-padding:25px;--rd-success:#2b9a66;position:fixed;bottom:0;right:0;display:flex;flex-direction:column;padding:var(--rd-viewport-padding);gap:10px;max-width:100vw;margin:0;list-style:none;z-index:2147483647;outline:none;pointer-events:none;-webkit-user-select:none;user-select:none}@media (prefers-color-scheme: dark){.sc-ir-toast-h{--rd-success:#33b074}}p.sc-ir-toast{color:hsla(222.2, 84%, 4.9%, 0.8);font-size:13px;line-height:1.3}h1.sc-ir-toast,h2.sc-ir-toast,h3.sc-ir-toast,h4.sc-ir-toast,h5.sc-ir-toast,h6.sc-ir-toast{font-weight:500;color:hsl(222.2, 84%, 4.9%);font-size:15px}[position='top-left'].sc-ir-toast-h{top:0;left:0}[position='top-right'].sc-ir-toast-h{top:0;right:0}[position='bottom-left'].sc-ir-toast-h{bottom:0;left:0}[position='bottom-right'].sc-ir-toast-h{bottom:0;right:0}.icon-container.sc-ir-toast{height:25px;width:25px;border-radius:25px;display:flex;align-items:center;justify-content:center;padding:0;margin:0}.icon-container.sc-ir-toast>svg.sc-ir-toast{margin:0;color:white;stroke-width:5px}.success.sc-ir-toast{background-color:var(--rd-success)}.error.sc-ir-toast{background-color:red}.ToastRoot.sc-ir-toast{background-color:hsl(0, 0%, 100%);border-radius:0.5rem;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;padding:15px;display:grid;grid-template-areas:'title action' 'description action';grid-template-columns:auto max-content;column-gap:15px;align-items:center;pointer-events:none;opacity:0;border:1px solid hsl(214.3, 31.8%, 91.4%);position:relative}.ToastRoot[data-state='open'].sc-ir-toast{pointer-events:all;animation:slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)}.ToastRoot[data-state='closed'].sc-ir-toast{pointer-events:none;animation:hide 100ms ease-in}@-webkit-keyframes slideIn{from{transform:translateX(var(--rd-offset-width))}to{transform:translateX(0)}}@keyframes slideIn{from{transform:translateX(var(--rd-offset-width))}to{transform:translateX(0)}}.ToastTitle.sc-ir-toast{grid-area:title;font-weight:500;color:hsl(222.2, 84%, 4.9%);font-size:15px}.ToastDescription.sc-ir-toast{grid-area:description;margin:0;margin-top:5px;color:hsla(222.2, 84%, 4.9%, 0.8);font-size:13px;line-height:1.3;overflow:hidden;text-overflow:ellipsis}.ToastAction.sc-ir-toast{grid-area:action}";
const IrToastStyle0 = irToastCss;

const IrToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.position = 'bottom-left';
        this.toasts = [];
    }
    onToast(event) {
        const toast = event.detail;
        this.showToast(toast);
    }
    showToast(toast) {
        const toastrOptions = {
            positionClass: 'toast-top-right',
            closeButton: true,
            timeOut: toast.duration || 5000,
        };
        switch (toast.type) {
            case 'success':
                toastr.success(toast.title, '', toastrOptions);
                break;
            case 'error':
                toastr.error(toast.title, '', toastrOptions);
                break;
        }
    }
    render() {
        return h(Host, { key: 'e0e67252a8759bb24081a31ce40e5a4aa59aa9b7' });
    }
    get element() { return getElement(this); }
};
IrToast.style = IrToastStyle0;

export { IglApplicationInfo as igl_application_info, IglBookProperty as igl_book_property, IglBookPropertyFooter as igl_book_property_footer, IglBookPropertyHeader as igl_book_property_header, IglBookingOverviewPage as igl_booking_overview_page, IglBookingRoomRatePlan as igl_booking_room_rate_plan, IglBookingRooms as igl_booking_rooms, IglPagetwo as igl_pagetwo, IglPropertyBookedBy as igl_property_booked_by, IrInterceptor as ir_interceptor, IrToast as ir_toast };

//# sourceMappingURL=igl-application-info_11.entry.js.map