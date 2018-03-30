import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RequestOptionsArgs, Response, ResponseOptions, Headers } from '@angular/http';
import { environment } from '@environments/environment';
import * as urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { ConnectionService } from '@core/services/connection.service';
import { User } from '@security/model/user';

@Injectable()
export class AuthService {
  private logged: BehaviorSubject<boolean>;
  private currentUser?: User;

  private logoutMock: Observable<Response> = Observable.create(observer => {
    const response: Response = new Response({} as ResponseOptions);
    response.ok = true;
    response.status = 200;
    response.statusText = 'todo OK';
    observer.next(response);
  });

  constructor(private connectionService: ConnectionService) {
    const loggedIn = localStorage.getItem('token') ? true : false;
    this.logged = new BehaviorSubject(loggedIn);
  }

  private login = (token, userId, username, firstname, lastname, email) => {
    this.currentUser = { username: username, firstname: firstname, lastname: lastname, email: email, _id: userId };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, username, firstname, lastname, email }));
    this.logged.next(true);
  }

  private logout() {
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.logged.next(false);
  }

  signin(user: User): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'auth/signin'); 
    const body = JSON.stringify(user);
    return this.connectionService.post(url, body)
      .map((response: any) => {
        const { token, userId, username, firstname, lastname, email } = response;
        this.login(token, userId, username, firstname, lastname, email);
        return response;
      })
      .catch(error => {
        this.logout();
        return error;
      });
  }

  signout(): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'auth/signout');
    const body = {};
    return this.connectionService.post(url, body)
      .map((response: any) => {
        this.logout();
        return response;
      })
  }

  signup() {

  }

  isLogged(): Observable<boolean> {
    return this.logged;
  }
}
