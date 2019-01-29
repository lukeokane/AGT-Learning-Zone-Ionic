import { SemesterGroup } from './SemesterGroup';
import { User } from './User';
import { BookingUserDetails } from './BookingUserDetails';
import { Booking } from './Booking';
export class UserInfo {

    constructor(
        public id?:number,
        public tutorSkills?:string,
        public user?:User,
        public semesterGroup?:SemesterGroup,
        public bookingUserDetails?:Array<BookingUserDetails>,
        public sentNotifications?:Array<Notification>,
        public receivedNotifications?:Array<Notification>,
        public bookings?:Array<Booking>,
        public userId?:number
        // public courseTitle?:string,
        // public courseYear?:number,
        // public courseGroupTitle?:string,
        // public phoneNumber?:string,
        // public tutorSkills?:string
    )
    { }

}