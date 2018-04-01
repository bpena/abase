import { Injectable } from '@angular/core';
import { Bus } from '@bus/model/bus';
import { ConnectionService } from '@core/services/connection.service';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusService {
  _bus: Bus = {
    number: '123',
    numberPlate: 'ABC-123',
    alias: 'Mi bus',
    owner: 'Bernardo Peña'
  };
  _busList = new Array(10).fill(this._bus);

  private mock: Observable<Response> = Observable.create(observer => {
    const response: Response = new Response({} as ResponseOptions);
    response.ok = true;
    response.status = 200;
    response.statusText = 'todo OK';
    observer.next(response);
  });

  private busMock: Observable<Bus> = Observable.create(observer => observer.next(this._bus));

  private busListMock: Observable<Bus[]> = Observable.create(observer => observer.next(this._busList));



  constructor(private connectionService: ConnectionService) {

  }

  createBus(bus: Bus): Observable<Response> {
    return this.mock;
  }

  getBus(id): Observable<Bus> {
    return this.busMock;
  }

  getBuses(): Observable<Bus[]> {
    return this.busListMock;
  }
}
