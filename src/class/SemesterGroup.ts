import { UserInfo } from './UserInfo';
import { Subject } from './Subject';
import { Semester } from './Semester';

export class SemesterGroup {

    constructor(
        public id?:number,
        public title?:string,
        public userInfos?:Array<UserInfo>,
        public subjects?:Array<Subject>,
        public semester?:Semester,
        public semesterId?:number
    )
    { }

}