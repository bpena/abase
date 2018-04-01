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

  private busMock: Observable<Bus> = Observable.create(observer => {
    const _bus: Bus = {
      number: '123',
      numberPlate: 'ABC-123',
      alias: 'Mi bus',
      owner: 'Bernardo Peña'
    };
    observer.next(_bus);
  });

  constructor(private connectionService: ConnectionService) {

  }

  createBus(bus: Bus): Observable<Response> {
    return this.mock;
  }

  getBus(id): Observable<Bus> {
    return this.busMock;
  }
}
