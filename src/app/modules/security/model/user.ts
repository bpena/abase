import { UserStatus } from '@security/model/user-status.enum';
export class User {
    username: string;
    password?: string;
    email?: string;
    firstname?: string;
    lastname?: string;
    displayname?: string;
    createdAt?: number;
    _id?: string;
    status?: UserStatus;

    constructor(obj: {
        username: string,
        password?: string,
        email?: string,
        firstname?: string,
        lastname?: string,
        displayname?: string,
        createdAt?: number,
        _id?: string,
        status?: UserStatus
    }) {
        this.username  = obj.username;
        this.password  = obj.password;
        this.email     = obj.email;
        this.firstname = obj.firstname;
        this.lastname  = obj.lastname;
        this.createdAt = obj.createdAt;
        this._id       = obj._id;
        this.status    = obj.status;
        this.displayname = obj.displayname || obj.username || (`${obj.firstname} ${obj.lastname}`);
    }
}