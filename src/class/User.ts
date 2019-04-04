export class User {

    constructor(
        public id?:number,
        public login?:string,
        public password?:string,
        public firstName?:string,
        public lastName?:string,
        public email?:string,
        public activated?:boolean,
        public langKey?:string,
        public imageURL?:string,
        public activationKey?:string,
        public resetKey?:string,
        public resetDate?:Date,
        public authorities?:any[],
        public createdBy?:string,
        public createdDate?:Date,
        public lastModifiedBy?:string,
        public lastModifiedDate?:Date,
    )
    { }
}