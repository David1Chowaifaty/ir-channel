'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-3eb932d8.js');
const housekeeping_service = require('./housekeeping.service-94a24d7d.js');
const locales_store = require('./locales.store-976d2caf.js');
require('./Token-c9908564.js');
require('./axios-345bdc66.js');

const irHkTeamCss = ".sc-ir-hk-team-h{display:block}th.sc-ir-hk-team,td.sc-ir-hk-team{text-align:left !important;width:fit-content !important}input.sc-ir-hk-team{border:none;margin:0;width:120px}input.sc-ir-hk-team:focus{outline:none}.table-container.sc-ir-hk-team{padding:10px 0;overflow-x:auto;max-width:100%;width:max-content}.table.sc-ir-hk-team,th.sc-ir-hk-team,td.sc-ir-hk-team{border-color:white !important}thead.sc-ir-hk-team{border:0 !important}table.sc-ir-hk-team{border:0 !important}.icons-container.sc-ir-hk-team{display:flex;align-items:center;justify-content:center;gap:4px}.text-center.sc-ir-hk-team{text-align:center !important}.assignments-container.sc-ir-hk-team,.unassigned-container.sc-ir-hk-team{display:flex;align-items:center}.gap-16.sc-ir-hk-team{gap:16px}.unassigned-container.sc-ir-hk-team{gap:4px}.justify-between.sc-ir-hk-team{justify-content:space-between;margin-bottom:10px}.assignments-container.sc-ir-hk-team p.sc-ir-hk-team,h4.sc-ir-hk-team{margin:0}.outline-btn.sc-ir-hk-team{background:white;border:1px solid var(--blue);color:var(--blue);border-radius:5px;font-size:12px;padding:1px 0.25rem !important;margin:0}.outline-btn.sc-ir-hk-team:hover{color:white;background:var(--blue)}@media only screen and (min-width: 900px){td.sc-ir-hk-team{min-width:140px !important;width:max-content !important}}@media only screen and (max-width: 900px){.table-container.sc-ir-hk-team{width:max-content !important}}";
const IrHkTeamStyle0 = irHkTeamCss;

