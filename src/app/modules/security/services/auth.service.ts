import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { ConnectionService } from '@core/services/connection.service';

@Injectable()
export class AuthService {
  private logged: BehaviorSubject<boolean>;  
  private mock: Observable<Response> = Observable.create(observer => {
    console.log('prueba');
    const response: Response = new Response({} as ResponseOptions);
    response.ok = false;
    response.status = 404;
    response.statusText = 'todo OK';

    console.log(response);
    this.logged.next(true);
    observer.next(response);
  });


  constructor(private connectionService: ConnectionService) {
    this.logged = new BehaviorSubject(false);
  }

  signin(): Observable<Response> {
    return this.mock;
  }

  signup() {

  }

  logout() {
    
  }

  isLogged(): Observable<boolean> {
    return this.logged;
  }
}
