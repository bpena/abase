import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { ConnectionService } from '@core/services/connection.service';

@Injectable()
export class AuthService {

  constructor(private connectionService: ConnectionService) { }

  mock: Observable<Response> = Observable.create(observer => {
    console.log('prueba');
    const response: Response = new Response({} as ResponseOptions);
    response.ok = false;
    response.status = 404;
    response.statusText = 'todo OK';

    console.log(response);
    observer.next(response);
  });

  signin(): Observable<Response> {
    return this.mock;
  }

  signup() {

  }

  logout() {
    
  }

}
