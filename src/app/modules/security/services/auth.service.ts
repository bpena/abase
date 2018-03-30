import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RequestOptionsArgs, Response, ResponseOptions, Headers } from '@angular/http';
import { environment } from '@environments/environment';
import * as urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { ConnectionService } from '@core/services/connection.service';
import { User } from '@security/model/user';

@Injectable()
export class AuthService {
  private logged: BehaviorSubject<boolean>;
  private logoutMock: Observable<Response> = Observable.create(observer => {
    const response: Response = new Response({} as ResponseOptions);
    response.ok = true;
    response.status = 200;
    response.statusText = 'todo OK';

    this.logged.next(false);
    observer.next(response);
  });


  constructor(private connectionService: ConnectionService) {
    this.logged = new BehaviorSubject(false);
  }

  signin(user: User): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'auth/signin'); 
    const body = JSON.stringify(user);
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    return this.connectionService.post(url, body, { headers })
      .map(response => {
        this.logged.next(true);
        return response;
      });
  }

  signup() {

  }

  logout(): Observable<Response> {
   return this.logoutMock;
  }

  isLogged(): Observable<boolean> {
    return this.logged;
  }
}
