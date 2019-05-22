import { Message } from './Message';
import { OrdinalScale } from "./OrdinalScale";
import { BookingUserDetails } from "./BookingUserDetails";
import { Subject } from "./Subject";
import { UserInfo } from "./UserInfo";
import { Notification } from "./Notification";
import { Topic } from "./Topic";

export class Booking {

    constructor(
        public id?:number,
        public title?:string,
        public requestedBy?:string,
        public startTime?:any,
        public endTime?:any,
        public userComments?:String,
        public importanceLevel?:OrdinalScale,
        public adminAcceptedId?:number,
        public tutorAccepted?:boolean,
        public tutorAcceptedId?:number,
        public tutorRejectedCount?:number,
        public cancelled?:boolean,
        public bookingUserDetails?: Array<BookingUserDetails>,
        public bookingUserDetailsDTO?: Array<BookingUserDetails>,
        public subject?:Subject,
        public userInfos?: Array<UserInfo>,
        public notifications?:Array<Notification>,
        public subjectId?:number,
        public modifiedTimestamp?:Date,
        public requestTimes?:string,
        public readByAdmin?:boolean,
        public topics?:Array<Topic>,
        public bookedById?:any
        )
    { }

}