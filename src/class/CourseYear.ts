import { Course } from './Course';
import { Subject } from './Subject';

export class CourseYear {

    constructor(
        public id?:number,
        public courseYear?:number,
        public course?:Course,
        public courseId?:number,
        public subjects?:Array<Subject>
      )
    { }

}