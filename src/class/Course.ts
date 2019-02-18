import { CourseYear } from "./CourseYear";

export class Course {

    constructor(
        public id?:number,
        public title?:string,
        public courseCode?:string,
        public courseYears?:Array<CourseYear>
    )
    { }

}