var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const IrHkTeam = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.currentTrigger = null;
    }
    renderAssignedUnits(hk) {
        if (hk.assigned_units.length === 0) {
            return (index.h("span", null, "0 -", ' ', index.h("button", { class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }) }, locales_store.locales.entries.Lcz_Assign)));
        }
        return (index.h("span", null, hk.assigned_units.length, " -", ' ', index.h("button", { onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: hk }), class: "outline-btn" }, locales_store.locales.entries.Lcz_Edit)));
    }
    renderCurrentTrigger() {
        var _a;
        switch ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) {
            case 'unassigned_units':
                return index.h("ir-hk-unassigned-units", { slot: "sidebar-body", user: this.currentTrigger.user });
            case 'user':
                return index.h("ir-hk-user", { slot: "sidebar-body", user: this.currentTrigger.user, isEdit: this.currentTrigger.isEdit });
            default:
                return null;
        }
    }
    handleCloseSideBar(e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.currentTrigger = null;
    }
    handleDeletion(user) {
        this.currentTrigger = { type: 'delete', user };
        this.deletionTimout = setTimeout(() => {
            const modal = this.el.querySelector('ir-delete-modal');
            if (!modal)
                return;
            modal.openModal();
        }, 100);
    }
    disconnectedCallback() {
        clearTimeout(this.deletionTimout);
    }
    render() {
        var _a;
        const { assigned, total, un_assigned } = housekeeping_service.housekeeping_store.hk_criteria.units_assignments;
        return (index.h(index.Host, { key: '9b2620fd2952fcccfe60c0b1f74d0d6a20ed1044', class: "card p-1" }, index.h("section", { key: 'ac24e8647a5b75f8a8b37f47c451d88f58dcf6c7' }, index.h("ir-title", { key: 'c9ea85c59e84f629e44e2a1ca9f474520094e18c', label: locales_store.locales.entries.Lcz_HousekeepingTeam, justifyContent: "space-between" }, index.h("div", { key: '17132ab77b861b5bf3fd230964aebc4ef49b6b0d', slot: "title-body", class: "assignments-container gap-16 m-0" }, index.h("p", { key: '271a75ed3448db3f01c0545245ce431d93b135be', class: "font-weight-bold m-0 p-0" }, total, " ", locales_store.locales.entries.Lcz_TotalUnits), index.h("p", { key: '329af5278fb257cdba9af875df543cf2facca913', class: 'm-0 p-0' }, assigned, " ", index.h("span", { key: 'a746ed5535bba3a30ee1c5b486a71256a864612a' }, locales_store.locales.entries.Lcz_Assigned)), un_assigned > 0 && (index.h("button", { class: "outline-btn", onClick: () => (this.currentTrigger = { type: 'unassigned_units', user: null }) }, un_assigned, " ", locales_store.locales.entries.Lcz_Unassigned)))), index.h("p", { key: 'c1b77c2df3a8c64b0a9305c65a7c4376bdd789fc', class: 'm-0 p-0' }, locales_store.locales.entries.Lcz_AsAnOption)), index.h("section", { key: '6920c93b12baef2332d5bc82d07b82d9f3ffcb13', class: "table-container" }, index.h("table", { key: 'ef0d307a8b449a13cee7552ca68174c34b46b242', class: "table" }, index.h("thead", { key: '9dda7d6be7edec49c57d09cc15aebbf2ec53ba42' }, index.h("tr", { key: 'b8f5f623e608ef90d5e4d69fc45b130c555b1aea' }, index.h("th", { key: '2a70b5eca762eedccf573a61b6a1440d7ffafe22', class: "text-left" }, locales_store.locales.entries.Lcz_Name), index.h("th", { key: '90685acdf1a43796d5897b6b0c0ebd0e8e151463' }, locales_store.locales.entries.Lcz_Mobile), index.h("th", { key: '241454f66278be59a2927cb77ea17b5458b23269' }, locales_store.locales.entries.Lcz_Username), index.h("th", { key: '76cf084b7b6579860d823caa6afcc9432418bbda' }, locales_store.locales.entries.Lcz_Note), index.h("th", { key: 'dee2973b159d27d5de7ad3257c0f432572f76d0b' }, locales_store.locales.entries.Lcz_UnitsAssigned), index.h("th", { key: '83bdf8c1bfbaeef4d800fa2ded18ff479dcf772d', class: "text-center" }, index.h("ir-icon", { key: '3e0b14225ae43b4709ce898c643a6fb216ac2134', title: locales_store.locales.entries.Lcz_CreateHousekeeper, onIconClickHandler: () => {
                this.currentTrigger = {
                    type: 'user',
                    isEdit: false,
                    user: null,
                };
            } }, index.h("svg", { key: '138f7086f0d86eecba31e6ba57773bb726179af8', slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "17.5", viewBox: "0 0 448 512" }, index.h("path", { key: '8c960ddaf66330baa9313444ddfd838e1c8576f1', fill: "currentColor", d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })))))), index.h("tbody", { key: 'f5f244cb4ddd51c4d76835a919e9afac7d1489c0' }, housekeeping_service.housekeeping_store.hk_criteria.housekeepers.map(hk => (index.h("tr", { key: hk.id }, index.h("td", { class: "text-left" }, hk.name), index.h("td", null, hk.phone_prefix, " ", hk.mobile), index.h("td", null, hk.username), index.h("td", null, hk.note), index.h("td", null, this.renderAssignedUnits(hk)), index.h("td", { class: "text-center" }, index.h("div", { class: "icons-container" }, index.h("ir-icon", { title: locales_store.locales.entries.Lcz_EditHousekeeper, onIconClickHandler: () => {
                const user = __rest(hk, ["assigned_units", "is_soft_deleted", "is_active"]);
                this.currentTrigger = {
                    type: 'user',
                    isEdit: true,
                    user,
                };
            }, icon: "ft-save color-ir-light-blue-hover h5 pointer sm-margin-right" }, index.h("svg", { slot: "icon", xmlns: "http://www.w3.org/2000/svg", height: "20", width: "20", viewBox: "0 0 512 512" }, index.h("path", { fill: "#6b6f82", d: "M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" }))), index.h("span", null, " \u00A0"), index.h("ir-icon", { title: locales_store.locales.entries.Lcz_DeleteHousekeeper, icon: "ft-trash-2 danger h5 pointer", onIconClickHandler: () => this.handleDeletion(hk) }, index.h("svg", { slot: "icon", fill: "#ff2441", xmlns: "http://www.w3.org/2000/svg", height: "16", width: "14.25", viewBox: "0 0 448 512" }, index.h("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" }))))))))))), index.h("ir-sidebar", { key: 'd208b9e611bd20f5256a1ba3b30922fd39cb327e', showCloseButton: false, open: this.currentTrigger !== null && this.currentTrigger.type !== 'delete', onIrSidebarToggle: () => (this.currentTrigger = null), style: {
                '--sidebar-width': this.currentTrigger ? (this.currentTrigger.type === 'unassigned_units' ? 'max-content' : '40rem') : 'max-content',
            } }, this.renderCurrentTrigger()), ((_a = this.currentTrigger) === null || _a === void 0 ? void 0 : _a.type) === 'delete' && index.h("ir-delete-modal", { user: this.currentTrigger.user })));
    }
    get el() { return index.getElement(this); }
};
IrHkTeam.style = IrHkTeamStyle0;

