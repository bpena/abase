export class User {
    constructor(
        public username: string,
        public password: string,
        public firstname?: string,
        public lastname?: string,
        public createdAt?: Date,
        public id?: string
    ) {}
    
}