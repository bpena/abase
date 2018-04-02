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
      .map((response: any) => {
        return response;
      });
  }

  getUsers(): Observable<User[]> {
    const url = urljoin(environment.apiUrl, 'user');
    return this.connectionService.get(url)
      .map(users => users as User[]);
  }
}
