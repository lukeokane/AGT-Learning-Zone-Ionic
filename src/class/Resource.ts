import { Topic } from "./Topic";

export class Resource {

    constructor(
        public id?:number,
        public title?:string,
        public resourceURL?:string,
        public topic?:Topic
    )
    { }

}