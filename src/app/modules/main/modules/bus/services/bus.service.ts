import { Injectable } from '@angular/core';
import { Bus } from '@bus/model/bus';
import { ConnectionService } from '@core/services/connection.service';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusService {

  private mock: Observable<Response> = Observable.create(observer => {
    const response: Response = new Response({} as ResponseOptions);
    response.ok = true;
    response.status = 200;
    response.statusText = 'todo OK';
    observer.next(response);
  });

  constructor(private connectionService: ConnectionService) {

  }

  createBus(bus: Bus): Observable<Response> {
    return this.mock;
  }
}
