import{T as o}from"./p-5872a6ca.js";import{c as t,a as e}from"./p-103ecfd7.js";import{h as s}from"./p-6c4ba7c0.js";const n={channels:[],settlement_methods:[],statuses:[],types:[],token:"",rowCount:10,bookings:[],userSelection:{from:s().add(-7,"days").format("YYYY-MM-DD"),to:s().format("YYYY-MM-DD"),channel:"",property_id:null,start_row:0,end_row:20,total_count:0,filter_type:null,name:"",book_nbr:"",booking_status:"",affiliate_id:0,is_mpo_managed:false,is_mpo_used:false,is_for_mobile:false,is_combined_view:false,is_to_export:false},download_url:null};const{state:a,onChange:i}=t(n);function r(){a.userSelection=Object.assign(Object.assign({},a.userSelection),{channel:"",booking_status:a.statuses[0].code,filter_type:a.types[0].id,book_nbr:"",name:"",from:s().add(-7,"days").format("YYYY-MM-DD"),to:s().format("YYYY-MM-DD"),start_row:0,end_row:a.rowCount})}function c(o,t){a.userSelection=Object.assign(Object.assign({},a.userSelection),{[o]:t})}class _ extends o{async getExposedBookingsCriteria(o){const t=this.getToken();if(!t){throw new Error("Invalid token")}const{data:s}=await e.post(`/Get_Exposed_Bookings_Criteria?Ticket=${t}`,{property_id:o});const n=s.My_Result;a.channels=n.channels;a.settlement_methods=n.settlement_methods;a.statuses=n.statuses;a.types=n.types;r()}async getExposedBookings(o){const t=this.getToken();if(!t){throw new Error("Invalid token")}const{data:s}=await e.post(`/Get_Exposed_Bookings?Ticket=${t}`,o);const n=s.My_Result;const i=s.My_Params_Get_Exposed_Bookings;a.bookings=[...n];a.userSelection=Object.assign(Object.assign({},a.userSelection),{total_count:i.total_count});a.download_url=i.exported_data_url}async removeExposedBooking(o,t){const s=this.getToken();if(!s){throw new Error("Invalid token")}await e.post(`/Remove_Exposed_Booking?Ticket=${s}`,{booking_nbr:o,is_to_revover:t})}}export{_ as B,a as b,r as i,i as o,c as u};
//# sourceMappingURL=p-7c1d5151.js.map