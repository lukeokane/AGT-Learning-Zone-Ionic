import { Booking } from './Booking';
import { UserInfo } from './UserInfo';
export class Notification {

    constructor(
        public id?:number,
        public timestamp?:Date,
        public message?:string,
        public senderImageURL?:string,
        public read?:boolean,
        public sender?:UserInfo,
        public receiver?:UserInfo,
        public booking?:Booking
    )
    { }

}