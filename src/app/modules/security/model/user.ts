import { UserStatus } from '@security/model/user-status.enum';
export interface User {
    username: string,
    password?: string,
    email?: string,
    firstname?: string,
    lastname?: string,
    displayname?: string,
    createdAt?: number,
    _id?: string,
    status?: UserStatus
}