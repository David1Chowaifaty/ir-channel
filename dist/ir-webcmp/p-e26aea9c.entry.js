import{r as e,h as i,H as t,c as a}from"./p-c8e6073c.js";import{B as s,b as n,u as l,i as o}from"./p-7c1d5151.js";import{l as c}from"./p-f24c2f6c.js";import{P as r}from"./p-a53c3441.js";import{h as d}from"./p-6c4ba7c0.js";import"./p-5872a6ca.js";import"./p-103ecfd7.js";const f=".sc-ir-listing-header-h{display:block;margin:0;padding:0;--ir-date-range-border:#cacfe7;--ir-date-range-width:242px;position:relative}h3.sc-ir-listing-header{margin:0}ir-input-text.sc-ir-listing-header{width:300px}.booking-search-field.sc-ir-listing-header{margin-left:0px;display:flex;align-items:center;gap:14px}.booking-container.sc-ir-listing-header{gap:14px}.filters-container.sc-ir-listing-header{gap:10px;justify-content:space-between}.buttons-container.sc-ir-listing-header{gap:14px;color:#104064}.new-booking-container.sc-ir-listing-header{position:absolute;right:10px;top:5px}.new-booking-btn.sc-ir-listing-header{all:unset;cursor:pointer;color:#104064}.new-booking-btn.sc-ir-listing-header:hover{color:#0b2538}.seperator-container.sc-ir-listing-header{margin-top:10px;justify-content:center !important;gap:14px}.seperator-container.sc-ir-listing-header span.sc-ir-listing-header{display:block;height:1px;background:var(--gray);width:45%;max-width:200px;margin:0}@media (max-width: 575.98px){.sc-ir-listing-header-h{--ir-date-range-width:100%}.flex-fill-sm-none.sc-ir-listing-header{flex:1 1 auto}.flex-fill-sm-none.sc-ir-listing-header label.sc-ir-listing-header{width:100px}.buttons-container.sc-ir-listing-header{justify-content:center !important;align-items:center !important;gap:40px}}@media (min-width: 1200px){.booking-search-field.sc-ir-listing-header{margin-left:40px}}@media (min-width: 1600px){.flex-fill-sm-none.sc-ir-listing-header{flex:0 0 auto}.booking-search-field.sc-ir-listing-header{margin-left:40px}}";const h=f;const b=class{constructor(i){e(this,i);this.bookingListingService=new s;this.propertyId=undefined;this.language=undefined;this.baseurl=undefined;this.inputValue=""}componentWillLoad(){this.bookingListingService.setToken(n.token)}handleDateRangeChange(e){e.stopImmediatePropagation();e.stopPropagation();const{start:i,end:t}=e.detail;n.userSelection=Object.assign(Object.assign({},n.userSelection),{from:i.format("YYYY-MM-DD"),to:t.format("YYYY-MM-DD")})}async handleSearchClicked(e){if(this.inputValue!==""){if(/^-?\d+$/.test(this.inputValue.trim())){l("book_nbr",this.inputValue.trim())}else if(this.inputValue[3]==="-"){l("book_nbr",this.inputValue.trim())}else{l("name",this.inputValue.trim())}}if(this.inputValue===""&&(n.userSelection.book_nbr!==""||n.userSelection.name!=="")){n.userSelection=Object.assign(Object.assign({},n.userSelection),{name:"",book_nbr:""})}await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{start_row:0,end_row:20,is_to_export:e}));if(n.download_url){const e=n.download_url;this.downloadUrlTag.href=e;this.downloadUrlTag.download=e;this.downloadUrlTag.click();n.download_url=null}}async handleClearUserField(){o();if(this.inputValue){this.inputValue=""}await this.bookingListingService.getExposedBookings(Object.assign(Object.assign({},n.userSelection),{start_row:0,end_row:20,is_to_export:false}))}render(){var e,a,s,o,r,d,f,h,b,p;return i(t,{key:"95509e9c1e34724f2f9591e275524acfbbd44c39"},i("a",{key:"3dd11310463d39d12364f75c4ab1be25fc4892c5",ref:e=>this.downloadUrlTag=e},i("p",{key:"0b4c842f4e727203ae27fa58f293b9ed487aa707",class:"sr-only"},"download url")),i("section",{key:"cd45a15961f90dc8f1c843cf44f8a4f650c327a2",class:"d-flex align-items-center "},i("div",{key:"aec8d15a29b4ccaa8ab247a8effb47b9e5d0bcb4",class:"d-flex flex-fill flex-column flex-md-row align-items-md-center booking-container"},i("div",{key:"ad71b095f3af789350308f071291b7395a80a94f",class:"d-flex mb-1 d-md-none align-items-center justify-content-bettween width-fill"},i("h3",{key:"ea7113404da48a3e1ad536ed00d8d24ebee55426",class:"flex-fill"},(e=c.entries)===null||e===void 0?void 0:e.Lcz_Bookings),i("div",{key:"92f9360b36728b55a562d1fa496c0a2321107edc"},n.token&&i("igl-book-property-container",{withIrToastAndInterceptor:false,propertyid:this.propertyId,language:this.language,title:c.entries.Lcz_CreateNewBooking,baseurl:this.baseurl,ticket:n.token},i("button",{slot:"trigger",class:"new-booking-btn"},i("svg",{xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},i("path",{fill:"currentColor",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})))))),i("h3",{key:"3ae23157f383f6f6b7979a12cb41e80478612477",class:"d-none d-md-block"},(a=c.entries)===null||a===void 0?void 0:a.Lcz_Bookings),i("form",{key:"a45357b8fff17af49321b9dce9e8998d7a441d36",onSubmit:e=>{e.preventDefault();console.log(this.inputValue);this.handleSearchClicked(false)},class:"booking-search-field width-fill"},i("ir-input-text",{key:"44469ef63c4ed0d73b04fe13d812151e1b3d9ff7",class:"flex-fill",value:this.inputValue,onTextChange:e=>this.inputValue=e.detail,variant:"icon",placeholder:(s=c.entries)===null||s===void 0?void 0:s.Lcz_FindBookNbrorName},i("svg",{key:"54cbaf7694362d0e31348af78822bc78062bde0a",slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"14",viewBox:"0 0 512 512"},i("path",{key:"fd74ab0b80dda0d502fb212d12c5f17c45cfd003",fill:"currentColor",d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"}))),i("h5",{key:"053da777fdfc2be3a68f5a8decaa475f04ab0878",class:"m-0 font-weight-bold d-none d-sm-block"},(o=c.entries)===null||o===void 0?void 0:o.Lcz_Or))),i("div",{key:"aa742fbf22979cc7d60a6e68ccd35d083de34fa9",class:"d-none d-md-block"},n.token&&i("igl-book-property-container",{withIrToastAndInterceptor:false,propertyid:this.propertyId,language:this.language,title:c.entries.Lcz_CreateNewBooking,baseurl:this.baseurl,ticket:n.token},i("button",{slot:"trigger",class:"new-booking-btn"},i("svg",{xmlns:"http://www.w3.org/2000/svg",height:"20",width:"17.5",viewBox:"0 0 448 512"},i("path",{fill:"currentColor",d:"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"})))))),i("section",{key:"a9974b502fc5e5aa85a9f96ee9506abf416a6dca",class:"d-flex align-items-center justify-evenly seperator-container d-sm-none"},i("span",{key:"696b19afc2f769e85f825067c6ad28fb7f4e824a"}),i("h5",{key:"481f96f582bc549eb3722ff0d242472ed9f7fcbd",class:"m-0 font-weight-bold"},(r=c.entries)===null||r===void 0?void 0:r.Lcz_Or),i("span",{key:"8f8bc824b8d324ed98b9066c61b9b519d2aa9de6"})),i("section",{key:"526ed8499d1d0d48fbccf4269773eec445758d33",class:"d-flex flex-column align-items-sm-center flex-sm-row flex-sm-wrap filters-container justify-content-lg-start mt-1"},i("ir-select",{key:"d60bea05f8285d6a31e0f83e0f667fe01c2ac5fe",onSelectChange:e=>l("filter_type",e.detail),showFirstOption:false,data:n===null||n===void 0?void 0:n.types.map((e=>({value:e.id.toString(),text:e.name}))),class:"flex-sm-wrap",selectedValue:n.userSelection.filter_type,select_id:"dateTo",LabelAvailable:false}),i("igl-date-range",{key:"1c9a7b778b5a92594b7e53642a90434c214a0ed2",class:"flex-sm-wrap",minDate:"2000-01-01",withDateDifference:false,defaultData:{fromDate:n.userSelection.from,toDate:n.userSelection.to}}),i("ir-select",{key:"1aa473dfc33a274b52f5796e35dea3581cfc61c5",class:"flex-sm-wrap",selectedValue:n.userSelection.booking_status,onSelectChange:e=>l("booking_status",e.detail),showFirstOption:false,data:n===null||n===void 0?void 0:n.statuses.map((e=>({value:e.code,text:e.name}))),select_id:"booking_status",LabelAvailable:false}),i("ir-select",{key:"552ce0e8b72d864bf5dd19c43f876ebf30a94941",class:"flex-sm-wrap",selectedValue:n.userSelection.channel,onSelectChange:e=>l("channel",e.detail),LabelAvailable:false,data:n===null||n===void 0?void 0:n.channels.map((e=>({value:e.name,text:e.name}))),select_id:"channels",firstOption:((d=c.entries)===null||d===void 0?void 0:d.Lcz_All)+" "+((f=c.entries)===null||f===void 0?void 0:f.Lcz_Channels)}),i("div",{key:"20d0b7541d05436405fe3275fa47f2f70d41c62e",class:"d-flex flex-fill align-items-end m-0  buttons-container"},i("ir-icon",{key:"452f860aeefc5037dbce97ba5ac3853f0248c2ae",title:(h=c.entries)===null||h===void 0?void 0:h.Lcz_Search,onIconClickHandler:()=>this.handleSearchClicked(false)},i("svg",{key:"306b07ae803c7b4ed9c568f091f360d1d600786c",slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"20",viewBox:"0 0 512 512"},i("path",{key:"7610373afcca951d0ac082fd09c51dea3d6cc03a",fill:"currentColor",d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"}))),i("ir-icon",{key:"b5a41002adc8b288dd1dee65c247659c9cdc2ea8",title:(b=c.entries)===null||b===void 0?void 0:b.Lcz_Erase,onIconClickHandler:()=>this.handleClearUserField()},i("svg",{key:"3f5623457056789ae8dbbe4d3a8139aec36c6f3f",slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"22.5",viewBox:"0 0 576 512"},i("path",{key:"a200f3e311458b5c2a1bff1a3e435fce9b629be4",fill:"currentColor",d:"M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"}))),i("ir-icon",{key:"8414335dd6fa4de54d18239bab93feba485e96c7",onIconClickHandler:()=>this.handleSearchClicked(true),title:(p=c.entries)===null||p===void 0?void 0:p.Lcz_ExportToExcel},i("svg",{key:"6c691785b14e378698eaaee177d9b40ace746da6",slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"20",width:"15",viewBox:"0 0 384 512"},i("path",{key:"70d92ad36a22022d5f9eb3d4e66ad7ff9afe3ae0",fill:"currentColor",d:"M48 448V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"}))))))}};b.style=h;const p=".backdropModal.sc-ir-listing-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-listing-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-listing-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-listing-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-listing-modal{z-index:1001 !important}.modal-dialog.sc-ir-listing-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-listing-modal{gap:10px}.exit-icon.sc-ir-listing-modal{position:absolute;right:10px;top:5px;margin:0}.ir-modal.sc-ir-listing-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-listing-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";const g=p;const m=class{constructor(i){e(this,i);this.modalClosed=a(this,"modalClosed",7);this.resetData=a(this,"resetData",7);this.bookingListingsService=new s;this.paymentService=new r;this.modalTitle="Modal Title";this.editBooking=undefined;this.isOpen=false;this.deletionStage=1;this.selectedDesignation=undefined;this.loadingBtn=null}componentWillLoad(){this.bookingListingsService.setToken(n.token);this.paymentService.setToken(n.token);this.selectedDesignation=n.settlement_methods[0].name}async closeModal(){this.isOpen=false;this.deletionStage=1;this.selectedDesignation=n.settlement_methods[0].name;this.modalClosed.emit(null)}async openModal(){this.isOpen=true}filterBookings(){n.bookings=n.bookings.filter((e=>e.booking_nbr!==this.editBooking.booking.booking_nbr))}async btnClickHandler(e){let i=e.target;let t=i.name;try{if(t==="confirm"){if(this.editBooking.cause==="payment"){await this.paymentService.AddPayment({amount:this.editBooking.booking.financial.due_amount,currency:this.editBooking.booking.currency,date:d().format("YYYY-MM-DD"),designation:this.selectedDesignation,id:-1,reference:""},this.editBooking.booking.booking_nbr);this.resetData.emit(this.editBooking.booking.booking_nbr);this.closeModal()}else{if(this.deletionStage===2){this.loadingBtn="recover_and_delete";await this.bookingListingsService.removeExposedBooking(this.editBooking.booking.booking_nbr,true);this.filterBookings()}if(this.deletionStage===1){this.deletionStage=2}}}if(t==="cancel"){if(this.deletionStage===2){this.loadingBtn="just_delete";await this.bookingListingsService.removeExposedBooking(this.editBooking.booking.booking_nbr,false);this.filterBookings()}else{this.closeModal()}}}catch(e){console.error(e)}finally{if(this.loadingBtn){this.loadingBtn=null;this.closeModal()}}}renderTitle(){var e,i;if(this.editBooking.cause==="payment"){return(e=c.entries)===null||e===void 0?void 0:e.Lcz_MarkBookingAsPaid.replace("%1",this.editBooking.booking.booking_nbr)}else{if(this.deletionStage===1){return c.entries.Lcz_SureYouWantToDeleteBookingNbr+((i=this.editBooking)===null||i===void 0?void 0:i.booking.booking_nbr)}return c.entries.Lcz_WantToRecoverAllotment}}renderConfirmationTitle(){if(this.deletionStage===2){return c.entries.Lcz_RecoverAndDelete}return c.entries.Lcz_Confirm}renderCancelationTitle(){if(this.deletionStage===2){return c.entries.Lcz_JustDelete}return c.entries.Lcz_Cancel}render(){if(!this.editBooking){return null}return[i("div",{class:`backdropModal ${this.isOpen?"active":""}`,onClick:()=>{if(this.editBooking.cause==="delete"){return}this.closeModal()}}),i("div",{"data-state":this.isOpen?"opened":"closed",class:`ir-modal`,tabindex:"-1"},this.isOpen&&i("div",{class:`ir-alert-content p-2`},i("div",{class:`ir-alert-header align-items-center border-0 py-0 m-0 `},i("p",{class:"p-0 my-0 mb-1"},this.renderTitle()),i("ir-icon",{class:"exit-icon",style:{cursor:"pointer"},onClick:()=>{this.closeModal()}},i("svg",{slot:"icon",xmlns:"http://www.w3.org/2000/svg",height:"14",width:"10.5",viewBox:"0 0 384 512"},i("path",{fill:"currentColor",d:"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"})))),i("div",{class:"modal-body text-left p-0 mb-2"},this.editBooking.cause==="payment"?i("ir-select",{selectedValue:this.selectedDesignation,onSelectChange:e=>this.selectedDesignation=e.detail,showFirstOption:false,LabelAvailable:false,data:n.settlement_methods.map((e=>({value:e.name,text:e.name})))}):null),i("div",{class:`ir-alert-footer border-0 d-flex justify-content-end`},i("ir-button",{isLoading:this.loadingBtn==="just_delete",icon:"",btn_color:"secondary",btn_block:true,text:this.renderCancelationTitle(),name:"cancel"}),i("ir-button",{isLoading:this.loadingBtn==="recover_and_delete",icon:"",btn_color:"primary",btn_block:true,text:this.renderConfirmationTitle(),name:"confirm"}))))]}};m.style=g;export{b as ir_listing_header,m as ir_listing_modal};
//# sourceMappingURL=p-e26aea9c.entry.js.map