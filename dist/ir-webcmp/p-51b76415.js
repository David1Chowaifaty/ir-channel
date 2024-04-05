import{a as e}from"./p-103ecfd7.js";import{d as t,k as r}from"./p-f33057f4.js";import{T as o}from"./p-5872a6ca.js";class a extends o{async getUnassignedDates(t,r,o){try{const a=this.getToken();if(a){const{data:n}=await e.post(`/Get_UnAssigned_Dates?Ticket=${a}`,{propertyid:t,from_date:r,to_date:o});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return this.convertUnassignedDates(n.My_Result)}else{throw new Error("Invalid Token")}}catch(e){console.error(e);throw new Error(e)}}async getUnassignedRooms(t,r,o,a){try{const n=this.getToken();if(n){const{data:s}=await e.post(`/Get_Aggregated_UnAssigned_Rooms?Ticket=${n}`,{propertyid:t,specific_date:r});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return this.transformToAssignable(s,o,a)}else{throw new Error("Invalid Token")}}catch(e){console.error(e);throw new Error(e)}}async assignUnit(t,r,o){try{const a=this.getToken();if(a){const{data:n}=await e.post(`/Assign_Exposed_Room?Ticket=${a}`,{booking_nbr:t,identifier:r,pr_id:o});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}console.log(n);return n["My_Result"]}else{throw new Error("Invalid token")}}catch(e){console.error(e);throw new Error(e)}}cleanSpacesAndSpecialChars(e){const t=/[^a-zA-Z0-9]+/g;return e.replace(t,"")}transformToAssignable(e,t,r){const o=[];e.My_Result.forEach((e=>{e.unassigned_rooms.forEach((e=>{let a={roomTypeName:e.room_type_name,ID:e.identifier,NAME:e.guest_name,identifier:e.identifier,FROM_DATE:e.unassigned_date,TO_DATE:e.unassigned_date,BOOKING_NUMBER:e.book_nbr,STATUS:"IN-HOUSE",defaultDateRange:{fromDate:undefined,toDate:undefined,fromDateTimeStamp:0,toDateTimeStamp:0,fromDateStr:"",toDateStr:"",dateDifference:0},NO_OF_DAYS:1,roomsInfo:t,legendData:r,availableRooms:[],RT_ID:this.getRoomTypeId(e.room_type_name,t)};this.updateAvailableRooms(e,a,r,t);this.addDefaultDateRange(a);o.push(a)}))}));return o}addDefaultDateRange(e){e.defaultDateRange.fromDate=new Date(e.FROM_DATE+"T00:00:00");e.defaultDateRange.fromDateStr=t(e.defaultDateRange.fromDate);e.defaultDateRange.fromDateTimeStamp=e.defaultDateRange.fromDate.getTime();e.defaultDateRange.toDate=new Date(e.TO_DATE+"T00:00:00");e.defaultDateRange.toDateStr=t(e.defaultDateRange.toDate);e.defaultDateRange.toDateTimeStamp=e.defaultDateRange.toDate.getTime();e.defaultDateRange.dateDifference=e.NO_OF_DAYS}getRoomTypeId(e,t){return t.find((t=>this.cleanSpacesAndSpecialChars(t.name)===this.cleanSpacesAndSpecialChars(e))).id||null}updateAvailableRooms(e,t,o,a){const n=[];e.assignable_units.forEach((e=>{if(e.Is_Fully_Available&&!e.Is_Not_Available){const s=r(e.from_date,e.to_date);n.push({RT_ID:t.RT_ID,STATUS:"PENDING-CONFIRMATION",FROM_DATE:e.from_date,roomName:e.name,PR_ID:e.pr_id,TO_DATE:e.to_date,NO_OF_DAYS:s,ID:"NEW_TEMP_EVENT",NAME:"",NOTES:"",BALANCE:"",INTERNAL_NOTE:"",hideBubble:true,legendData:o,roomsInfo:a});t.TO_DATE=e.to_date;t.NO_OF_DAYS=s}}));t.availableRooms=n}convertUnassignedDates(e){let t={};e.forEach((e=>{let r=new Date(e.date);r.setHours(0,0,0,0);t[r.getTime()]={categories:{},dateStr:e.description}}));return t}}export{a as T};
//# sourceMappingURL=p-51b76415.js.map