const irUnitStatusCss = ".sc-ir-unit-status-h{display:block}.circle.sc-ir-unit-status{display:inline-flex;border-radius:50%}.green.sc-ir-unit-status{background:#57f707}.red.sc-ir-unit-status{background:rgb(199, 139, 36)}.orange.sc-ir-unit-status{background:#ff9149}.table-container.sc-ir-unit-status{width:100%;overflow-x:auto}.black.sc-ir-unit-status{background:#ff4961}table.sc-ir-unit-status{width:max-content}td.sc-ir-unit-status{min-width:140px;text-align:center;height:2rem}.smallcircle.sc-ir-unit-status{height:7px;width:7px}.bigcircle.sc-ir-unit-status{height:7px;width:7px}.status-container.sc-ir-unit-status,.action-container.sc-ir-unit-status{display:flex;align-items:center;gap:8px}.status-container.sc-ir-unit-status p.sc-ir-unit-status{margin:0}";
const IrUnitStatusStyle0 = irUnitStatusCss;

const IrUnitStatus = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.resetData = index.createEvent(this, "resetData", 7);
        this.housekeepingService = new housekeeping_service.HouseKeepingService();
    }
    componentWillLoad() {
        this.housekeepingService.setToken(housekeeping_service.housekeeping_store.default_properties.token);
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
            await this.housekeepingService.setExposedInspectionMode(housekeeping_service.housekeeping_store.default_properties.property_id, mode);
            this.resetData.emit(null);
        }
        catch (error) {
            console.error(error);
        }
    }
    render() {
        var _a;
        return (index.h(index.Host, { key: 'cce077314fb8693c49ca56e85b8bcc02e620da7b', class: "card p-1" }, index.h("ir-title", { key: 'f8c297c03631a4120928826fffdf6ef017d278ca', label: locales_store.locales.entries.Lcz_RoomOrUnitStatus }), index.h("div", { key: '5bfdf202cc169428afaba9e6bb35ef38f04d7797', class: "table-container" }, index.h("table", { key: '9d47e32f559eef9ec8d5f9dd0137f6525a34aa7f' }, index.h("thead", { key: '87db17ce357e4ed7de751a040839cddd5bf75823' }, index.h("tr", { key: 'ce5b4779f265d71c7fa2e017dbb74ae73277e262' }, index.h("th", { key: '521ef347fe804f44df91ba74e8811e2c9fee48d6' }, locales_store.locales.entries.Lcz_Status), index.h("th", { key: 'b3976f70aab0933e7ddd40122db0a781820c8531', class: 'text-center' }, locales_store.locales.entries.Lcz_Code), index.h("th", { key: 'ad47a0bcd16c539a7ec5f1fa201d985dd25c92e4' }, locales_store.locales.entries.Lcz_Action))), index.h("tbody", { key: '94485d1fef88b9c3faf482fb82ba115a282ca01f' }, (_a = housekeeping_service.housekeeping_store.hk_criteria.statuses) === null || _a === void 0 ? void 0 : _a.map(status => {
            var _a;
            return (index.h("tr", { key: status.code }, index.h("td", null, index.h("div", { class: "status-container" }, index.h("span", { class: `circle ${status.style.shape} ${status.style.color}` }), index.h("p", null, status.description))), index.h("td", null, status.code), index.h("td", null, index.h("div", { class: "action-container" }, index.h("p", { class: 'm-0' }, status.action), status.code === 'VAC' && (index.h("div", null, index.h("ir-select", { selectedValue: status.inspection_mode.is_active ? (_a = status.inspection_mode) === null || _a === void 0 ? void 0 : _a.window.toString() : '', LabelAvailable: false, firstOption: locales_store.locales.entries.Lcz_No, onSelectChange: this.handleSelectChange.bind(this), data: Array.from(Array(7 + 1), (_, i) => i).map(i => {
                    const text = i === 0
                        ? locales_store.locales.entries.Lcz_YesOnTheSameDay
                        : i === 1
                            ? locales_store.locales.entries.Lcz_DayPrior.replace('%1', i.toString())
                            : locales_store.locales.entries.Lcz_DaysPrior.replace('%1', i.toString());
                    return {
                        text,
                        value: i.toString(),
                    };
                }) })))))));
        }))))));
    }
};
IrUnitStatus.style = IrUnitStatusStyle0;

exports.ir_hk_team = IrHkTeam;
exports.ir_unit_status = IrUnitStatus;

//# sourceMappingURL=ir-hk-team_2.cjs.entry.js.map