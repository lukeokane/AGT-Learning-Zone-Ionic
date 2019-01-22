import { Subject } from './Subject';
import { Resource } from "./Resource";

export class Topic {

    constructor(
        public id?:number,
        public title?:string,
        public resources?:Array<Resource>,
        public subjects?:Array<Subject>
    )
    { }

}