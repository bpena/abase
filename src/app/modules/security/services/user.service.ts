import { Injectable } from '@angular/core';
import { ConnectionService } from '@core/services/connection.service';
import { User } from '@security/model/user';
import { Observable } from 'rxjs/Observable';
import * as urljoin from 'url-join';
import { environment } from '@environments/environment';

@Injectable()
export class UserService {

  constructor(private connectionService: ConnectionService) { }

  createUser(user: User): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'auth/signup'); 
    const body = JSON.stringify(user);
    return this.connectionService.post(url, body)
      .map((response: any) => response);
  }

  getUsers(): Observable<User[]> {
    const url = urljoin(environment.apiUrl, 'user');
    return this.connectionService.get(url)
      .map(users => users as User[]);
  }

  restorePassword(email: string): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'user/reset');
    const body = { email };
    return this.connectionService.post(url, body)
      .map(response => response)
  }

  validateResetHash(hash: string): Observable<any> {
    const url = urljoin(environment.apiUrl, 'user/reset', hash);
    return this.connectionService.get(url)
      .map(response => response);
  }

  updatePassword(user: User): Observable<any> {
    const url = urljoin(environment.apiUrl, 'user', user._id, 'password');
    const body = {
      password: user.password
    };

    return this.connectionService.put(url, body)
      .map(response => {
        console.log(response);
        return response;
      })
  }
}
