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
import { UserService } from '@security/services/user.service';

@Injectable()
export class AuthService {
  private logged: BehaviorSubject<boolean>;
  private currentUser$: BehaviorSubject<User>;

  constructor(private connectionService: ConnectionService,
            private userService: UserService) {
    const loggedIn = localStorage.getItem('token') ? true : false;
    const user = JSON.parse(localStorage.getItem('user'))
    this.logged = new BehaviorSubject(loggedIn);
    this.currentUser$ = new BehaviorSubject(user);
  }

  private login = ({token, userId, username, firstname, lastname, email, displayname}) => {
    this.currentUser$.next({
      username,
      firstname,
      lastname,
      email,
      _id: userId,
      displayname
    });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ userId, username, firstname, lastname, email, displayname }));
    this.logged.next(true);
  }

  private logout() {
    this.currentUser$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.logged.next(false);
  }

  signin(user: User): Observable<Response> {
    const url = urljoin(environment.apiUrl, 'auth/signin'); 
    const body = JSON.stringify(user);
    return this.connectionService.post(url, body)
      .map((response: any) => {
        this.login(response);
        return response;
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

  signup(user: User): Observable<Response> {
    return this.userService.createUser(user)
      .map((response: any) => {
        this.login(response);
        return response;
      });
  }

  isLogged(): Observable<boolean> {
    return this.logged;
  }

  currentUser(): BehaviorSubject<User> {
    return this.currentUser$;
  }    
}
