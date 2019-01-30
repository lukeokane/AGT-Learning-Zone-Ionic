import { OrdinalScale } from "./OrdinalScale";
import { BookingUserDetails } from "./BookingUserDetails";
import { Subject } from "./Subject";
import { UserInfo } from "./UserInfo";
import { Notification } from "./Notification";

export class Booking {

    constructor(
        public id?:number,
        public title?:string,
        public requestedBy?:string,
        public startTime?:Date,
        public endTime?:Date,
        public userComments?:String,
        public importanceLevel?:OrdinalScale,
        public adminAcceptedId?:number,
        public tutorAccepted?:boolean,
        public tutorAcceptedId?:number,
        public tutorRejectedCount?:number,
        public cancelled?:boolean,
        public bookingUserDetails?: Array<BookingUserDetails>,
        public subject?:Subject,
        public userInfos?: Array<UserInfo>,
        public notifications?:Array<Notification>,
        public subjectId?:number,
        public modifiedTimestamp?:Date
    )
    { }

}