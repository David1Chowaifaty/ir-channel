import{a as t}from"./p-103ecfd7.js";import{e,h as r,d as o}from"./p-f33057f4.js";import{g as n}from"./p-14712fa4.js";import{T as a}from"./p-5872a6ca.js";class s extends a{async getCalendarData(o,a,s){try{const i=this.getToken();if(i!==null){const{data:c}=await t.post(`/Get_Exposed_Calendar?Ticket=${i}`,{propertyid:o,from_date:a,to_date:s});if(c.ExceptionMsg!==""){throw new Error(c.ExceptionMsg)}const l=c.My_Result.months;const _=[];const d=await n(l);const u=l.map((t=>{_.push({daysCount:t.days.length,monthName:t.description});return t.days.map((o=>({day:e(o.description,t.description),currentDate:r(o.description,t.description),dayDisplayName:o.description,rate:o.room_types,unassigned_units_nbr:o.unassigned_units_nbr,occupancy:o.occupancy})))})).flat();return Promise.resolve({ExceptionCode:null,ExceptionMsg:"",My_Params_Get_Rooming_Data:{AC_ID:o,FROM:c.My_Params_Get_Exposed_Calendar.from_date,TO:c.My_Params_Get_Exposed_Calendar.to_date},days:u,months:_,myBookings:d,defaultMonths:l})}}catch(t){console.error(t)}}async fetchGuest(e){try{const r=this.getToken();if(r!==null){const{data:o}=await t.post(`/Get_Exposed_Guest?Ticket=${r}`,{email:e});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.log(t);throw new Error(t)}}async editExposedGuest(e,r){try{const o=this.getToken();if(o!==null){const{data:n}=await t.post(`/Edit_Exposed_Guest?Ticket=${o}`,Object.assign(Object.assign({},e),{book_nbr:r}));if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}}catch(t){console.log(t);throw new Error(t)}}async getBookingAvailability(e,r,o,n,a,s,i){try{const c=this.getToken();if(c){const{data:l}=await t.post(`/Get_Exposed_Booking_Availability?Ticket=${c}`,{propertyid:o,from_date:e,to_date:r,adult_nbr:n.adult,child_nbr:n.child,language:a,currency_ref:i.code,room_type_ids:s});if(l.ExceptionMsg!==""){throw new Error(l.ExceptionMsg)}return l["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getCountries(e){try{const r=this.getToken();if(r){const{data:o}=await t.post(`/Get_Exposed_Countries?Ticket=${r}`,{language:e});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.error(t);throw new Error(t)}}async fetchSetupEntries(){try{const e=this.getToken();if(e){const{data:r}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${e}`,{TBL_NAMES:["_ARRIVAL_TIME","_RATE_PRICING_MODE","_BED_PREFERENCE_TYPE"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}const o=r.My_Result;return{arrivalTime:o.filter((t=>t.TBL_NAME==="_ARRIVAL_TIME")),ratePricingMode:o.filter((t=>t.TBL_NAME==="_RATE_PRICING_MODE")),bedPreferenceType:o.filter((t=>t.TBL_NAME==="_BED_PREFERENCE_TYPE"))}}}catch(t){console.error(t);throw new Error(t)}}async getBlockedInfo(){try{const e=this.getToken();if(e){const{data:r}=await t.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${e}`,{TBL_NAMES:["_CALENDAR_BLOCKED_TILL"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.error(t);throw new Error(t)}}async getUserDefaultCountry(){try{const e=this.getToken();if(e){const{data:r}=await t.post(`/Get_Country_By_IP?Ticket=${e}`,{IP:""});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r["My_Result"]}}catch(t){console.error(t);throw new Error(t)}}async blockUnit(e){try{const r=this.getToken();if(r){const{data:o}=await t.post(`/Block_Exposed_Unit?Ticket=${r}`,e);if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}console.log(o);return o["My_Params_Block_Exposed_Unit"]}}catch(t){console.error(t);throw new Error(t)}}async getUserInfo(e){try{const r=this.getToken();if(r){const{data:o}=await t.post(`/GET_EXPOSED_GUEST?Ticket=${r}`,{email:e});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async getExposedBooking(e,r){try{const o=this.getToken();if(o){const{data:n}=await t.post(`/Get_Exposed_Booking?Ticket=${o}`,{booking_nbr:e,language:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t)}}generateDays(t,e,r){const o=new Date(t);const n=new Date(e);const a=[];while(o<n){a.push({date:o.toISOString().split("T")[0],amount:r,cost:null});o.setDate(o.getDate()+1)}return a}calculateTotalRate(t,e,r,o){if(r&&o===2){return+t}return+t/+e}async fetchExposedGuest(e,r){try{const o=this.getToken();if(o){const{data:n}=await t.post(`/Fetch_Exposed_Guests?Ticket=${o}`,{email:e,property_id:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async fetchExposedBookings(e,r,o,n){try{const a=this.getToken();if(a){const{data:s}=await t.post(`/Fetch_Exposed_Bookings?Ticket=${a}`,{booking_nbr:e,property_id:r,from_date:o,to_date:n});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return s["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getPCICardInfoURL(e){try{const r=this.getToken();if(r){const{data:o}=await t.post(`/Get_PCI_Card_Info_URL?Ticket=${r}`,{BOOK_NBR:e});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async bookUser(e,r,n,a,s,i,c,l,_,d,u,w,h,E,y){try{const f=this.getToken();if(f){const p=o(n);const m=o(a);let T={email:e.email===""?null:e.email||null,first_name:e.firstName,last_name:e.lastName,country_id:e.countryId===""?null:e.countryId,city:null,mobile:e.contactNumber===null?"":e.contactNumber,address:"",dob:null,subscribe_to_news_letter:e.emailGuest||false,cci:e.cardNumber?{nbr:e.cardNumber,holder_name:e.cardHolderName,expiry_month:e.expiryMonth,expiry_year:e.expiryYear}:null};if(w){T=Object.assign(Object.assign({},w),{email:w.email===""?null:w.email})}if(e.id){T=Object.assign(Object.assign({},T),{id:e.id})}const k={assign_units:true,check_in:r,is_pms:true,is_direct:true,booking:{booking_nbr:u||"",from_date:p,to_date:m,remark:e.message||null,property:{id:l},source:c,currency:d,arrival:{code:h?h:e.selectedArrivalTime},guest:T,rooms:[...s.map((t=>({identifier:y||null,roomtype:{id:t.roomCategoryId,name:t.roomCategoryName,physicalrooms:null,rateplans:null,availabilities:null,inventory:t.inventory,rate:t.rate/i},rateplan:{id:t.ratePlanId,name:t.ratePlanName,rate_restrictions:null,variations:null,cancelation:t.cancelation,guarantee:t.guarantee},unit:typeof E==="undefined"&&t.roomId===""?null:{id:+E||+t.roomId},occupancy:{adult_nbr:t.adultCount,children_nbr:t.childrenCount,infant_nbr:null},bed_preference:t.preference,from_date:p,to_date:m,notes:null,days:this.generateDays(p,m,this.calculateTotalRate(t.rate,i,t.isRateModified,t.rateType)),guest:{email:null,first_name:t.guestName,last_name:null,country_id:null,city:null,mobile:null,address:null,dob:null,subscribe_to_news_letter:null}}))),..._]}};console.log("book user payload",k);const{data:b}=await t.post(`/DoReservation?Ticket=${f}`,k);if(b.ExceptionMsg!==""){throw new Error(b.ExceptionMsg)}console.log(b["My_Result"]);return b["My_Result"]}else{throw new Error("Invalid token")}}catch(t){console.error(t);throw new Error(t)}}}export{s as B};
//# sourceMappingURL=p-1c70a483.js.map