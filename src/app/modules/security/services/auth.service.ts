import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { ConnectionService } from '@core/services/connection.service';

@Injectable()
export class AuthService {
  private logged: BehaviorSubject<boolean>;  
  private loginMock: Observable<Response> = Observable.create(observer => {
    const response: Response = new Response({} as ResponseOptions);
    response.ok = true;
    response.status = 200;
    response.statusText = 'todo OK';

    this.logged.next(true);
    observer.next(response);
  });
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

  signin(): Observable<Response> {
    return this.loginMock;
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
