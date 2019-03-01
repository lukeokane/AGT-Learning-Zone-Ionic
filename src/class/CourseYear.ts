import { Course } from './Course';

export class CourseYear {

    constructor(
        public id?:number,
        public courseYear?:number,
        public course?:Course,
        public courseId?:number
      )
    { }

}