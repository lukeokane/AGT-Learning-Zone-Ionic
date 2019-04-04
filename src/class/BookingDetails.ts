import { Message } from './Message';
import { Booking } from './Booking';
export class BookingDetails {

    constructor(
        public id?:number,
        public booking?:Booking,
        public message?:Message
    )
    { }

}