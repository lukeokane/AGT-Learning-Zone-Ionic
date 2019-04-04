import { Booking } from './Booking';
import { Topic } from "./Topic";

export class Subject {

    constructor(
        public id?:number,
        public title?:string,
        public subjectCode?:string,
        public topics?:Array<Topic>,
        public bookings?:Array<Booking>
    )
    { }

}