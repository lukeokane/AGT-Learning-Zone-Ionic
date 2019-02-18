import { Course } from './Course';
import { Semester } from "./Semester";

export class CourseYear {

    constructor(
        public id?:number,
        public courseYear?:number,
        public semesters?:Array<Semester>,
        public course?:Course,
        public courseId?:number
      )
    { }

}