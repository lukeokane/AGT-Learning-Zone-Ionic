import { CourseYear } from './CourseYear';
import { SemesterNumber } from "./SemesterNumber";
import { SemesterGroup } from "./SemesterGroup";

export class Semester {

    constructor(
        public id?:number,
        public semesterNumber?:SemesterNumber,
        public semesterStartDate?:Date,
        public semesterEndDate?:Date,
        public semesterGroups?:Array<SemesterGroup>,
        public courseYear?:CourseYear,
        public courseYearId?:number
    )
    { }

}