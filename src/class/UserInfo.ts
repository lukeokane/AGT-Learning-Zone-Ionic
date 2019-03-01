import { User } from './User';
import { BookingUserDetails } from './BookingUserDetails';
import { Booking } from './Booking';
export class UserInfo {

    constructor(
        public id?:number,
        public tutorSkills?:string,
        public user?:User,
        public bookingUserDetails?:Array<BookingUserDetails>,
        public sentNotifications?:Array<Notification>,
        public receivedNotifications?:Array<Notification>,
        public bookings?:Array<Booking>,
        public userId?:number,
        public profileImageURL?:string,
        public courseYearId?:number,
    )
    { }

}